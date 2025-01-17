/** @type {import('tailwindcss').Config} */
export default {
  content: ["*"],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite", // Define the shimmer animation
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" }, // Start position of the shimmer
          to: { backgroundPosition: "-200% 0" }, // End position of the shimmer
        },
      },
    },
  },
  plugins: [],
}

