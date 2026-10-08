'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { FREE_TRIAL } from '@/lib/pricing';

export default function DashboardPage() {
  // Skeleton – real data from Supabase profile + videos table
  const profile = {
    email: 'you@example.com',
    plan: 'Free Trial',
    videosLeft: 2,
    trialEnds: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
  };

  const recentVideos: { id: string; topic: string; status: string; created: string }[] = [];

  return (
    <div className="min-h-screen">
      <Header userEmail={profile.email} />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="card">
            <div className="text-xs text-muted mb-1">Plan</div>
            <div className="font-semibold text-primary">{profile.plan}</div>
          </div>
          <div className="card">
            <div className="text-xs text-muted mb-1">Videos Left</div>
            <div className="font-semibold">{profile.videosLeft}</div>
          </div>
          <div className="card">
            <div className="text-xs text-muted mb-1">Trial Ends</div>
            <div className="font-semibold">{profile.trialEnds}</div>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <Link href="/create" className="btn btn-primary">
            Create New Video
          </Link>
          <Link href="/pricing" className="btn btn-outline">
            Upgrade Plan
          </Link>
        </div>

        <h2 className="text-lg font-semibold mb-4">Recent Videos</h2>
        {recentVideos.length === 0 ? (
          <div className="card text-center text-muted text-sm py-12">
            No videos yet. <Link href="/create" className="text-primary hover:underline">Create your first one</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentVideos.map(v => (
              <div key={v.id} className="card flex items-center justify-between">
                <div>
                  <div className="font-medium">{v.topic}</div>
                  <div className="text-xs text-muted">{v.created}</div>
                </div>
                <span className="text-xs text-primary">{v.status}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
