export default class ColorScheme {
  constructor() {}

  static setColorScheme() {
    const html = document.documentElement

    // clear theme
    html.classList.remove('light-mode')
    html.classList.remove('dark-mode')
    html.classList.remove('auto-color-scheme')

    let setting = window.localStorage.getItem('colorScheme')
    if (setting === 'light') {
      html.classList.add('light-mode')
    } else if (setting === 'dark') {
      html.classList.add('dark-mode')
    } else if (setting === 'auto') {
      html.classList.add('auto-color-scheme')
    } else {
      // if there is no stored value, default is light mode
      window.localStorage.setItem('colorScheme', 'light')
      this.setColorScheme()
    }
  }

  static updateColorScheme(scheme: 'light' | 'dark' | 'auto') {
    window.localStorage.setItem('colorScheme', scheme)
    this.setColorScheme()
  }
}
