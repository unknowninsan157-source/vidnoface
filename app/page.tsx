import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Create Viral <span className="text-primary">Faceless</span> Videos
            <br />in Minutes
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
            AI scripts • Stock media • Natural voice • One-click export.
            Perfect for YouTube Shorts & Instagram Reels. No face needed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/create" className="btn btn-primary text-base px-8 py-3">
              Start Free Trial
            </Link>
            <Link href="/pricing" className="btn btn-outline text-base px-8 py-3">
              View Pricing
            </Link>
          </div>
          <p className="text-sm text-muted mt-4">
            3-day free trial • 1 video/day • Watermark • 720p
          </p>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { title: 'AI Script + Trends', desc: 'Language-aware trends & scripts (English, Hindi, Hinglish & more). Manual generate only.' },
            { title: 'Stock Media Engine', desc: 'Images, videos & gameplay clips matched to your topic. Quality up to 1080p.' },
            { title: 'Instant Export', desc: 'Play • Download Video • Download Audio • Generate Caption • Generate Title. No schedule spam.' }
          ].map(f => (
            <div key={f.title} className="card">
              <h3 className="text-primary font-semibold mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {['Pick Category', 'Enter Topic', 'Generate Script', 'Create & Download'].map((step, i) => (
              <div key={step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <p className="text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center card max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-3">Ready to go viral?</h2>
          <p className="text-muted text-sm mb-6">No credit card for free trial. Cancel anytime.</p>
          <Link href="/login" className="btn btn-primary">
            Create Free Account
          </Link>
        </section>
      </main>

      <footer className="border-t border-border mt-20 py-8 text-center text-muted text-sm">
        © {new Date().getFullYear()} VidNoFace • Built for creators
      </footer>
    </div>
  );
}
