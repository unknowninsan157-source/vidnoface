'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { getPlansByRegion, FREE_TRIAL } from '@/lib/pricing';
import { formatPrice } from '@/lib/utils';
import { Region } from '@/types';
import Link from 'next/link';

export default function PricingPage() {
  const [region, setRegion] = useState<Region>('IN');
  const plans = getPlansByRegion(region);

  const daily = plans.filter(p => p.period === 'daily');
  const monthly = plans.filter(p => p.period === 'monthly');
  const yearly = plans.filter(p => p.period === 'yearly');

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Simple Pricing</h1>
        <p className="text-muted text-center mb-8">Pay only for what you need. No hidden fees.</p>

        {/* Region toggle */}
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setRegion('IN')}
            className={`btn text-sm ${region === 'IN' ? 'btn-primary' : 'btn-outline'}`}
          >
            🇮🇳 India (INR)
          </button>
          <button
            onClick={() => setRegion('INTL')}
            className={`btn text-sm ${region === 'INTL' ? 'btn-primary' : 'btn-outline'}`}
          >
            🌍 International (USD)
          </button>
        </div>

        {/* Free Trial banner */}
        <div className="card border-primary/40 mb-10 text-center">
          <h2 className="text-primary font-semibold mb-1">3-Day Free Trial</h2>
          <p className="text-sm text-muted">
            {FREE_TRIAL.videosPerDay} video/day • Max {FREE_TRIAL.totalVideos} videos • 720p + watermark ({FREE_TRIAL.watermarkText})
          </p>
          <Link href="/login" className="btn btn-primary mt-4 text-sm">
            Start Free Trial
          </Link>
        </div>

        {/* Plans */}
        <div className="space-y-10">
          <PlanGroup title="Daily" plans={daily} region={region} />
          <PlanGroup title="Monthly" plans={monthly} region={region} />
          <PlanGroup title="Yearly (≈17% off)" plans={yearly} region={region} />
        </div>

        <p className="text-xs text-muted text-center mt-12">
          India payments via Razorpay (strict +91). International via Stripe + Razorpay international cards.
          Crypto option available where supported without KYC.
        </p>
      </main>
    </div>
  );
}

function PlanGroup({ title, plans, region }: { title: string; plans: ReturnType<typeof getPlansByRegion>; region: Region }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map(p => (
          <div key={p.id} className="card flex flex-col">
            <div className="text-2xl font-bold mb-1">{formatPrice(p.price, p.currency)}</div>
            <div className="text-sm text-muted mb-4">{p.label.split('→')[1]?.trim() || p.label}</div>
            <Link
              href={`/checkout?plan=${p.id}&region=${region}`}
              className="btn btn-outline text-sm mt-auto"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
