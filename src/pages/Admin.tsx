import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { Shield, DollarSign, Users, Settings } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Manage contract operations and settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-glass-border glow-primary">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">1,250 POL</div>
                    <div className="text-sm text-muted-foreground">Contract Balance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-accent" />
                  <div>
                    <div className="text-2xl font-bold">1,847</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Shield className="w-8 h-8 text-secondary" />
                  <div>
                    <div className="text-2xl font-bold">Active</div>
                    <div className="text-sm text-muted-foreground">Contract Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Settings className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">12.5%</div>
                    <div className="text-sm text-muted-foreground">Current APY</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transfers" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 glass-card">
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
              <TabsTrigger value="batch">Batch Operations</TabsTrigger>
              <TabsTrigger value="settings">Contract Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="transfers" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Transfer POL</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Address</Label>
                      <Input 
                        id="recipient" 
                        placeholder="0x..." 
                        className="bg-muted/50 border-glass-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (POL)</Label>
                      <Input 
                        id="amount" 
                        type="number" 
                        placeholder="0.0" 
                        className="bg-muted/50 border-glass-border"
                      />
                    </div>
                  </div>
                  <Button className="glow-primary">Execute Transfer</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="batch" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Batch Transfer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csvData">CSV Data (Address, Amount)</Label>
                    <textarea 
                      id="csvData"
                      placeholder="0x1234...,1.5&#10;0x5678...,2.0&#10;0x9abc...,0.5"
                      className="w-full h-32 p-3 rounded-md bg-muted/50 border border-glass-border"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="border-glass-border">
                      Validate CSV
                    </Button>
                    <Button className="glow-accent">Execute Batch</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Contract Ownership</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newOwner">New Owner Address</Label>
                    <Input 
                      id="newOwner" 
                      placeholder="0x..." 
                      className="bg-muted/50 border-glass-border"
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">
                      ⚠️ Warning: Transferring ownership is irreversible. Make sure you have the correct address.
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    className="glow-primary"
                    onClick={() => alert("You are not authorized to transfer ownership. Only the current owner can perform this action.")}
                  >
                    Transfer Ownership
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Contract Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="apy">Annual Percentage Yield (%)</Label>
                      <Input 
                        id="apy" 
                        type="number" 
                        defaultValue="12.5"
                        className="bg-muted/50 border-glass-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minStake">Minimum Stake (POL)</Label>
                      <Input 
                        id="minStake" 
                        type="number" 
                        defaultValue="0.1"
                        className="bg-muted/50 border-glass-border"
                      />
                    </div>
                  </div>
                  <Button 
                    className="glow-accent"
                    onClick={() => alert("You are not authorized to update parameters. Only admin or owner can perform this action.")}
                  >
                    Update Parameters
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;