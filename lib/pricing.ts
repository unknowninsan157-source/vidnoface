import { PricingPlan, PlanId, Region } from '@/types';

export const PRICING: PricingPlan[] = [
  // ========== INDIA (INR) ==========
  { id: 'daily_1_inr', region: 'IN', period: 'daily', price: 99, currency: 'INR', videos: 1, label: '₹99 → 1 video' },
  { id: 'daily_10_inr', region: 'IN', period: 'daily', price: 299, currency: 'INR', videos: 10, label: '₹299 → 10 videos' },
  { id: 'monthly_10_inr', region: 'IN', period: 'monthly', price: 299, currency: 'INR', videos: 10, label: '₹299 → 10 videos' },
  { id: 'monthly_20_inr', region: 'IN', period: 'monthly', price: 499, currency: 'INR', videos: 20, label: '₹499 → 20 videos' },
  { id: 'monthly_42_inr', region: 'IN', period: 'monthly', price: 799, currency: 'INR', videos: 42, label: '₹799 → 42 videos' },
  { id: 'monthly_300_inr', region: 'IN', period: 'monthly', price: 3999, currency: 'INR', videos: 300, label: '₹3,999 → 300 videos' },
  { id: 'yearly_10_inr', region: 'IN', period: 'yearly', price: 2999, currency: 'INR', videos: 10, label: '₹2,999 → 10 videos/mo' },
  { id: 'yearly_20_inr', region: 'IN', period: 'yearly', price: 4999, currency: 'INR', videos: 20, label: '₹4,999 → 20 videos/mo' },
  { id: 'yearly_42_inr', region: 'IN', period: 'yearly', price: 7999, currency: 'INR', videos: 42, label: '₹7,999 → 42 videos/mo' },

  // ========== INTERNATIONAL (USD) ==========
  { id: 'daily_1_usd', region: 'INTL', period: 'daily', price: 1.99, currency: 'USD', videos: 1, label: '$1.99 → 1 video' },
  { id: 'daily_10_usd', region: 'INTL', period: 'daily', price: 3.99, currency: 'USD', videos: 10, label: '$3.99 → 10 videos' },
  { id: 'monthly_10_usd', region: 'INTL', period: 'monthly', price: 4.99, currency: 'USD', videos: 10, label: '$4.99 → 10 videos' },
  { id: 'monthly_20_usd', region: 'INTL', period: 'monthly', price: 7.99, currency: 'USD', videos: 20, label: '$7.99 → 20 videos' },
  { id: 'monthly_42_usd', region: 'INTL', period: 'monthly', price: 12.99, currency: 'USD', videos: 42, label: '$12.99 → 42 videos' },
  { id: 'monthly_300_usd', region: 'INTL', period: 'monthly', price: 49, currency: 'USD', videos: 300, label: '$49 → 300 videos' },
  { id: 'yearly_10_usd', region: 'INTL', period: 'yearly', price: 49, currency: 'USD', videos: 10, label: '$49 → 10 videos/mo' },
  { id: 'yearly_20_usd', region: 'INTL', period: 'yearly', price: 79, currency: 'USD', videos: 20, label: '$79 → 20 videos/mo' },
  { id: 'yearly_42_usd', region: 'INTL', period: 'yearly', price: 119, currency: 'USD', videos: 42, label: '$119 → 42 videos/mo' }
];

export function getPlansByRegion(region: Region): PricingPlan[] {
  return PRICING.filter(p => p.region === region);
}

export function getPlan(id: PlanId): PricingPlan | undefined {
  return PRICING.find(p => p.id === id);
}

/** Free trial rules */
export const FREE_TRIAL = {
  days: 3,
  videosPerDay: 1,
  totalVideos: 3,
  quality: '720p' as const,
  watermark: true,
  watermarkText: 'vidnoface.com'
};
