**eodiro UI Components** is a set of reusable Vue components to be used instead of original HTML tags. It gives you much faster, unified and flexible development experience.

> Be aware that components where their names are the same as HTML default elements tags cannot be used inside HTML template(not recommended). For example, `<Button />` is different from `<button />`. `<button />` creates an HTML default button element.

---

- Basic
  - [Button](#button)

- Layouts
  - [Grid](#grid)

- Blocks
  - [ArrowBlock](#arrowblock)
  - [Accordion](#accordion)

---

## Basic

### Button

**NOTE**

- Labels should not wrap to multilines or exceed the width of minimum size of button.
- So try to make labels as short as possible while conveying a comprehensive meaning.
- If you plan to add an icon to a button, also it should not exceed the button's height.

```html
<Button>Click Me</Button>
```
```js
import { Button } from '~/components/ui'

export default {
  components: { Button }
}
```

**Props**

Name | Types | Description
--|--|--
`full` | `Boolean` | Set this attribute to make a button fit to parent's width. `full` and `full="true"` is the same.

**Events**
- `@click`

## Layouts

### Grid

This component creates a grid container. Children items will be automatically wrapped down to next lines when they reach the minimum width.

```html
<Grid proportion="small" />
```
```js
import { Grid } from '~/components/ui

export default {
  components: { Grid }
}
```

**Props**

Name | Types | Description
--|--|--
`proportion` | `"small" \| "medium" \| "large"` | Decides grid minimum size. Passing nothing equals to "medium".

## Blocks

### ArrowBlock

It creates general right-arrowed menu block item.

```html
<ArrowBlock />
```
```js
import { ArrowBlock } from '~/components/ui

export default {
  components: { ArrowBlock }
}
```

**Props**

Name | Types | Description
--|--|--
`noArrow` | `Boolean` | Set this attribute to remove an arrow. Then you can use it as a normal block.
`link` | `String` | You can specify where to go when click a block.

**Slots**
- `icon`: You can add an icon to a block item.
- `content`

**Examples**
```html
<ArrowBlock link="https://eodiro.com">
  <template v-slot:icon>
    <!-- you should include a classname 'icon' -->
    <span class="icon my-icon"></span>
  </template>

  <template v-slot:content>
    My Block Item
  </template>
</ArrowBlock>
```
```scss
.my-icon {
  background-image: '~assets/icon.svg';
}
```

### Accordion

A collapsable(foldable) block element.

```html
<Accordion />
```
```js
import { Accordion } from '~/components/ui

export default {
  components: { Accordion }
}
```

**Slots**
- `face`
- `content`

**Props**

Name | Types | Description
--|--|--
`elastic` | `Boolean` | Set this `true` to unset `min-height`

**Examples**
```html
<Accordion>
  <template v-slot:face>
    <h3>Always shown</h3>
  </template>

  <template v-slot:content>
    <p>Accordion content</p>
  </template>
</Accordion>
```