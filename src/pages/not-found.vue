<template>
  <div />
</template>

<script>
export default {
  middleware({ error }) {
    error({
      statusCode: 404,
    })
  },
}
</script>
