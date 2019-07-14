import ColorScheme from '~/plugins/ColorScheme.ts'

// set color scheme on load
if (!process.server) {
  ColorScheme.setColorScheme()
}
