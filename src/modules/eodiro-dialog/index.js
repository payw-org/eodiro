import JSCookie from 'js-cookie'
import Mustache from 'mustache'
import modalTemplate from './template.html'
import './style.scss'

const conf = {
  langCookieName: 'eodiro_lang',
}

const messages = {
  ko: {
    confirmLabel: '확인',
    cancelLabel: '취소',
    closeLabel: '닫기',
  },
  en: {
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    closeLabel: 'Close',
  },
}

export default class EodiroDialog {
  /**
   * @param {'ko'|'en'=} lang
   */
  constructor(lang) {
    // init language
    if (lang) {
      this.lang = lang
    } else if (JSCookie.get(conf.langCookieName)) {
      this.lang = JSCookie.get(conf.langCookieName)
    } else {
      this.lang = 'ko'
    }

    // create a DOM
    const wrapper = document.createElement('div')
    wrapper.innerHTML = Mustache.render(modalTemplate, messages[this.lang])
    this.dialogContainerElm = wrapper.firstElementChild
    document.body.appendChild(this.dialogContainerElm)
    // eslint-disable-next-line no-unused-expressions
    this.dialogContainerElm.getBoundingClientRect().width

    this.confirmBtn = this.dialogContainerElm.querySelector('.actions .confirm')
    this.cancelBtn = this.dialogContainerElm.querySelector('.actions .cancel')
    this.closeBtn = this.dialogContainerElm.querySelector('.actions .close')
  }

  /**
   * @param {string} msg
   */
  alert(msg) {
    this.setMsg(msg)
    this.open('alert')

    return new Promise((resolve) => {
      this.closeBtn.onclick = () => {
        this.close()
        resolve(true)
      }
    })
  }

  /**
   * @param {string} msg
   */
  confirm(msg) {
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

  /**
   * @param {string} msg
   */
  vagabond(msg) {
    this.setMsg(msg)
    this.open('vagabond')
  }

  /**
   * @param {string} msg
   */
  setMsg(msg) {
    this.dialogContainerElm.getElementsByClassName(
      'message'
    )[0].innerHTML = msg.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }

  /**
   * @param {'alert' | 'confirm' | 'vagabond'} mode
   */
  open(mode) {
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
      }, 1500)
    }
  }

  close() {
    // remove active class first
    this.dialogContainerElm.classList.remove('active')

    setTimeout(() => {
      this.dialogContainerElm.parentElement.removeChild(this.dialogContainerElm)
    }, 700)
  }
}
