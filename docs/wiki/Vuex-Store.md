## store/index

It contains basic states, mutations, actions and getters related to eodiro app itself like configurations, routeMap, history, scroll position and more.

### States

| Name | Type | Default | Description |
|--|--|--|--|
| `colorSchemeClassName` | `String` | `"light-mode"` | A color scheme mode's classname which will be injected into `html` tag |
| `cachedComponents` | `Array<String>` | `[]` | Caches pages' components and is passed in `keep-alive` attributes of `<Nuxt />` and `<NuxtChild />` |
| `hamletList` | `Array<String>` | [`[...]`](Terms/#Hamlet-Name) | Hamlet names list |