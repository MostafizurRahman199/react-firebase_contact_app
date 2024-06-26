/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors:{
        gray:"#5A5959",
        yellow:"#D01C28",
        dark_yellow:"#FFEAAE",
        orange:"#5F00D9",
      },
      backgroundImage: {
        'custom-pattern': "url('/public/1_xFyy_8vcIody08eRyXscpQ.png')",
      }
    },
  },
  plugins: [],
}

