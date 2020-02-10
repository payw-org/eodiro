<img src="https://user-images.githubusercontent.com/52942171/62094601-a3012a80-b2b8-11e9-8a7c-c434674467f4.png">
A heart of identities of eodiro. It automatically generates the precise number of tiles by calculating the size of the Banner. Only visible at home.

## Dependencies
Tiles component has some css dependencies.
* There must be no scrollbar.
* Rem is specified as 85%, 110% and 130% where width boundaries are 700px and 1400px.
* Banner parent componet of Tiles has 40vh height.

If you want to modify dependent variables, there are these options.

```javascript
const heightParentComponent = 40/100
const remRatioMoreThan1400 = 1.3
const remRatioMoreThan700 = 1.1
const remRatioUnder700 = 0.85
```
