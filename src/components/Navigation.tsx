import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Users, Coins, Settings } from 'lucide-react';
import ConnectWalletButton from './ConnectWalletButton';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/register', icon: Users, label: 'Register' },
    { path: '/staking', icon: Coins, label: 'Staking' },
    { path: '/referrals', icon: Users, label: 'Referrals' },
    { path: '/admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 border-0 rounded-none">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary glow-primary flex items-center justify-center">
              <Coins className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold gradient-text">PolForge</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive ? "glow-primary" : "hover:text-primary"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <ConnectWalletButton />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;