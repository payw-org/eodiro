export default class Stagger {
  constructor() {}

  /**
   * Returns a callback function to be used in setTimeout
   * @param {Array<HTMLElement>} elms
   * @param {number} i start index
   * @param {number} j end index
   */
  static showElement(elms, i, j) {
    if (!elms[i] || i > j) {
      return
    }

    let that = this
    let f
    elms[i].addEventListener('animationstart', f = function (e) {
      if (e.animationName === 'springFadeUp') {
        setTimeout(() => {
          that.showElement(elms, i + 1, j)
          this.removeEventListener('animationstart', f)
        }, 20)
      }
    })
    elms[i].classList.add('stagger-appear')
  }

  /**
   * Show elements by adding classnames sequentially
   * @param {Array<HTMLElement>} elms 
   */
  static show(elms, hasParent = false) {
    if (!elms || elms.length === 0) {
      return
    }

    // forward
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

    // backward
    let j = elms.length - 1
    for (; j >= 0; j--) {
      let boundaryTarget = elms[j]
      if (hasParent) {
        boundaryTarget = elms[j].parentElement
      }
      let rect = boundaryTarget.getBoundingClientRect()
      let top = rect.top
      let bottom = rect.bottom
    
      if (
        (top < 0 && bottom < 0) ||
        (top > window.innerHeight && bottom > window.innerHeight)
      ) {
        elms[j].classList.add('stagger-appear-fix')
      } else {
        break
      }
    }

    // start animation on elements that are in the viewport
    this.showElement(elms, i, j)
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