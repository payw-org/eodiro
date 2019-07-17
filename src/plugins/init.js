import ColorScheme from '~/plugins/ColorScheme.ts'

// set color scheme on load
if (!process.server) {
  ColorScheme.setColorScheme()

  // testing
  // detect browser language and recommend right language url
  let browserLang = navigator.language.split('-')
  let urlLang = window.location.pathname.split('/')[1]

  console.log(`browser: ${browserLang}, route: ${urlLang}`)
}
