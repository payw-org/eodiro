export default class EodiroModal {
  modalElm: HTMLElement
  state: 'active' | 'inactive'

  constructor() {
    // initialize modal DOM and current mode
    this.modalElm = <HTMLElement>document.querySelector('.eodiro-modal')
  }

  alert(msg: string) {
    this.setMsg(msg)
    this.open('alert')
  }

  async confirm(msg: string) {
    this.setMsg(msg)
    this.open('confirm')

    return new Promise((res, rej) => {
      const okayBtn = <HTMLElement>this.modalElm.querySelector('.act.okay')

      if (okayBtn) {
        okayBtn.onclick = e => {
          this.close()
          console.log('press okay')
          res(true)
        }
      }

      const cancelBtn = <HTMLLIElement>(
        this.modalElm.querySelector('.act.cancel')
      )

      if (cancelBtn) {
        cancelBtn.addEventListener('click', e => {
          this.close()
          res(false)
        })

        cancelBtn.onclick = e => {
          this.close()
          res(false)
        }
      }
    })
  }

  private setMsg(msg: string) {
    this.modalElm.getElementsByClassName('message')[0].innerHTML = msg
  }

  private open(mode: 'alert' | 'confirm') {
    this.state = 'active'
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
