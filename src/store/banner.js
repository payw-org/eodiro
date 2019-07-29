export const state = () => ({
  shiftAmount: 0, // transform amount
  sticky: false,
  fixed: false,
  mini: false,
  navMode: false,
  height: undefined,
  isTransTriggered: false,
  isFaxHidden: true,
  isOrgHidden: false
})

export const mutations = {
  resetShift(state) {
    state.shiftAmount = 0
  },
  shift(state, amount) {
    state.shiftAmount = amount
  },
  sticky(state) {
    state.sticky = true
  },
  unsticky(state) {
    state.sticky = false
  },
  fixFax(state) {
    state.fixed = true
  },
  unfixFax(state) {
    state.fixed = false
    state.shiftAmount = 0
  },
  minify(state) {
    state.mini = true
  },
  unminify(state) {
    state.mini = false
  },
  setNavMode(state, bool) {
    state.navMode = bool
  },
  showFax(state) {
    // mount facsimile banner
    state.isFaxHidden = false
  },
  hideFax(state) {
    state.isFaxHidden = true
  },
  showOriginal(state) {
    state.isOrgHidden = false
  },
  hideOriginal(state) {
    state.isOrgHidden = true
  },
  triggerTransition(state) {
    state.isTransTriggered = true
  },
  resetTrigger(state) {
    state.isTransTriggered = false
  }
}
