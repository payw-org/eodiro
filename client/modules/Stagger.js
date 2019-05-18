export default class Stagger {
  constructor() {}

  /**
   * 
   * @param {Array<HTMLElement>} elms 
   */
  static show(elms, hasParent = false) {
    if (!elms || elms.length === 0) {
      return
    }

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

    let interval = window.setInterval(() => {
      if (!elms[i]) {
        window.clearInterval(interval)
        return
      } else {
        if (elms[i].classList.contains('stagger-appear') || elms[i].classList.contains('stagger-appear-fix')) {
          window.clearInterval(interval)
          return
        } else {
          elms[i++].classList.add('stagger-appear')
        }
      }
    }, 50)
  }

  /**
   * 
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