import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Lock, TrendingUp } from 'lucide-react';

const ContractStats = () => {
  const contractData = [
    {
      label: "Total Value Locked",
      value: "1,250 POL",
      usdValue: "$3,125,000",
      progress: 75,
      icon: <Lock className="w-5 h-5" />
    },
    {
      label: "Active Stakers",
      value: "1,847",
      usdValue: "+127 this week",
      progress: 60,
      icon: <Users className="w-5 h-5" />
    },
    {
      label: "Total Rewards Paid",
      value: "284 POL",
      usdValue: "$710,000",
      progress: 45,
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      label: "Contract Activity",
      value: "98.7%",
      usdValue: "Uptime",
      progress: 98,
      icon: <Activity className="w-5 h-5" />
    }
  ];

  return (
    <Card className="glass-card border-glass-border col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl gradient-text">Contract Statistics</CardTitle>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contractData.map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-primary">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.usdValue}
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractStats;