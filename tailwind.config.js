/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-lato)', 'sans-serif'],
            },
            fontSize: {
                '2xl': '1.5rem',
                '3xl': '1.75rem',
                '4xl': '2rem',
                '5xl': '2.25rem',
                '6xl': '2.5rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'base'
        })
    ],
};
