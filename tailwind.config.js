/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // enable manual dark mode toggling via 'dark' class
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
