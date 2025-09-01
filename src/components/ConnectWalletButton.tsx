import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Loader2, Wallet } from 'lucide-react';
import { useState } from 'react';

const ConnectWalletButton = () => {
  const { isConnected, account, connectWallet, disconnectWallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await connectWallet();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isConnected && account) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="border-glass-border bg-primary/10 hover:bg-primary/20"
          onClick={handleDisconnect}
        >
          <Wallet className="w-4 h-4 mr-2" />
          {formatAddress(account)}
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      disabled={isConnecting}
      className="gap-2"
    >
      {isConnecting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default ConnectWalletButton;
