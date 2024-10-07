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
        blue900: '#023B78',
        blue500: '#2188FF',
        borderCard: '#D8DFE6',
        gray950: '#24292F',
        gray600: '#77818C',
      },
    },
  },
  plugins: [],
};
export default config;
