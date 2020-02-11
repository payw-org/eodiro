/**
 * @typedef {'beforepageleave' | 'afterpageleave' | 'beforepageenter' | 'afterpageenter' | 'scrollrestored' | 'scrollended' | 'bannertransitionended' | 'gobackbtnappeared' | 'gobackbtnhidden'} AvailableEventNames
 */

/**
 * @interface EventChunk
 */

// An interface for a group of event target and event callback
// interface EventChunk {
//   target: HTMLElement | Element
//   listener: EventListenerOrEventListenerObject
// }

// CustomEventManager
export class CEM {
  /**
   * If the array with a key of event name is not set, create one
   * @param {string} eventName
   */
  static initEventKeyArray(eventName) {
    if (!this.storage[eventName] || !Array.isArray(this.storage[eventName])) {
      this.storage[eventName] = []
    }
  }

  /**
   * Remove event listener with the same event name and callback
   * @param {AvailableEventNames} eventName
   * @param {EventListenerOrEventListenerObject} listener
   */
  static removeEventListener(eventName, listener) {
    const i = this.storage[eventName].findIndex((event) => {
      return event.listener === listener
    })
    this.storage[eventName].splice(i, 1)
    document.removeEventListener(eventName, listener)
  }

  /**
   * Attach event listener to document.
   * @param {AvailableEventNames} eventName
   * @param {HTMLElement | Element} target
   * @param {EventListenerOrEventListenerObject} listener
   */
  static addEventListener(eventName, target, listener) {
    if (!(target instanceof HTMLElement) && !(target instanceof Element)) {
      console.error('CEM - Second argument should be HTMLElement or Element')
      return
    }

    this.initEventKeyArray(eventName)

    // Check if the same event listener has already been added
    for (const chunk of this.storage[eventName]) {
      if (chunk.target.isSameNode(target)) {
        console.warn(
          `CEM - ${eventName} event is already attached to ${target}`
        )
        return
      }
    }

    document.addEventListener(eventName, listener)
    this.storage[eventName].push({
      target,
      listener,
    })
  }

  /**
   * Dispatch custom event after validating if elements are included in document
   * @param {AvailableEventNames} eventName
   * @param {any} data
   */
  static dispatchEvent(eventName, data) {
    if (this.storage[eventName] && Array.isArray(this.storage[eventName])) {
      let i = this.storage[eventName].length
      while (i--) {
        const chunk = this.storage[eventName][i]
        if (!chunk.target.parentElement) {
          document.removeEventListener(eventName, chunk.listener)
          this.storage[eventName].splice(i, 1)
        }
      }
    }

    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: data,
      })
    )
  }
}

CEM.storage = {}

/** @type {MutationObserver} */
CEM.observer = undefined

/** @type {MutationObserverInit} */
CEM.observerConfig = {
  childList: true,
  subtree: true,
}
