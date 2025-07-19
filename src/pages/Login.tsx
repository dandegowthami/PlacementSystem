import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GraduationCap, Loader2 } from 'lucide-react';
import heroImage from '@/assets/hero-placement.jpg';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'recruiter':
          navigate('/recruiter/dashboard');
          break;
        case 'student':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Navigation is handled by the useEffect hook above
    } catch (err) {
      // Error is handled by the context
    }
  };

  // Demo credentials for easy testing
  const demoCredentials = [
    { email: 'admin@college.edu', password: 'admin123', role: 'Admin' },
    { email: 'recruiter@company.com', password: 'recruiter123', role: 'Recruiter' },
    { email: 'student@college.edu', password: 'student123', role: 'Student' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src={heroImage} 
          alt="Professional placement environment" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-glow/60" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center text-primary-foreground">
            <GraduationCap className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">JobDrive Platform</h1>
            <p className="text-xl opacity-90">
              Streamline your placement process with our comprehensive automation platform
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-muted/20">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:hidden">
            <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold">JobDrive</h1>
          </div>

          <Card className="border-border shadow-elegant">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-professional transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="text-center text-sm text-muted-foreground mb-4">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>

                {/* Demo Credentials */}
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2 text-center">
                    Demo Credentials:
                  </p>
                  <div className="space-y-1">
                    {demoCredentials.map((cred, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start"
                        onClick={() => {
                          setEmail(cred.email);
                          setPassword(cred.password);
                        }}
                      >
                        {cred.role}: {cred.email}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};