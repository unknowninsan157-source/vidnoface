import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#02040A',
        surface: '#0A0E17',
        border: '#1A2332',
        primary: '#00FF88',
        primaryDim: '#00CC6A',
        text: '#FFFFFF',
        muted: '#8B9BB4',
        danger: '#FF4455'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
