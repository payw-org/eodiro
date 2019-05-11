import { TweenMax, Power3 } from 'gsap/TweenMax'

export default class Stagger {
  constructor() {}

  static animate(elms) {
    for (let i = 0; i < elms.length; i++) {
      elms[i].classList.remove('appear')
      // elms[i].style.transitionDelay = i/25 + 's'
    }

    // let i = 0
    // let interval = setInterval(() => {
    //   TweenMax.to(elms[i++], 0.6, {
    //     ease: Power3.ease,
    //     opacity: 1,
    //     transform: 'translateY(0)'
    //   })
    //   if (i === elms.length) {
    //     clearInterval(interval)
    //   }
    // }, 30)

    // setTimeout(() => {
    //   for (let i = 0; i < elms.length; i++) {
    //     elms[i].classList.add('appear')
    //     setTimeout(() => {
    //       elm[i].style.transitionDelay = ''
    //     }, i/25 * 1000)
    //   }
    // }, 100)

    let i = 0
    let interval = setInterval(() => {
      elms[i++].classList.add('appear')
      if (i === elms.length) {
        clearInterval(interval)
      }
    }, 40)
  }
}