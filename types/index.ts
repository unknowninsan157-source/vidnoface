export type PlanId =
  | 'free_trial'
  | 'daily_1_inr' | 'daily_10_inr'
  | 'monthly_10_inr' | 'monthly_20_inr' | 'monthly_42_inr' | 'monthly_300_inr'
  | 'yearly_10_inr' | 'yearly_20_inr' | 'yearly_42_inr'
  | 'daily_1_usd' | 'daily_10_usd'
  | 'monthly_10_usd' | 'monthly_20_usd' | 'monthly_42_usd' | 'monthly_300_usd'
  | 'yearly_10_usd' | 'yearly_20_usd' | 'yearly_42_usd';

export type Region = 'IN' | 'INTL';

export interface PricingPlan {
  id: PlanId;
  region: Region;
  period: 'daily' | 'monthly' | 'yearly';
  price: number;
  currency: 'INR' | 'USD';
  videos: number; // per period (for yearly = per month)
  label: string;
}

export interface UserProfile {
  id: string;
  email: string;
  region: Region;
  plan_id: PlanId;
  videos_left: number;
  trial_ends_at: string | null;
  trial_videos_used: number;
  created_at: string;
}

export type Quality = '360p' | '480p' | '720p' | '1080p';

export type LanguageCode =
  | 'en' | 'hi' | 'hinglish'
  | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ar' | 'ja' | 'ko' | 'zh';

export interface Category {
  id: string;
  name: string;
  group: string;
  freeTrialAllowed: boolean;
  mediaType: 'stock_image' | 'stock_video' | 'gameplay' | 'ai_image';
  description: string;
  keywords: string;
}

export interface VideoJob {
  id: string;
  user_id: string;
  category_id: string;
  topic: string;
  script: string;
  language: LanguageCode;
  quality: Quality;
  compress: boolean;
  status: 'queued' | 'scripting' | 'media' | 'rendering' | 'ready' | 'failed';
  video_url: string | null;
  audio_url: string | null;
  title: string | null;
  caption: string | null;
  sources: string[]; // NCS / stock credits
  watermark: boolean;
  created_at: string;
  error?: string;
}
