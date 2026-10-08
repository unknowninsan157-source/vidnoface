import { FREE_TRIAL } from './pricing';
import { UserProfile } from '@/types';

export function isOnTrial(profile: UserProfile | null): boolean {
  if (!profile || !profile.trial_ends_at) return false;
  return new Date(profile.trial_ends_at) > new Date();
}

export function canCreateVideo(profile: UserProfile | null): { ok: boolean; reason?: string } {
  if (!profile) return { ok: false, reason: 'Please login first' };

  const trial = isOnTrial(profile);

  if (trial) {
    if (profile.trial_videos_used >= FREE_TRIAL.totalVideos) {
      return { ok: false, reason: 'Free trial limit reached (3 videos). Upgrade to continue.' };
    }
    // simple daily check would need last_video_at – for skeleton we use total
    return { ok: true };
  }

  if (profile.videos_left <= 0) {
    return { ok: false, reason: 'No videos left. Please buy a plan.' };
  }

  return { ok: true };
}

export function getMaxQuality(profile: UserProfile | null): '720p' | '1080p' {
  if (isOnTrial(profile)) return '720p';
  return '1080p';
}
