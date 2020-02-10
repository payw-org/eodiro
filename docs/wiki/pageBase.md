This is a Vue mixin which all page components should extend.

## Migration from `EodiroPageBase` to `pageBase`

Older
```js
import EodiroPageBase from '~/components/global/EodiroPageBase.vue'

export default {
  extends: EodiroPageBase
}
```

Newer
```js
import pageBase from '~/mixins/page-base'

export default {
  mixins: [pageBase]
}
```

## What it does?
It provides common functionalities across pages.

For now, it

- Saves and restores scroll position when the page is deactivated or activated.