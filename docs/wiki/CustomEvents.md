To develop effeciently, we're providing some useful events. You can hook your callback functions whenever custom events occur.

## CustomEventManager

Custom events are attached directly to `document` object. Unlike Vue's event handling, they are not automatically detached. So you should manually remove event listeners when a Vue instance is being destroyed.

However, we created an useful util for this situation. With `CustomEventManager`, `CEM` in shorthand, you don't have to consider the problem just mentioned above. When the event is dispatched, CEM garbage-collects event listeners attatched to the elements where they don't exist in document object.

```js
import { CEM } from '~/modules/custom-event-manager'
```

### API

**`addEventListener(eventName, target, listener)`**

Argument | Type | Description
--|--|--
`eventName` | `AvailableEventNames` | See [Events List](#Events-List)
`target` | `HTMLElement \| Element` | Used for identifying the existence and garbage collecting
`listener` | `EventListenerOrEventListenerObject` | Callback function

Since a custom event is attached to `document`, second argument `target` is used as an identifier of the event listener's reference.

> **eodiro** auto-caches previous routes(pages) components. So the event listeners which are attached on `mounted()` hook will be lost when the route goes forward.

```js
export default {
  activated() {
    CEM.addEventListener('scrollended', this.$el, () => {
      console.log('Load more data')
    })
  }
}
```

## Events List

### Page Transition

EventName | When
--- | ---
`beforepageleave` | Route change occurs and before page starts to leave
`afterpageleave` | After current page leaves
`beforepageenter` | Route change occurs and before destination page starts to enter
`afterpageenter` | After destination page enters

### Scroll

EventName | When
--- | ---
`scrollrestored` | After page enters and restores its scroll position. Only available when the route changing direction is backward
`scrollends` | Scroll reached to bottom of the page(not the target)

### Banner

EventName | When
--- | ---
`bannerminified` | **(Deprecated)** The banner enters mini mode
`bannerspreaded` | **(Deprecated)** The banner spreads to original size
`bannertransitionended` | Banner's transition end when move through routes

### Go Back Button

EventName | When
--- | ---
`gobackbtnappeared` | Go back button is appeared
`gobackbtnhidden` | Go back button is hidden