module.exports = {
  content: [
    './index.html',
    './js/app.js',
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1a2a45', light: '#273b5c', dark: '#0f1b2e' },
        sage: { DEFAULT: '#a3b89c', light: '#cbd7c7', dark: '#7c9475' },
        creme: { DEFAULT: '#f5f0e8', light: '#faf8f5', dark: '#e3dac9', white: '#ffffff' },
        gold: { DEFAULT: '#c9a96e', dark: '#a8895a' }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'], serif: ['Playfair Display', 'serif'] }
    }
  }
}
