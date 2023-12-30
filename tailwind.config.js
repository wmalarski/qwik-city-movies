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
  plugins: [],
};
