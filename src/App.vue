<template>
  <div id="app">
    <transition
      name="fade"
    >
      <router-view @changeColorScheme="toggleColorScheme()"></router-view>
    </transition>
  </div>
</template>

<script>
import './scss/globalstyle'

export default {
  beforeMount() {
    this.setColorScheme()
  },
  mounted() {
    window.addEventListener('dragstart', e => {
      e.preventDefault()
    })
  },
  methods: {
    setColorScheme() {
      const html = document.documentElement

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
        window.localStorage.setItem('colorScheme', 'light')
        this.setColorScheme()
      }
    },
    updateColorScheme(scheme) {
      window.localStorage.setItem('colorScheme', scheme)
      this.setColorScheme()
    },
    toggleColorScheme() {
      let defaultColorScheme = window.localStorage.getItem('colorScheme')
      if (!defaultColorScheme) {
        defaultColorScheme = 'light'
        window.localStorage.setItem('colorScheme', defaultColorScheme)
      }

      let newColorScheme
      if (defaultColorScheme === 'light') {
        newColorScheme = 'dark'
      } else if (defaultColorScheme === 'dark') {
        newColorScheme = 'light'
      }

      this.updateColorScheme(newColorScheme)
    }
  },
  name: 'App',
  watch: {
  }
}
</script>

<style lang="scss">
#app {
}
</style>

