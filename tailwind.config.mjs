/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        noto: ['"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        main: '#004896',
        sub: '#4982C2',
        section: '#F0F6FA',
        base: '#333333',
      },
      fontSize: {
        'display': ['var(--fs-display)', { lineHeight: '1.1' }],
        'h1':      ['var(--fs-h1)',      { lineHeight: '1.15' }],
        'h2':      ['var(--fs-h2)',      { lineHeight: '1.2' }],
        'h3':      ['var(--fs-h3)',      { lineHeight: '1.3' }],
        'h4':      ['var(--fs-h4)',      { lineHeight: '1.4' }],
        'body-lg': ['var(--fs-body-lg)', { lineHeight: '1.7' }],
        'body':    ['var(--fs-body)',    { lineHeight: '1.8' }],
        'small':   ['var(--fs-small)',   { lineHeight: '1.6' }],
        'caption': ['var(--fs-caption)', { lineHeight: '1.5' }],
        'stat':    ['var(--fs-stat)',    { lineHeight: '1.0' }],
      },
      maxWidth: {
        content: '1440px',
      },
      keyframes: {
        'marquee-vertical': {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'marquee-horizontal': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ripple': {
          '0%':   { transform: 'scale(0.5)', opacity: '0.6' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
      },
      animation: {
        'marquee-vertical':   'marquee-vertical 18s linear infinite',
        'marquee-horizontal': 'marquee-horizontal 30s linear infinite',
        'ripple1':    'ripple 3s ease-out infinite',
        'ripple2':    'ripple 3s ease-out 1s infinite',
        'ripple3':    'ripple 3s ease-out 2s infinite',
        'ping-slow':  'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
};
