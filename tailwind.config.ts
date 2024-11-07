import type { Config } from 'tailwindcss';
import Colors from 'tailwindcss/colors';


const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        opengraph: '1200 / 630',
      },
      colors: {
        primary: {
          DEFAULT: Colors.sky['500'],
          ...Colors.sky,
        },
        secondary: {
          DEFAULT: Colors.slate['500'],
          ...Colors.slate,
        },
        success: {
          DEFALUT: Colors.teal['500'],
          ...Colors.teal,
        },
        danger: {
          DEFAULT: Colors.rose['500'],
          ...Colors.rose,
        },
        warning: {
          DEFAULT: Colors.amber['500'],
          ...Colors.amber,
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};


export default config;