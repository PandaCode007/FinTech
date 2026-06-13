/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bf: {
          bg: "#000000",
          surface: "#0D0D0D",
          primary: "#FF4EC8",
          secondary: "#4E9EFF",
          text: "#FFFFFF",
          muted: "#B3B3B3",
          border: "#1A1A1A",
        }
      }
    },
  },
  plugins: [],
}