# VidNoFace – AI Faceless Video Generator

Clean Next.js + Supabase + Razorpay/Stripe skeleton for a production faceless video SaaS.

**Features implemented in this skeleton**
- Dark theme (black bg, white text, bright green accents) – faceless.video style
- Exact pricing tables (INR + USD, Daily / Monthly / Yearly)
- 3-day free trial rules (1 video/day, max 3, 720p + watermark `vidnoface.com`)
- Free trial limited to 5 categories
- Language-aware trends + script (default English, Hindi, Hinglish…)
- Quality selector 360–1080p (trial locked 720p)
- Smart size compressor toggle
- Instant result UI: Play • Download Video • Download Audio • Title (1) • Caption (1) • Sources one-click copy
- **Removed**: schedule, auto-post, social connections, voice cloner, confirmation dialogs, commands, dual titles/captions
- Razorpay for India (strict +91), Stripe + Razorpay for International
- Supabase Auth ready

> Real video rendering (FFmpeg composition, TTS, stock media fetch) is **not** included in this skeleton.  
> You need a render worker (Cloudflare Worker + R2 + external FFmpeg service / Modal / RunPod / your own server).

---

## 1. Create the GitHub repo yourself (permissions blocked for me)

1. Go to https://github.com/new
2. Repository name: `vidnoface` (or `faceless-video-ai`)
3. Public
4. Do **not** add README (we already have one)
5. Create repository

Then on your machine:

```bash
git clone https://github.com/YOUR_USERNAME/vidnoface.git
cd vidnoface
# copy all files from this folder into the repo
git add .
git commit -m "Initial VidNoFace skeleton"
git push -u origin main
```

---

## 2. Supabase setup (Auth + DB)

1. https://supabase.com → New project
2. Project Settings → API → copy `URL` + `anon` key + `service_role` key
3. SQL Editor → run:

```sql
-- profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  region text default 'IN',
  plan_id text default 'free_trial',
  videos_left int default 0,
  trial_ends_at timestamptz,
  trial_videos_used int default 0,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- auto create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, trial_ends_at, plan_id)
  values (
    new.id,
    new.email,
    now() + interval '3 days',
    'free_trial'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- videos table
create table public.videos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  category_id text,
  topic text,
  script text,
  language text default 'en',
  quality text default '720p',
  compress boolean default true,
  status text default 'queued',
  video_url text,
  audio_url text,
  title text,
  caption text,
  sources text[],
  watermark boolean default false,
  created_at timestamptz default now()
);

alter table public.videos enable row level security;

create policy "Users can manage own videos"
  on videos for all using (auth.uid() = user_id);
```

4. Authentication → Providers → enable Email

---

## 3. Razorpay (India – strict +91)

1. https://razorpay.com → Sign up / Login
2. Settings → API Keys → Generate Key (Live or Test)
3. Put `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` in `.env`
4. For **strict +91 only**:
   - In checkout UI, detect phone country code
   - Or use Razorpay Dashboard → Settings → Payment Methods → restrict if needed
   - In your frontend checkout, only show Razorpay when `region === 'IN'` and phone starts with +91
5. Webhooks: Dashboard → Webhooks → add `https://yourdomain.com/api/webhooks/razorpay`  
   Events: `payment.captured`, `order.paid`  
   On success → credit `videos_left` in Supabase profiles

---

## 4. Stripe (International)

1. https://dashboard.stripe.com → Developers → API keys
2. Put `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Webhooks → add endpoint `https://yourdomain.com/api/webhooks/stripe`  
   Events: `checkout.session.completed`
4. On success → credit videos in profile

**Note**: Razorpay also supports international cards. You can offer both for INTL region. Do **not** apply +91 strict check for international Razorpay.

---

## 5. Crypto (optional, no KYC for India)

- NowPayments / OxaPay / Coinbase Commerce
- Or Razorpay does not support crypto natively for most accounts
- Best: add a simple “Pay with Crypto” button that opens NowPayments invoice when user chooses it (no phone required)

---

## 6. Cloudflare Hosting + Bot Protection

1. https://dash.cloudflare.com → Workers & Pages → Create → Pages
2. Connect your GitHub `vidnoface` repo
3. Build settings:
   - Framework preset: Next.js
   - Build command: `npx @cloudflare/next-on-pages@1` or use OpenNext
   - (Recommended) Use **OpenNext** or **@cloudflare/next-on-pages** for full Next.js support
4. Environment variables: add all from `.env.example`
5. **Bot protection**:
   - Security → Bots → configure Bot Fight Mode / Super Bot Fight Mode
   - Or add Cloudflare Turnstile (free) on login + create forms
6. Custom domain later (GoDaddy → point DNS to Cloudflare)

Alternative simple path: deploy to **Vercel** first (1-click from GitHub), then move to Cloudflare later if you want.

---

## 7. Local run

```bash
cp .env.example .env.local
# fill keys
npm install
npm run dev
```

Open http://localhost:3000

---

## 8. What you still need for REAL video generation

| Piece | Suggestion |
|-------|------------|
| Script AI | OpenAI GPT-4o / Claude / Groq |
| TTS | ElevenLabs / Google Cloud TTS / Azure |
| Stock media | Pexels API + Pixabay API |
| Composition | FFmpeg (server or cloud function) |
| Queue | Supabase + Cloudflare Queues / Inngest / Trigger.dev |
| Storage | Supabase Storage or Cloudflare R2 |
| Watermark | FFmpeg drawtext |

The Create page already has the full manual flow UI ready. Replace the mock `setTimeout` calls with real API routes.

---

## License

Private / commercial – change as needed.
