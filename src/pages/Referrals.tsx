import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navigation from '@/components/Navigation';
import { Users, Copy, Gift, TrendingUp } from 'lucide-react';

const Referrals = () => {
  const referralData = [
    { address: "0x4xm2...m9p0", date: "2024-05-15", staked: "5.0 POL", rewards: "0.25 POL", tier: "Gold" },
    { address: "0xb4va...0z7a", date: "2024-06-20", staked: "3.5 POL", rewards: "0.175 POL", tier: "Silver" },
    { address: "0xy9z0...k0z7", date: "2024-08-01", staked: "8.2 POL", rewards: "0.41 POL", tier: "Platinum" },
  ];

  const tierBenefits = [
    { tier: "Bronze", requirements: "1-5 referrals", bonus: "2% extra APY", color: "bg-orange-500/20 text-orange-400" },
    { tier: "Silver", requirements: "6-15 referrals", bonus: "3% extra APY", color: "bg-gray-400/20 text-gray-300" },
    { tier: "Gold", requirements: "16-50 referrals", bonus: "5% extra APY", color: "bg-yellow-500/20 text-yellow-400" },
    { tier: "Platinum", requirements: "50+ referrals", bonus: "8% extra APY", color: "bg-purple-500/20 text-purple-400" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Referral Program</h1>
            <p className="text-muted-foreground text-lg">
              Earn rewards by inviting others to stake
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-card border-glass-border glow-primary lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-primary" />
                  <span>Referral Link</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    value="https://POLerforge.app/register?ref=0x4xm2...m9p0"
                    readOnly
                    className="bg-muted/50 border-glass-border"
                  />
                  <Button variant="outline" size="icon" className="border-glass-border">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <div className="text-2xl font-bold text-primary">8</div>
                    <div className="text-sm text-muted-foreground">Total Referrals</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/10">
                    <div className="text-2xl font-bold text-accent">2.1 POL</div>
                    <div className="text-sm text-muted-foreground">Total Earned</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/10">
                    <div className="text-2xl font-bold text-secondary">Gold</div>
                    <div className="text-sm text-muted-foreground">Current Tier</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-neon-green/10">
                    <div className="text-2xl font-bold text-neon-green">5%</div>
                    <div className="text-sm text-muted-foreground">Bonus APY</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass-border">
              <CardHeader>
                <CardTitle className="text-lg">Tier Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tierBenefits.map((tier, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={tier.color}>{tier.tier}</Badge>
                      <span className="text-xs text-muted-foreground">{tier.bonus}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{tier.requirements}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Top Referrals & Rewards</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-glass-border">
                    <TableHead>Referral Address</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Amount Staked</TableHead>
                    <TableHead>Rewards</TableHead>
                    <TableHead>Tier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralData.map((referral, index) => (
                    <TableRow key={index} className="border-glass-border">
                      <TableCell className="font-mono text-sm">{referral.address}</TableCell>
                      <TableCell>{referral.date}</TableCell>
                      <TableCell className="font-medium">{referral.staked}</TableCell>
                      <TableCell className="text-accent font-medium">{referral.rewards}</TableCell>
                      <TableCell>
                        <Badge className={
                          referral.tier === 'Platinum' ? 'bg-purple-500/20 text-purple-400' :
                          referral.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-400/20 text-gray-300'
                        }>
                          {referral.tier}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Referrals;