import JSCookie from 'js-cookie'
import Mustache from 'mustache'
import modalTemplate from './template.html'

const conf = {
  langCookieName: 'i18n_lang'
}

const messages = {
  kr: {
    confirmLabel: '확인',
    cancelLabel: '취소',
    closeLabel: '닫기'
  },
  en: {
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    closeLabel: 'Close'
  }
}

export default class EodiroDialog {
  private lang: string = 'kr'
  private dialogContainerElm: HTMLElement
  private confirmBtn: HTMLElement
  private cancelBtn: HTMLElement
  private closeBtn: HTMLElement

  constructor(lang?: string) {
    // init language
    if (lang) {
      this.lang = lang
    } else if (JSCookie.get(conf.langCookieName)) {
      this.lang = JSCookie.get(conf.langCookieName)
    } else {
      this.lang = 'kr'
    }

    // create a DOM
    const wrapper = document.createElement('div')
    wrapper.innerHTML = Mustache.render(modalTemplate, messages[this.lang])
    this.dialogContainerElm = <HTMLElement>wrapper.firstElementChild
    document.body.appendChild(this.dialogContainerElm)
    // eslint-disable-next-line no-unused-expressions
    this.dialogContainerElm.getBoundingClientRect().width

    this.confirmBtn = <HTMLElement>(
      this.dialogContainerElm.querySelector('.actions .confirm')
    )
    this.cancelBtn = <HTMLElement>(
      this.dialogContainerElm.querySelector('.actions .cancel')
    )
    this.closeBtn = <HTMLElement>(
      this.dialogContainerElm.querySelector('.actions .close')
    )
  }

  alert(msg: string) {
    this.setMsg(msg)
    this.open('alert')

    this.closeBtn.onclick = () => {
      this.close()
    }
  }

  confirm(msg: string) {
    this.setMsg(msg)
    this.open('confirm')

    return new Promise((resolve) => {
      this.confirmBtn.onclick = () => {
        this.close()
        resolve(true)
      }

      this.cancelBtn.onclick = () => {
        this.close()
        resolve(false)
      }
    })
  }

  vagabond(msg: string) {
    this.setMsg(msg)
    this.open('vagabond')
  }

  setMsg(msg: string) {
    this.dialogContainerElm.getElementsByClassName('message')[0].innerHTML = msg
  }

  open(mode: 'alert' | 'confirm' | 'vagabond') {
    this.dialogContainerElm.classList.add('active')
    this.dialogContainerElm.classList.add(mode)

    // Focus dialog to prevent enter
    setTimeout(() => {
      this.dialogContainerElm.focus()
    }, 10)

    // If vagabond mode, auto-close it after some time
    if (mode === 'vagabond') {
      setTimeout(() => {
        this.close()
      }, 1200)
    }
  }

  close() {
    // remove active class first
    this.dialogContainerElm.classList.remove('active')

    setTimeout(() => {
      ;(<HTMLElement>this.dialogContainerElm.parentElement).removeChild(
        this.dialogContainerElm
      )
    }, 700)
  }
}
