import template from './template.html'

export default class EodiroModal {
  modalElm: HTMLElement

  constructor() {
    this.modalElm = <HTMLElement>document.querySelector('.eodiro-modal')

    if (!this.modalElm) {
      this.modalElm = new DOMParser().parseFromString(
        template,
        'text/xml'
      ).documentElement

      document.body.append(this.modalElm)
    }
  }

  activate(mode: 'alert' | 'confirm', msg: string) {
    this.modalElm.getElementsByClassName('message')[0].innerHTML = msg
  }

  close() {}
}
