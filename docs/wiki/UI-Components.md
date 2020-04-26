**eodiro UI Components** is a set of reusable React components to be used instead of original HTML tags. It gives you a much faster, unified and flexible development experience.

---

- [Layouts](#layouts)

  - [BaseLayout](#baselayout)
  - [Grid](#grid)

- [Blocks](#blocks)
  - [ArrowBlock](#arrowblock)

---

## Layouts

### BaseLayout

Curretnly every page should include this component on top of the others.

```tsx
<BaseLayout>
  <div>
    <h1>My Body Content</h1>
  </div>
</BaseLayout>
```

**Props**

| Name            | Types     | Description                                                                             |
| --------------- | --------- | --------------------------------------------------------------------------------------- |
| `hasTopGap`     | `boolean` | Insert slight gap above the body content. Default `true`.                               |
| `appClassName`  | `string`  | You can append the page's own class name along with the component's default class name. |
| `bodyClassName` | `string`  | Additive class name for body section.                                                   |

### Grid

This component creates a grid container. Children items will be automatically wrapped down to next lines when they reach the minimum width.

```tsx
<Grid>
  <div>My Item 1</div>
  <div>My Item 2</div>
  <div>My Item 3</div>
</Grid>
```

**Props**

| Name         | Types                                            | Description                                                             |
| ------------ | ------------------------------------------------ | ----------------------------------------------------------------------- |
| `proportion` | `'extraSmall' \| 'small' \| 'medium' \| 'large'` | Defines grid minimum size. Passing nothing equals to "medium".          |
| `gap`        | `'small' \| 'medium' \| 'large'`                 | Defines the gap between grid items. Passing nothing equals to "medium". |

## Blocks

### ArrowBlock

It creates general right-arrowed, clickable block item.

```tsx
<ArrowBlock>
  <div>Content</div>
</ArrowBlock>
```

**Props**

| Name      | Types     | Description                                                                   |
| --------- | --------- | ----------------------------------------------------------------------------- |
| `noArrow` | `boolean` | Set this attribute to remove an arrow. Then you can use it as a normal block. |
| `flat`    | `boolean` | Remove hover, active effect.                                                  |
