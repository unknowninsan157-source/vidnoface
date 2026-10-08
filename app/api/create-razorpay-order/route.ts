import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getPlan } from '@/lib/pricing';

/**
 * Razorpay order for INDIA only (strict +91).
 * International customers should use Stripe or Razorpay international (no strict phone check).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, region } = body;

    if (region !== 'IN') {
      return NextResponse.json(
        { error: 'Use Stripe or international Razorpay for non-India' },
        { status: 400 }
      );
    }

    const plan = getPlan(planId);
    if (!plan || plan.region !== 'IN') {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID!;
    const key_secret = process.env.RAZORPAY_KEY_SECRET!;

    if (!key_id || !key_secret) {
      return NextResponse.json({ error: 'Razorpay not configured' }, { status: 500 });
    }

    const razorpay = new Razorpay({ key_id, key_secret });

    const order = await razorpay.orders.create({
      amount: plan.price * 100, // paise
      currency: 'INR',
      receipt: `vidnoface_${planId}_${Date.now()}`,
      notes: { planId, region: 'IN' }
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Order failed' }, { status: 500 });
  }
}
