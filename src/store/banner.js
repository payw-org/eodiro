export const state = () => ({
  isForcedMini: false
})

export const mutations = {
  enableForcedMini(state) {
    state.isForcedMini = true
  },
  disableForcedMini(state) {
    state.isForcedMini = false
  }
}
