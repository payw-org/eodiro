<template>
  <div id="app">
    <Notification />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view
        @changeColorScheme="updateColorScheme"
        :is-right-direction="isRightDirection"
      ></router-view>
    </transition>
  </div>
</template>

<script>
import Notification from 'Components/Notification'
import RouteLocation from 'Modules/RouteLocation'

export default {
  name: 'App',
  components: {Notification},
  data() {
    return {
      isRightDirection: false
    }
  },
  watch: {
    $route (to, from) {
      this.isRightDirection = RouteLocation.isRightDirection(to.name, from.name)
    }
  },
  methods: {
    // set color scheme using the stored value
    setColorScheme() {
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
      } else { // if there is no stored value, default is light mode
        window.localStorage.setItem('colorScheme', 'light')
        this.setColorScheme()
      }
    },
    updateColorScheme(scheme) {
      window.localStorage.setItem('colorScheme', scheme)
      this.setColorScheme()
    },
    // toggle between light and dark (not working on auto mode)
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
  beforeMount() {
    this.setColorScheme()
  },
  mounted() {
    // prevent contextmenu popup
    window.oncontextmenu = function(e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  
    window.addEventListener('keydown', e => {
      if (e.key === 'D' && e.shiftKey) {
        this.updateColorScheme('dark')
      } else if (e.key === 'L' && e.shiftKey) {
        this.updateColorScheme('light')
      }
    })
  
    // prune all noscript tags
    document.querySelectorAll('noscript').forEach(elm => {
      elm.parentElement.removeChild(elm)
    })
  
    // platform detection
    const platform = require('platform')
  
    // store platform data to html tag for later use
    document.documentElement.setAttribute('data-platform', JSON.stringify({
      os: {
        name: platform.os.family,
        version: platform.os.version
      },
      browser: {
        name: platform.name,
        version: platform.version
      }
    }).toLowerCase())
  
    // prevent browser's default scroll restoration behaviour
    history.scrollRestoration = 'manual'
  }
}
</script>

<style lang="scss">
#app {
  display: block;
  min-height: 100vh;
}
</style>
