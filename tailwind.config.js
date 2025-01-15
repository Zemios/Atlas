/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-out forwards',
        'fade-out-up': 'fade-out-up 0.2s ease-out forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.break-anywhere': {
            'overflow-wrap': 'anywhere',
          },
        },
        ['responsive', 'hover']
      );

      addUtilities(
        {
          '@supports not (overflow-wrap: anywhere)': {
            '.break-anywhere': {
              'word-break': 'break-word',
            },
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
}

