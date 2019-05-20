export default class Stagger {
  constructor() {}

  /**
   * Returns a callback function to be used in setTimeout
   * @param {HTMLElement} elm 
   */
  static showElement(elm) {
    return function () {
      elm.classList.add('stagger-appear')
    }
  }

  /**
   * Show elements by adding classnames sequentially
   * @param {Array<HTMLElement>} elms 
   */
  static show(elms, hasParent = false) {
    if (!elms || elms.length === 0) {
      return
    }

    if (elms[0].classList.contains('stagger-appear') || elms[0].classList.contains('stagger-appear-fix')) {
      return
    }

    // add fixed class name ('stagger-appear-fix' -> opacity: 0)
    // to the elements which are not in the viewport
    let i = 0
    for (; i < elms.length; i++) {
      let boundaryTarget = elms[i]
      if (hasParent) {
        boundaryTarget = elms[i].parentElement
      }
      let rect = boundaryTarget.getBoundingClientRect()
      let top = rect.top
      let bottom = rect.bottom

      if (
        (top < 0 && bottom < 0) ||
        (top > window.innerHeight && bottom > window.innerHeight)
      ) {
        elms[i].classList.add('stagger-appear-fix')
      } else {
        break
      }
    }

    // @deprecated
    // using forEach

    // window.setTimeout(() => {
    //   elms.forEach((elm, i) => {
    //     window.setTimeout(this.showElement(elm), i * 50)
    //   })
    // }, 0)

    for (let j = 0; i < elms.length; i++, j++) {
      if (elms[i].classList.contains('stagger-appear') || elms[i].classList.contains('stagger-appear-fix')) {
        break
      }
      let callback = this.showElement(elms[i])
      setTimeout(callback, j * 55);
    }

    // @deprecated
    // using setInterval

    // let interval = window.setInterval(() => {
    //   if (!elms[i]) {
    //     window.clearInterval(interval)
    //     return
    //   } else {
    //     if (elms[i].classList.contains('stagger-appear') || elms[i].classList.contains('stagger-appear-fix')) {
    //       window.clearInterval(interval)
    //       return
    //     } else {
    //       elms[i++].classList.add('stagger-appear')
    //     }
    //   }
    // }, 50)
  }

  /**
   * Hide elements by removing classnames
   * @param {Array<HTMLElement>} elms 
   */
  static hide(elms) {
    if (!elms || elms.length === 0) {
      return
    }

    elms.forEach(elm => {
      elm.classList.remove('stagger-appear')
      elm.classList.remove('stagger-appear-fix')
    })
  }
}