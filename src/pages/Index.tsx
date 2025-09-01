import Navigation from '@/components/Navigation';
import StakingCard, { stakingData } from '@/components/StakingCard';
import ContractStats from '@/components/ContractStats';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroBg from '@/assets/hero-bg.jpg';
import { TrendingUp, Users, Zap, Shield, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 px-6 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 mb-4">
              🚀 New: Referral Tier System Live
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              PolForge
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              The next-generation DeFi staking protocol with advanced referral rewards and transparent governance
            </p>
            <div className="text-lg md:text-xl font-mono bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              Contract Address: 0xd4A2c6b8e05D53852D7907E79d007b3f069B5653
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button 
                size="lg" 
                className="glow-primary animate-pulse-glow text-lg px-8 py-4"
                onClick={() => navigate('/register')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Staking
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-glass-border text-lg px-8 py-4"
                onClick={() => navigate('/referrals')}
              >
                <Users className="w-5 h-5 mr-2" />
                Join Referral Program
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        <div className="space-y-12">
          <section className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">Your Staking Dashboard</h2>
              <p className="text-muted-foreground text-lg">
                Monitor your investments and track your rewards
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stakingData.map((card, index) => (
                <StakingCard key={index} {...card} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">Protocol Statistics</h2>
              <p className="text-muted-foreground text-lg">
                Real-time data from our smart contracts
              </p>
            </div>
            
            <ContractStats />
          </section>

          <section className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">Why Choose PolForge</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card border-glass-border p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Secure & Audited</h3>
                <p className="text-muted-foreground">
                  Smart contracts audited by leading security firms with multi-sig governance
                </p>
              </div>
              
              <div className="glass-card border-glass-border p-6 text-center group hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-secondary/30 to-accent/30 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center mx-auto relative z-10">
                    <Code2 className="w-7 h-7 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mt-4">
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Crafted with </span>
                  ❤️➡️❤️‍🔥
                  <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"> by</span>
                </h3>
                <div className="mt-2">
                  <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Shri Abhinav
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Blockchain Developer
                  </p>
                </div>
              </div>
              
              <div className="glass-card border-glass-border p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">High Yields</h3>
                <p className="text-muted-foreground">
                  Competitive APY rates with bonus rewards through our referral system
                </p>
              </div>
              
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
