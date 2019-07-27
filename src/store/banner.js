export const state = () => ({
  top: 0,
  fixedTop: 0,
  shiftAmount: 0, // transform amount
  sticky: false,
  fixed: false,
  mini: false,
  navMode: false,
  navHeight: null,
  height: null,
  isTransTriggered: false,
  isFaxHidden: true,
  isOrgHidden: false
})

export const mutations = {
  init(state, obj) {
    if ('navHeight' in obj) {
      state.navHeight = obj.navHeight
    }
    if ('height' in obj) {
      state.height = obj.height
    }
  },
  setTop(state, value) {
    state.top = value
  },
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
    console.log('fixed')
    state.fixed = true
    state.fixedTop = state.top
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
