/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purplePrimary: "#8736aa",
        purplePrimary200: "#8736aa20",

        purpleDash: "#1C274C",

        yellowPrimary: "#fdbf53",

        greenPrimary: "#eab058",

        lightBluePrimary: "#F2F1FE",

        grayPrimary: "#8F9397",

        lightGrayPrimary: "#d9d9d9",
      },
    },
    screens: {
      'sm': { 'max': '800px' },
      'md': { 'min': '670px', 'max': '767px' },
      'lg': { 'min': '768px', 'max': '1439px' },
      'xl': { 'min': '1440px' },
      '2xl': { 'min': '2560px' },
    },
  },
  plugins: [],
};
