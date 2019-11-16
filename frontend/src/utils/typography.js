import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Gotham Rounded', 'sans-serif'],
  bodyFontFamily: ['Gotham Rounded', 'sans-serif'],
  // See below for the full list of options.
})

// Output CSS as string.
typography.toString()

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
export default typography.injectStyles()
