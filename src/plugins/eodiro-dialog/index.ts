import JSCookie from 'js-cookie'
import modalTemplate from './template.html'
import Mustache from 'mustache'

const conf = {
  langCookieName: 'i18n_lang'
}

const messages = {
  kr: {
    confirm: '확인',
    cancel: '취소',
    close: '닫기'
  },
  en: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close'
  }
}

export default class EodiroDialog {
  lang: string = 'kr'
  modalElm: HTMLElement
  confirmBtn: HTMLElement
  cancelBtn: HTMLElement
  closeBtn: HTMLElement

  constructor(lang?: string) {
    // init language
    if (lang) {
      this.lang = lang
    } else {
      this.lang = JSCookie.get(conf.langCookieName)
    }

    // create a DOM
    const wrapper = document.createElement('div')
    wrapper.innerHTML = Mustache.render(modalTemplate, messages[this.lang])
    this.modalElm = <HTMLElement>wrapper.firstElementChild
    document.body.appendChild(this.modalElm)
    this.modalElm.getBoundingClientRect().width

    // add eventlisteners
    let cushions = this.modalElm.getElementsByClassName('cushion')

    for (let cush of Array.from(cushions)) {
      ;['mousedown', 'touchstart'].forEach(eName => {
        cush.addEventListener(eName, e => {
          cush.classList.add('active')
        })
      })
      ;['mouseup', 'touchend', 'mouseleave', 'touchmove'].forEach(eName => {
        cush.addEventListener(eName, e => {
          cush.classList.remove('active')
        })
      })
    }

    this.confirmBtn = <HTMLElement>(
      this.modalElm.querySelector('.actions .confirm')
    )
    this.cancelBtn = <HTMLElement>(
      this.modalElm.querySelector('.actions .cancel')
    )
    this.closeBtn = <HTMLElement>this.modalElm.querySelector('.actions .close')
  }

  alert(msg: string) {
    this.setMsg(msg)
    this.open('alert')

    this.closeBtn.onclick = e => {
      this.close()
    }
  }

  confirm(msg: string) {
    this.setMsg(msg)
    this.open('confirm')

    return new Promise(resolve => {
      this.confirmBtn.onclick = e => {
        this.close()
        resolve(true)
      }

      this.cancelBtn.onclick = e => {
        this.close()
        resolve(false)
      }
    })
  }

  setMsg(msg: string) {
    this.modalElm.getElementsByClassName('message')[0].innerHTML = msg
  }

  open(mode: 'alert' | 'confirm') {
    this.modalElm.classList.add('active')
    this.modalElm.classList.add(mode)
  }

  close() {
    // remove active class first
    this.modalElm.classList.remove('active')

    setTimeout(() => {
      ;(<HTMLElement>this.modalElm.parentElement).removeChild(this.modalElm)
    }, 700)
  }
}
