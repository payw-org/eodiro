import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import JSCookie from 'js-cookie'
import Mustache from 'mustache'
import { template as modalTemplate } from './template.js'

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
    this.index = 0

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
    /** @type {HTMLElement} */
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
    this.index = EodiroDialog.alertsOrConfirms.push(0) - 1

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
    this.index = EodiroDialog.alertsOrConfirms.push(0) - 1

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
    if (mode !== 'vagabond') {
      disableBodyScroll(document.body)
    }

    document.activeElement.blur()

    setTimeout(() => {
      this.dialogContainerElm.ontransitionstart = () => {
        if (mode === 'alert') {
          this.closeBtn.querySelector('button').focus()
        } else if (mode === 'confirm') {
          this.confirmBtn.querySelector('button').focus()
        }
      }

      this.dialogContainerElm.classList.add('active')
      this.dialogContainerElm.classList.add(mode)
    }, 0)

    // If vagabond mode, auto-close it after some time
    if (mode === 'vagabond') {
      setTimeout(() => {
        this.close()
      }, 1500)
    }
  }

  close() {
    EodiroDialog.alertsOrConfirms.splice(this.index, 1)

    if (EodiroDialog.alertsOrConfirms.length === 0) {
      // Enable body scroll
      clearAllBodyScrollLocks()
    }

    // Remove active class
    this.dialogContainerElm.classList.remove('active')

    setTimeout(() => {
      this.dialogContainerElm.remove()
    }, 300)
  }
}

EodiroDialog.alertsOrConfirms = []
