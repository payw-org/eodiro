export const state = () => ({
  isForcedMini: false,
  mcBannerMiniFlag: false // adjust main-content padding-top
})

export const mutations = {
  enableForcedMini (state) {
    state.isForcedMini = true
  },
  disableForcedMini (state) {
    state.isForcedMini = false
  },
  setMcBannerMiniFlag (state, bool) {
    state.mcBannerMiniFlag = bool
  }
}
