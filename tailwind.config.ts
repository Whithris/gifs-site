import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      borderWidth: {
        '1': '1px',
      },
      borderRadius: {
        '1px': '1px', 
      },
      backgroundImage: {
        'colored-gif': 'linear-gradient(135deg, #2EE6A8 0%, #3399FF 34.37%, #9933FF 69.27%, #FF3399 100%)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
],
} satisfies Config;
