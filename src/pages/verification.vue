<template>
  <div id="eodiro-verification" />
</template>

<script>
// import Axios from 'axios'

export default {
  middleware({ app, route, redirect }) {
    const { t } = route.query
    if (!t) {
      redirect(app.localePath('home'))
    }

    const token = t
    console.log(token)
    // Axios.get('https://api2.eodiro.com/')
  }
}
</script>
