/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "qwik-dark-blue": "#006ce9",
        "qwik-light-blue": "#18b6f6",
        "qwik-light-purple": "#ac7ff4",
        "qwik-dark-purple": "#713fc2",
      },
    },
  },
  daisyui: {
    themes: [
      {
        black: {
          ...require("daisyui/src/theming/themes")["[data-theme=black]"],
          primary: "#006ce9",
          secondary: "#713fc2",
          accent: "#18b6f6",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
