import { useState, useEffect } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ethers } from 'ethers';

export const RegisterForm = () => {
  const defaultReferrer = '0x6339ab18cdFA900E3CcA7a03ab63d7769FacA446';
  const [referrer, setReferrer] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { registerUser } = useContract();
  const { isConnected, account, connectWallet, balance } = useWallet();

  const handleRegister = async () => {
    if (!isConnected || !account) {
      await connectWallet();
      return;
    }

    if (!stakeAmount || isNaN(Number(stakeAmount)) || Number(stakeAmount) <= 0) {
      setError('Please enter a valid staking amount');
      return;
    }

    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }

    setIsRegistering(true);
    setError(null);
    setSuccess(false);

    try {
      // If no referrer is provided, use the default one
      const referrerAddress = referrer.trim() || defaultReferrer;
      await registerUser(referrerAddress, stakeAmount);
      setSuccess(true);
      setStakeAmount('');
      setReferrer('');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message.includes('revert') ? 'Transaction failed. Please check your input and try again.' : err.message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Card className="border-glass-border bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referrer">Referrer Address (optional)</Label>
            <Input 
              id="referrer" 
              placeholder={defaultReferrer} 
              className="bg-muted/50 border-glass-border text-lg"
              value={referrer}
              onChange={(e) => setReferrer(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialStake">Initial Stake</Label>
            <Input 
              id="initialStake" 
              type="number" 
              placeholder="0.0" 
              className="bg-muted/50 border-glass-border text-lg"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            <div className="flex justify-between">
              <p className="text-xs text-muted-foreground">
                Available: {balance} POL
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-0 text-primary text-xs"
                onClick={() => setStakeAmount(balance)}
              >
                Max
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-green-600 text-sm p-2 bg-green-50 rounded-md">
              Registration successful!
            </div>
          )}

          <div className="w-full">
            <Button 
              className="w-full glow-primary animate-pulse-glow"
              onClick={handleRegister}
              disabled={isRegistering}
              size="lg"
            >
              {isRegistering ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Register & Stake
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
