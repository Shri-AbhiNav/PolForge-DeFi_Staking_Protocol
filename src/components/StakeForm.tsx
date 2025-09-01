import { useState, useEffect } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export const StakeForm = () => {
  const [amount, setAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentStake, setCurrentStake] = useState('0');
  
  const { stakeTokens, getUserStake } = useContract();
  const { isConnected, account, balance } = useWallet();

  // Fetch current stake amount
  useEffect(() => {
    const fetchStake = async () => {
      if (isConnected && account) {
        try {
          const stake = await getUserStake();
          setCurrentStake(parseFloat(stake).toFixed(4));
        } catch (err) {
          console.error('Error fetching stake:', err);
        }
      }
    };
    
    fetchStake();
  }, [isConnected, account, getUserStake, success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !account) {
      setError('Please connect your wallet first');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (Number(amount) > Number(balance)) {
      setError('Insufficient balance');
      return;
    }

    setIsStaking(true);
    setError(null);
    setSuccess(false);

    try {
      await stakeTokens(amount);
      setSuccess(true);
      setAmount('');
    } catch (err: any) {
      console.error('Staking error:', err);
      setError(err.message || 'Failed to stake tokens');
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Stake Tokens</h2>
      
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Current Stake:</span>
          <span className="font-medium">{currentStake} ETH</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Wallet Balance:</span>
          <span className="font-medium">{balance} ETH</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount to Stake (ETH)
          </Label>
          <Input
            id="amount"
            type="number"
            step="0.000000000000000001"
            min="0"
            placeholder="0.1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="text-green-600 text-sm p-2 bg-green-50 rounded-md">
            Successfully staked tokens!
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isStaking || !isConnected}
        >
          {isStaking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Staking...
            </>
          ) : (
            'Stake Tokens'
          )}
        </Button>
        
        {!isConnected && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            Please connect your wallet to stake tokens
          </p>
        )}
      </form>
    </div>
  );
};

export default StakeForm;
