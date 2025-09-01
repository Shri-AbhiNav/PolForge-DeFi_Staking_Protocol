import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navigation from '@/components/Navigation';
import { Coins, History, TrendingUp } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useState, useEffect } from 'react';

const Staking = () => {
  const { balance } = useWallet();
  const [stakeAmount, setStakeAmount] = useState('');
  const stakingHistory = [
    { date: "00-00-0000", amount: "0.0 POL", rewards: "0.0 POL", status: "-----" },
    { date: "00-00-0000", amount: "0.0 POL", rewards: "0.0 POL", status: "-----" },
    { date: "00-00-0000", amount: "0.0 POL", rewards: "0.0 POL", status: "-----" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Staking Portal</h1>
            <p className="text-muted-foreground text-lg">
              Stake your POL and earn rewards
            </p>
          </div>

          <Tabs defaultValue="stake" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 glass-card">
              <TabsTrigger value="stake">Stake POL</TabsTrigger>
              <TabsTrigger value="history">Staking History</TabsTrigger>
            </TabsList>

            <TabsContent value="stake" className="space-y-6">
              <Card className="glass-card border-glass-border glow-primary">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-primary" />
                    <span>Stake POL</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">12.5%</div>
                      <div className="text-sm text-muted-foreground">Current APY</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">24h</div>
                      <div className="text-sm text-muted-foreground">Min. Lock Period</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">0.1 POL</div>
                      <div className="text-sm text-muted-foreground">Min. Stake</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stakeAmount">Stake Amount</Label>
                      <Input 
                        id="stakeAmount" 
                        type="number" 
                        placeholder="0.0" 
                        className="bg-muted/50 border-glass-border text-lg"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Available: {balance} POL</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-auto p-0 text-primary"
                          onClick={() => setStakeAmount(balance)}
                        >
                          Max
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Estimated Monthly Rewards:</span>
                        <span className="font-bold text-accent">0.125 POL</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full glow-primary animate-pulse-glow" 
                    size="lg"
                    onClick={() => alert('Staking failed. Please check your wallet balance and try again.')}
                  >
                    Stake POL
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="w-5 h-5 text-primary" />
                    <span>Staking History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-glass-border">
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Rewards Earned</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stakingHistory.map((stake, index) => (
                        <TableRow key={index} className="border-glass-border">
                          <TableCell>{stake.date}</TableCell>
                          <TableCell className="font-medium">{stake.amount}</TableCell>
                          <TableCell className="text-accent">{stake.rewards}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              stake.status === 'Active' 
                                ? 'bg-accent/20 text-accent' 
                                : 'bg-secondary/20 text-secondary'
                            }`}>
                              {stake.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Staking;