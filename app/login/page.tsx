'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              region: 'IN',
              trial_ends_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
              trial_videos_used: 0,
              videos_left: 0,
              plan_id: 'free_trial'
            }
          }
        });
        if (error) throw error;
        setMsg('Check your email to confirm. Then login.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setMsg(err.message || 'Something went wrong. (Supabase keys not set yet)');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="card">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Login'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted mb-1 block">Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted mb-1 block">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
              />
            </div>

            {msg && <p className="text-sm text-primary">{msg}</p>}

            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? 'Please wait…' : isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setMsg(''); }}
              className="text-primary hover:underline"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
