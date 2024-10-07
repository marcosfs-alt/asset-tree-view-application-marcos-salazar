import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        tracBlue: '#17192D',
        black600: '#17192D',
        blue50: '#F2F8FF',
        blue400: '#55A6FF',
        blue500: '#2188FF',
        blue900: '#023B78',
        borderCard: '#D8DFE6',
        gray150: '#E3EAEF',
        gray500: '#88929C',
        gray600: '#77818C',
        gray950: '#24292F',
      },
    },
  },
  plugins: [],
};
export default config;
