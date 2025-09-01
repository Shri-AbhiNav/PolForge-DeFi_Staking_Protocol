import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

type WalletContextType = {
  isConnected: boolean;
  account: string | null;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: ethers.providers.Web3Provider | null;
  getBalance: () => Promise<string>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Using the type from ethereum.d.ts

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0.0');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  const handleAccountsChanged = useCallback((accounts: string[] = []) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      setAccount(null);
      setIsConnected(false);
      setProvider(null);
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      setIsConnected(true);
    }
  }, [account]);

  const handleChainChanged = useCallback(() => {
    // Reload the page to ensure all data is refreshed for the new chain
    window.location.reload();
  }, []);

  // Set up event listeners when the component mounts
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);

  const getBalance = useCallback(async (): Promise<string> => {
    if (window.ethereum && account) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalance(Number(balanceInEth).toFixed(4));
        return balanceInEth;
      } catch (error) {
        console.error("Error fetching balance", error);
        return '0.0';
      }
    }
    return '0.0';
  }, [account]);

  const connectWallet = async () => {
    console.log('Attempting to connect wallet...');
    
    if (!window.ethereum) {
      const errorMsg = 'MetaMask not detected. Please install MetaMask to use this feature!';
      console.error(errorMsg);
      alert(errorMsg);
      return;
    }

    try {
      console.log('Requesting accounts...');
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      console.log('Accounts received:', accounts);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned from MetaMask');
      }
      
      console.log('Setting up provider...');
      // For ethers.js v5, use Web3Provider
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      
      try {
        console.log('Getting signer...');
        const signer = await web3Provider.getSigner();
        console.log('Signer address:', await signer.getAddress());
        
        setAccount(accounts[0]);
        setIsConnected(true);
        setProvider(web3Provider);
        await getBalance(); // Update balance after connecting
        
        console.log('Wallet connected successfully');
      } catch (signerError) {
        console.error('Error getting signer:', signerError);
        throw new Error(`Failed to get signer: ${signerError.message}`);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      
      let errorMessage = 'Failed to connect wallet. Please try again.';
      
      if ((error as any).code === 4001) {
        errorMessage = 'Please connect to MetaMask to continue.';
      } else if ((error as any).code === -32002) {
        errorMessage = 'MetaMask is already processing a request. Please check your MetaMask extension.';
      } else if ((error as any).message) {
        errorMessage = error.message;
      }
      
      console.error('Error details:', {
        name: error.name,
        code: (error as any).code,
        message: error.message,
        stack: error.stack
      });
      
      alert(errorMessage);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setProvider(null);
    // Note: MetaMask doesn't have a disconnect method, we just clear our local state
  };

  // Update balance when account changes
  useEffect(() => {
    if (isConnected && account) {
      getBalance();
    }
  }, [account, isConnected, getBalance]);

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected, 
        account, 
        balance,
        connectWallet, 
        disconnectWallet,
        provider,
        getBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

declare global {
  interface Window {
    ethereum?: any;
  }
}
