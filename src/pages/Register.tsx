import Navigation from '@/components/Navigation';
import { RegisterForm } from '@/components/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Join PolForge</h1>
            <p className="text-muted-foreground text-lg">
              Start earning rewards through staking and referrals
            </p>
          </div>
          
          <RegisterForm />
          
          <p className="text-sm text-muted-foreground text-center">
            Get an additional 5% APY boost on your first stake when you use a referral code!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;