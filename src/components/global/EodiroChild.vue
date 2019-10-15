<template>
  <NuxtChild
    keep-alive
    :keep-alive-props="{ include: $store.state.cachedComponents }"
  />
</template>
