import { Category } from '@/types';

/**
 * Free trial: only these 5 categories allowed.
 * Removed: voice cloner, schedule/auto-post, unsuitable stock categories.
 * Stock image / stock video / gameplay focused.
 */
export const CATEGORIES: Category[] = [
  // ===== FREE TRIAL ALLOWED (5) =====
  {
    id: 'motivational',
    name: 'Motivational Stories',
    group: 'AI IMAGE STORIES',
    freeTrialAllowed: true,
    mediaType: 'stock_image',
    description: 'Inspiring short motivational stories',
    keywords: 'success mountain sunrise motivation'
  },
  {
    id: 'life_hacks',
    name: 'Life Hacks',
    group: 'VLOGS',
    freeTrialAllowed: true,
    mediaType: 'stock_video',
    description: 'Quick useful life hacks',
    keywords: 'lifestyle home tips'
  },
  {
    id: 'space_facts',
    name: 'Space Facts',
    group: 'FACTS',
    freeTrialAllowed: true,
    mediaType: 'stock_image',
    description: 'Mind blowing facts about space',
    keywords: 'galaxy space universe'
  },
  {
    id: 'funny_facts',
    name: 'Funny Facts',
    group: 'FACTS',
    freeTrialAllowed: true,
    mediaType: 'stock_image',
    description: 'Funny facts that make people follow',
    keywords: 'funny curious cartoon'
  },
  {
    id: 'tech_news',
    name: 'Tech News',
    group: 'FACTS',
    freeTrialAllowed: true,
    mediaType: 'stock_video',
    description: 'Latest technology news explained simply',
    keywords: 'technology futuristic'
  },

  // ===== PAID ONLY =====
  {
    id: 'crime_mysteries',
    name: 'Crime Mysteries',
    group: 'AI IMAGE STORIES',
    freeTrialAllowed: false,
    mediaType: 'stock_image',
    description: 'True crime style mystery stories',
    keywords: 'detective dark city'
  },
  {
    id: 'horror_night',
    name: 'Horror Night Shift',
    group: 'SCARY',
    freeTrialAllowed: false,
    mediaType: 'stock_video',
    description: 'Spine chilling night shift horror',
    keywords: 'dark corridor horror'
  },
  {
    id: 'anime_story',
    name: 'Anime Story',
    group: 'CHARACTER STORIES',
    freeTrialAllowed: false,
    mediaType: 'stock_image',
    description: 'Emotional anime style short story',
    keywords: 'anime city'
  },
  {
    id: 'satisfying_asmr',
    name: 'Satisfying ASMR',
    group: 'SATISFYING ASMR',
    freeTrialAllowed: false,
    mediaType: 'stock_video',
    description: 'Satisfying ASMR style clips',
    keywords: 'satisfying slime clay'
  },
  {
    id: 'pov_coaster',
    name: 'Roller Coaster POV',
    group: 'POV CLIPS',
    freeTrialAllowed: false,
    mediaType: 'stock_video',
    description: 'Thrilling first person POV',
    keywords: 'roller coaster'
  },
  {
    id: 'bike_stunts',
    name: 'Bike Stunts',
    group: 'STUNTS',
    freeTrialAllowed: false,
    mediaType: 'gameplay',
    description: 'Thrilling mountain bike POV',
    keywords: 'mountain bike trail'
  },
  {
    id: 'ski_pov',
    name: 'Ski POV',
    group: 'POV CLIPS',
    freeTrialAllowed: false,
    mediaType: 'stock_video',
    description: 'Epic ski POV down snowy mountain',
    keywords: 'ski mountain snow'
  },
  {
    id: 'rapping_cats',
    name: 'Rapping Cats',
    group: 'FUNNY',
    freeTrialAllowed: false,
    mediaType: 'stock_image',
    description: 'Funny rap performed by a cat',
    keywords: 'cat microphone'
  },
  {
    id: 'meme_page',
    name: 'Meme Page',
    group: 'MEMES',
    freeTrialAllowed: false,
    mediaType: 'stock_image',
    description: 'Relatable meme style joke',
    keywords: 'funny meme'
  },
  {
    id: 'podcast_clip',
    name: 'Podcast Clipping',
    group: 'PODCAST',
    freeTrialAllowed: false,
    mediaType: 'stock_video',
    description: 'Short podcast highlight with strong hook',
    keywords: 'podcast microphone'
  },
  {
    id: 'crazy_animals',
    name: 'Crazy Animal Moments',
    group: 'ANIMALS',
    freeTrialAllowed: false,
    mediaType: 'stock_video',
    description: 'Funny animal moments',
    keywords: 'animals backyard'
  }
];

export function getFreeTrialCategories(): Category[] {
  return CATEGORIES.filter(c => c.freeTrialAllowed);
}

export function getAllCategories(isTrial: boolean): Category[] {
  return isTrial ? getFreeTrialCategories() : CATEGORIES;
}
