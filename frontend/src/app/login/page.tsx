'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { FileText, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-purple-100 p-4">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-white/40">
        <CardHeader className="space-y-3 pb-8 pt-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <FileText size={24} />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
            Welcome to MiniERP
          </CardTitle>
          <p className="text-center text-sm text-slate-500 font-medium">
            Sign in to your account to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10 h-11 bg-white/70 focus:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 bg-white/70 focus:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-sm font-medium text-red-500 text-center bg-red-50 p-2 rounded-md">{error}</p>}
            <Button type="submit" className="w-full h-11 text-base shadow-md mt-4 transition-transform active:scale-[0.98]" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
