export default class Stagger {
  constructor() {}

  static animate(arr) {
    if (!arr || !arr.length || arr.length === 0) return

    for (let i = 0; i < arr.length; i++) {
      arr[i].appear = false
    }

    // let i = 0
    // let interval = setInterval(() => {
    //   if (i === arr.length) {
    //     clearInterval(interval)
    //   } else {
    //     arr[i++].appear = true
    //   }
    // }, 40)
    for (let i = 0; i < arr.length; i++) {
      arr[i].appear = true
    }
  }
}