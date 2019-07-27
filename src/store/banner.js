export const state = () => ({
  top: 0,
  shiftAmount: 0, // transform amount
  fixed: false,
  mini: false,
  navHeight: null,
  height: null
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
  fix(state) {
    state.fixed = true
  },
  unfix(state) {
    state.fixed = false
    state.shiftAmount = 0
  },
  minify(state) {
    state.mini = true
  },
  unminify(state) {
    state.mini = false
  }
}
