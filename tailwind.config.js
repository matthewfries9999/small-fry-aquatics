// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "left center" },
          "50%": { backgroundPosition: "right center" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
      },
    },
  },
  plugins: [],
};