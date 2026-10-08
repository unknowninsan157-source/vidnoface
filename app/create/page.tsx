'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { CATEGORIES, getAllCategories } from '@/lib/categories';
import { FREE_TRIAL } from '@/lib/pricing';
import { Quality, LanguageCode } from '@/types';
import Link from 'next/link';

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'hinglish', label: 'Hinglish' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ar', label: 'Arabic' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh', label: 'Chinese' }
];

const QUALITIES: Quality[] = ['360p', '480p', '720p', '1080p'];

export default function CreatePage() {
  // In real app these come from auth + profile
  const isTrial = true; // skeleton default
  const videosLeft = isTrial ? FREE_TRIAL.totalVideos : 10;

  const [categoryId, setCategoryId] = useState('');
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [quality, setQuality] = useState<Quality>('720p');
  const [compress, setCompress] = useState(true);
  const [status, setStatus] = useState<'idle' | 'scripting' | 'generating' | 'ready'>('idle');
  const [result, setResult] = useState<{
    videoUrl?: string;
    audioUrl?: string;
    title?: string;
    caption?: string;
    sources?: string[];
  } | null>(null);

  const cats = getAllCategories(isTrial);
  const maxQ = isTrial ? '720p' : '1080p';

  // Trends mock – language aware
  const [trends, setTrends] = useState<string[]>([]);
  useEffect(() => {
    // Mock: real app would call /api/trends?lang=...
    const mock: Record<string, string[]> = {
      en: ['AI taking jobs 2026', 'Space tourism boom', 'Hidden life hacks that work'],
      hi: ['एआई नौकरियां बदल रहा है', 'स्पेस टूरिज्म', 'छुपे हुए लाइफ हैक्स'],
      hinglish: ['AI jobs kha raha hai', 'Space tourism India', 'Best life hacks 2026']
    };
    setTrends(mock[language] || mock.en);
  }, [language]);

  async function generateScript() {
    if (!categoryId || !topic.trim()) {
      alert('Select category and enter topic');
      return;
    }
    setStatus('scripting');
    // Mock AI call – replace with real /api/generate-script
    await new Promise(r => setTimeout(r, 1500));
    const cat = CATEGORIES.find(c => c.id === categoryId);
    const sample =
      language === 'hi'
        ? `नमस्ते दोस्तों! आज हम बात करेंगे ${topic} के बारे में। यह जानकारी आपको हैरान कर देगी...`
        : language === 'hinglish'
        ? `Hey doston! Aaj hum baat karenge ${topic} ke baare mein. Yeh info aapko surprise kar degi...`
        : `Hey everyone! Today we're diving into ${topic}. This will blow your mind... Here's what you need to know.`;
    setScript(sample + `\n\n[Generated for ${cat?.name} • ${language}]`);
    setStatus('idle');
  }

  async function generateVideo() {
    if (!script.trim()) {
      alert('Generate or write a script first');
      return;
    }
    setStatus('generating');
    // Mock render pipeline – real version uses queue + FFmpeg / cloud render
    await new Promise(r => setTimeout(r, 3000));
    setResult({
      videoUrl: 'https://example.com/sample.mp4', // placeholder
      audioUrl: 'https://example.com/sample.mp3',
      title: topic.slice(0, 80) || 'Amazing Faceless Video',
      caption: script.slice(0, 200) + '… #faceless #shorts',
      sources: ['Pexels – @photographer1', 'Pixabay – user_handle', 'NCS – Track Name']
    });
    setStatus('ready');
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Create Video</h1>
          <div className="text-sm text-muted">
            {isTrial ? (
              <span className="text-primary">Free Trial • {videosLeft} left</span>
            ) : (
              <span>{videosLeft} videos left</span>
            )}
          </div>
        </div>

        {isTrial && (
          <div className="card border-primary/30 mb-6 text-sm text-muted">
            Free trial: only 5 categories • max 720p • watermark • 1 video/day (total 3)
          </div>
        )}

        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="text-sm text-muted mb-2 block">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cats.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCategoryId(c.id)}
                  className={`text-left text-sm p-3 rounded-md border transition-colors ${
                    categoryId === c.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted mt-0.5">{c.group}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language + Quality */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted mb-1 block">Language (script + trends)</label>
              <select
                className="input"
                value={language}
                onChange={e => setLanguage(e.target.value as LanguageCode)}
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-muted mb-1 block">Quality</label>
              <select
                className="input"
                value={quality}
                onChange={e => setQuality(e.target.value as Quality)}
                disabled={isTrial}
              >
                {QUALITIES.filter(q => {
                  if (isTrial) return q === '720p';
                  return true;
                }).map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
              {isTrial && <p className="text-xs text-muted mt-1">Trial locked to 720p</p>}
            </div>
          </div>

          {/* Compress toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={compress}
              onChange={e => setCompress(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm">Smart size compressor (smaller file, no quality loss)</span>
          </label>

          {/* Topic */}
          <div>
            <label className="text-sm text-muted mb-1 block">Topic</label>
            <input
              className="input"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Why AI will change everything in 2026"
            />
          </div>

          {/* Trends (language aware) */}
          <div>
            <label className="text-sm text-muted mb-2 block">Trending now ({language})</label>
            <div className="flex flex-wrap gap-2">
              {trends.map(t => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary text-muted hover:text-primary transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Script */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-muted">Script</label>
              <button
                onClick={generateScript}
                disabled={status === 'scripting'}
                className="btn btn-outline text-xs py-1 px-3"
              >
                {status === 'scripting' ? 'Generating…' : 'Generate Script'}
              </button>
            </div>
            <textarea
              className="input min-h-[140px] resize-y"
              value={script}
              onChange={e => setScript(e.target.value)}
              placeholder="Write or generate your script here…"
            />
          </div>

          {/* Generate Video */}
          <button
            onClick={generateVideo}
            disabled={status === 'generating' || !script}
            className="btn btn-primary w-full py-3 text-base"
          >
            {status === 'generating' ? 'Creating video…' : 'Generate Video'}
          </button>

          {/* Result – instant play / download / caption / title (NO schedule, NO social) */}
          {status === 'ready' && result && (
            <div className="card space-y-4 border-primary/40">
              <h3 className="font-semibold text-primary">Video Ready</h3>

              {/* Placeholder player */}
              <div className="aspect-video bg-black rounded-md flex items-center justify-center text-muted text-sm">
                [Video Player – {quality}]
                {isTrial && <span className="ml-2 text-primary">• watermark</span>}
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary text-sm">▶ Play</button>
                <button className="btn btn-outline text-sm">Download Video</button>
                <button className="btn btn-outline text-sm">Download Audio</button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted">Title (1 only)</span>
                  <button onClick={() => copyText(result.title || '')} className="text-xs text-primary">
                    Copy
                  </button>
                </div>
                <p className="text-sm bg-background rounded px-3 py-2">{result.title}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted">Caption (1 only)</span>
                  <button onClick={() => copyText(result.caption || '')} className="text-xs text-primary">
                    Copy
                  </button>
                </div>
                <p className="text-sm bg-background rounded px-3 py-2">{result.caption}</p>
              </div>

              {/* Sources – only when required (NCS / stock) */}
              {result.sources && result.sources.length > 0 && (
                <div>
                  <span className="text-sm text-muted mb-2 block">Sources / Credits (click to copy)</span>
                  <div className="space-y-1">
                    {result.sources.map(s => (
                      <button
                        key={s}
                        onClick={() => copyText(s)}
                        className="block w-full text-left text-xs px-3 py-2 rounded bg-background hover:bg-primary/10 text-muted hover:text-primary transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
