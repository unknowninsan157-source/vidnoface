import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPlan } from '@/lib/pricing';

/**
 * Stripe Checkout for INTERNATIONAL customers.
 * Also usable as secondary option for India if desired.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, region } = body;

    const plan = getPlan(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' as any });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: plan.currency.toLowerCase(),
            product_data: {
              name: `VidNoFace – ${plan.label}`,
              description: `${plan.videos} videos (${plan.period})`
            },
            unit_amount: Math.round(plan.price * 100)
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=1`,
      metadata: { planId, region: region || plan.region }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Stripe session failed' }, { status: 500 });
  }
}
