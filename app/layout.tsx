import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VidNoFace – AI Faceless Video Generator',
  description: 'Create viral faceless videos with AI scripts, stock media & voice. 3-day free trial.',
  keywords: 'faceless video, ai video generator, youtube shorts, instagram reels, vidnoface'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
