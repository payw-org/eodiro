import { setDriftlessInterval, clearDriftless } from 'driftless'

export default class Stagger {
  constructor() {}

  static animate(elms) {
    elms.forEach((elm, index) => {
      elm.classList.remove('appear')
    })

    let i = 0
    let interval = setDriftlessInterval(() => {
      elms[i++].classList.add('appear')
      if (i === elms.length) {
        clearDriftless(interval)
      }
    }, 30)
  }
}