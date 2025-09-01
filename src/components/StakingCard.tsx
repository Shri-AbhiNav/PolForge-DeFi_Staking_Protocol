import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Wallet, Clock, Zap } from 'lucide-react';

interface StakingCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
  badge?: string;
  glowColor?: string;
}

const StakingCard = ({ title, value, subtitle, icon, trend, badge, glowColor = "glow-primary" }: StakingCardProps) => {
  return (
    <Card className={`glass-card border-glass-border hover:${glowColor} transition-all duration-300 transform hover:scale-105`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold gradient-text">{value}</div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            {subtitle}
          </p>
          <div className="flex items-center space-x-2">
            {trend && (
              <div className="flex items-center text-xs text-accent">
                <TrendingUp className="w-3 h-3 mr-1" />
                {trend}
              </div>
            )}
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const stakingData = [
  {
    title: "Total Staked",
    value: "12.5 POL",
    subtitle: "≈ $31,250 USD",
    icon: <Wallet className="w-4 h-4" />,
    trend: "+5.2%",
    badge: "Active",
    glowColor: "glow-primary"
  },
  {
    title: "Rewards Earned",
    value: "0.85 POL",
    subtitle: "≈ $2,125 USD",
    icon: <Zap className="w-4 h-4" />,
    trend: "+12.3%",
    badge: "Claimable",
    glowColor: "glow-accent"
  },
  {
    title: "Staking Duration",
    value: "45 Days",
    subtitle: "Since Jan 15, 2024",
    icon: <Clock className="w-4 h-4" />,
    badge: "Ongoing"
  },
  {
    title: "Referral Rewards",
    value: "2.1 POL",
    subtitle: "From 8 referrals",
    icon: <TrendingUp className="w-4 h-4" />,
    trend: "+8.7%",
    badge: "Tier 3"
  }
];

export default StakingCard;