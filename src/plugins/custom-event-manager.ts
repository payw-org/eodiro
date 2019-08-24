type AvailableEventNames =
  | 'beforepageleave'
  | 'afterpageleave'
  | 'beforepageenter'
  | 'afterpageenter'
  | 'scrollrestored'
  | 'scrollends'
  | 'bannerminified'
  | 'bannerspreaded'
  | 'gobackbtnappeared'
  | 'gobackbtnhidden'

// An interface for a group of event target and event callback
interface EventChunk {
  target: HTMLElement | Element
  listener: EventListenerOrEventListenerObject
}

// CustomEventManager
export class CEM {
  private static storage: { [key: string]: Array<EventChunk> } = {}
  private static observer: MutationObserver
  private static observerConfig: MutationObserverInit = {
    childList: true,
    subtree: true
  }
  private static isInitiated: Boolean = false

  public static initObserver() {
    console.log('CEM created')
    if (this.isInitiated) {
      return
    }

    this.isInitiated = true
  }

  // If the array with a key of event name is not set, create one
  private static initEventKeyArray(eventName: string) {
    if (
      !this.storage.hasOwnProperty(eventName) ||
      !Array.isArray(this.storage[eventName])
    ) {
      this.storage[eventName] = []
    }
  }

  // Remove event listener with the same event name and callback
  private static removeEventListener(
    eventName: string,
    listener: EventListenerOrEventListenerObject
  ) {
    document.removeEventListener(eventName, listener)
  }

  // Attach event listener to document
  public static addEventListener(
    eventName: AvailableEventNames,
    target: HTMLElement | Element,
    listener: EventListenerOrEventListenerObject
  ) {
    this.initEventKeyArray(eventName)
    document.addEventListener(eventName, listener)
    this.storage[eventName].push(<EventChunk>{
      target,
      listener
    })
  }

  // public static collectGarbage() {
  // }

  // Dispatch custom event after validating if elements are included in document
  public static dispatchEvent(eventName: AvailableEventNames) {
    if (this.storage.hasOwnProperty(eventName)) {
      if (Array.isArray(this.storage[eventName])) {
        let i = this.storage[eventName].length
        while (i--) {
          const chunk = this.storage[eventName][i]
          if (!chunk.target.parentElement) {
            this.removeEventListener(eventName, chunk.listener)
            this.storage[eventName].splice(i, 1)
          }
        }
      }
    }

    document.dispatchEvent(new CustomEvent(eventName))
  }
}
