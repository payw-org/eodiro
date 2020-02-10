![banner_home_dark](https://user-images.githubusercontent.com/19797697/62003421-ad54e480-b151-11e9-9b81-24f7c40a25e2.png)

**eodiro Banner** is a new challenging UI design which is extending the original tile design of previous version of eodiro.

## Tiles
A heart of identities of eodiro. It automatically generates the enough number of tiles by calculating the size of the Banner. It is only visible at home.

For more information, read [Tiles](Tiles).

## Mini Mode
<img width="100%" alt="Screen Shot 2019-08-19 at 9 29 48 AM" src="https://user-images.githubusercontent.com/19797697/63232573-f20d0080-c263-11e9-9815-cdbe472d87c5.png">

[Apps](Terms/#app) pages when it is scrolled down and all the chilren pages under the Apps should use **_mini mode_** to deliver users a tidy experience.

### intersectionObserver and Sentinel
A **_sentinel_** element is placed globally at a suitable distance from the top relatively to the Banner. Whenever it appears and disappears, an [intersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) observes its visibility and toggles mini mode.

### How to apply forced mini mode?
Set an object key `bannerMode` to `'mini'` inside the chilren pages. For these pages, the banner always stays as mini mode. This is necessary for children pages and you must always apply this option for all of them.

```javascript
export default {
  meta: {
    bannerMode: 'mini'
  }
}
```

Default | Mini Mode
:---:|:---:
![](https://user-images.githubusercontent.com/19797697/63232596-3b5d5000-c264-11e9-8c86-9a949bd2712b.png)  |  ![](https://user-images.githubusercontent.com/19797697/63232597-3ef0d700-c264-11e9-9ef7-24b01e5db58e.png)

## Sizes
Check `_variables.scss` partial.

