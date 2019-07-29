export const state = () => ({
  isForcedMini: false
})

export const mutations = {
  setMini(state) {
    state.isForcedMini = true
  },
  releaseMini(state) {
    state.isForcedMini = false
  }
}
