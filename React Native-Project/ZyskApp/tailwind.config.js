/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update paths to match your project structure
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // If you have a src folder
  ],
  presets: [require("nativewind/preset")], // Critical for v4!
  theme: {
    extend: {},
  },
  plugins: [],
}