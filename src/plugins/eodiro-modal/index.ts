export default class EodiroModal {
  modalElm: HTMLElement

  constructor() {
    // initialize modal DOM and current mode
    this.modalElm = <HTMLElement>document.querySelector('.eodiro-modal')
  }

  alert(msg: string) {
    this.setMsg(msg)
    this.open('alert')

    const closeBtn = <HTMLElement>this.modalElm.querySelector('.act.close')

    closeBtn.onclick = e => {
      this.close()
    }
  }

  async confirm(msg: string) {
    this.setMsg(msg)
    this.open('confirm')

    return new Promise((res, rej) => {
      const okayBtn = <HTMLElement>this.modalElm.querySelector('.act.okay')

      okayBtn.onclick = e => {
        this.close()
        res(true)
      }

      const cancelBtn = <HTMLLIElement>(
        this.modalElm.querySelector('.act.cancel')
      )

      cancelBtn.onclick = e => {
        this.close()
        res(false)
      }
    })
  }

  private setMsg(msg: string) {
    this.modalElm.getElementsByClassName('message')[0].innerHTML = msg
  }

  private open(mode: 'alert' | 'confirm') {
    this.modalElm.classList.add('active')
    this.modalElm.classList.add(mode)
  }

  // close
  private close() {
    // remove active class first
    this.modalElm.classList.remove('active')

    setTimeout(() => {
      // remove specific mode class after transition
      this.modalElm.classList.remove('alert')
      this.modalElm.classList.remove('confirm')
    }, 200)
  }
}
