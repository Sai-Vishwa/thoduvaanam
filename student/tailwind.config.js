/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  fontFamily: {
    beb: ["Bebas Neue", 'sans-serif'],
    lond: ["Londrina Sketch","sans-serif"],
    pw: ["Playwrite GB S","cursive"],
    dos: ["Dosis","sans-serif"],
    oxy: ["Oxygen","sans-serif"]
  },
  theme: {
    extend: {
      screens:{
        'xs':'320px',
        'sm':'640px',
        'md':'768px',
        'lg':'1024px',
        'xl':'1280px',
      },
      colors: {
        dark: '#333641',
      },
      screens:{
        xs: "200px",
      },
      fontSize:{
        'xs':'0.75rem',
        'sm':'0.875rem',
        'base':'1rem',
        'lg':'1.125rem',
        'xl':'1.25rem',
        '2xl':'1.5em',
        '3xl':'1.875rem',
        '4xl':'2.25rem',
        '5xl':'3rem',
        '6xl':'4rem',
        '7xl':'5rem',
        '8xl':'6rem',
        '9xl':'8rem'
      },
      animation: {
        reveal: 'reveal 3s ease-in-out forwards 200ms',
        glow: 'glow 2.5s linear infinite 2000ms',
      },
      keyframes: {
        reveal: {
          '80%': { 'letter-spacing': '8px' },
          '100%': { 'background-size': '300% 300%' },
        },
        glow: {
          '40%': { 'text-shadow': '0 0 8px #fff' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
