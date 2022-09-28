module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'kumbh': ['Kumbh Sans', 'sans-serif']
    },
    extend: {
      colors: {
        'primary-orange': 'hsl(26, 100%, 55%)',
        'pale-orange': 'hsl(25, 100%, 94%)',
        'light-grayish-blue': 'hsl(223, 64%, 98%)',
        'dark-grayish-blue':'hsl(219, 9%, 45%)',
        'grayish-blue':'hsl(220, 14%, 75%)'
      },
    },
  },
  plugins: [],
}