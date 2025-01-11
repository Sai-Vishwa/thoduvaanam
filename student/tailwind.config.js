/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,jsx,js,ts,tsx}","./node_modules/@shadcn/ui/dist/**/*.js"],
theme: {
  extend: {
    screens: {
      xs: '480px'
    },
    fontSize: {
      'xs': '12px',
      'sm': '14px',
      'base': '16px',
      'lg': '18px',
      'xl': '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
      '8xl': '96px',
      '9xl': '128px'
    },
    
  },
  fontFamily: {
    beb: ["Bebas Neue", 'sans-serif'],
    lond: ["Londrina Sketch","sans-serif"],
    pw: ["Playwrite GB S","cursive"],
    dos: ["Dosis","sans-serif"],
    oxy: ["Oxygen","sans-serif"]
  }
},
plugins: [require("tailwindcss-animate")],
}