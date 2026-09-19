import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Noto Sans Ethiopic renders Ge'ez script (Amharic) correctly;
        // keep a Latin fallback for English content in the same page.
        sans: ['Noto Sans Ethiopic', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: '#f7f1e3',
        ember: '#7a1f1f',
        gold: '#c9962c',
        ink: '#241c15',
      },
    },
  },
  plugins: [],
};

export default config;
