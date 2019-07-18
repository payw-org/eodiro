import template from './template.html'

export default class EodiroModal {
  modalElm: HTMLElement

  constructor() {
    this.modalElm = <HTMLElement>document.querySelector('.eodiro-modal')

    if (!this.modalElm) {
      let temp = document.createElement('div')
      temp.innerHTML = template
      this.modalElm = <HTMLElement>temp.firstElementChild

      document.body.append(this.modalElm)
    }
  }

  activate(mode: 'alert' | 'confirm', msg: string) {
    this.modalElm.getElementsByClassName('message')[0].innerHTML = msg
  }

  close() {}
}
