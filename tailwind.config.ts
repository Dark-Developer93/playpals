import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        xs: '0.625rem',
        'button-xs': '0.75rem',
        'body-xs': '0.875rem',
        'body-s': '1rem',
        body: '1.125rem',
        'heading-xs-mobile': '1.25rem',
        'heading-xs-tablet': '1.375rem',
        'heading-xs-desktop': '1.5rem',
        'heading-s-mobile': '1.5rem',
        'heading-s-tablet': '1.625rem',
        'heading-s-desktop': '2rem',
        'heading-r-mobile': '2rem',
        'heading-r-tablet': '2.5rem',
        'heading-r-desktop': '3rem',
        'heading-m-mobile': '2.625rem',
        'heading-m-tablet': '3.5rem',
        'heading-m-desktop': '4.25rem',
      },
      fontFamily: {
        viuFont: ['var(--font-HelveticaNowDisplay)'],
      },
      colors: {
        viuBlue: '#25384C',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'show-menu': {
          from: {
            transform: 'translate(5rem, -5rem) rotate(180deg)',
          },
        },
        'fade-appear': {
          from: {
            opacity: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'show-menu': 'show-menu 0.2s linear',
        'fade-appear': 'fade-appear 0.2s linear',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
