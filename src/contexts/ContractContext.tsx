import { createContext, useContext, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './WalletContext';

// Contract ABI - Only including the functions we need
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      }
    ],
    "name": "signUp",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userStakedAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = '0xd4a2c6b8e05d53852d7907e79d007b3f069b5653';

type ContractContextType = {
  registerUser: (referrer: string, amount: string) => Promise<void>;
  stakeTokens: (amount: string) => Promise<void>;
  getUserStake: () => Promise<string>;
  loading: boolean;
  error: string | null;
};

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { account, provider } = useWallet();

  const getContract = useCallback(() => {
    if (!provider) {
      throw new Error('No provider available');
    }
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }, [provider]);

  const registerUser = useCallback(async (referrer: string, amount: string) => {
    if (!account) {
      throw new Error('Please connect your wallet first');
    }

    setLoading(true);
    setError(null);

    try {
      const contract = getContract();
      const tx = await contract.signUp(account, referrer, {
        value: ethers.utils.parseEther(amount)
      });
      await tx.wait();
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [account, getContract]);

  const stakeTokens = useCallback(async (amount: string) => {
    if (!account) {
      throw new Error('Please connect your wallet first');
    }

    setLoading(true);
    setError(null);

    try {
      const contract = getContract();
      const tx = await contract.stake(account, {
        value: ethers.utils.parseEther(amount)
      });
      await tx.wait();
    } catch (err) {
      console.error('Staking failed:', err);
      setError(err.message || 'Failed to stake tokens');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [account, getContract]);

  const getUserStake = useCallback(async () => {
    if (!account) {
      throw new Error('Please connect your wallet first');
    }

    try {
      const contract = getContract();
      const stake = await contract.userStakedAmount(account);
      return ethers.utils.formatEther(stake);
    } catch (err) {
      console.error('Failed to get user stake:', err);
      setError('Failed to fetch staking information');
      throw err;
    }
  }, [account, getContract]);

  return (
    <ContractContext.Provider
      value={{
        registerUser,
        stakeTokens,
        getUserStake,
        loading,
        error
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = (): ContractContextType => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};
