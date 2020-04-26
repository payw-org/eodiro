## Library

### Sass

```scss
@use '@/assets/styles/main' as *;
```

---

## Sections

- [Units](#units)
- [Layouts](#layouts)
- [Responsive Design](#responsive-design)
- [Typography](#typography)
- [Colors](#colors)
- [Dark Mode](#dark-mode)
- [Utilities](#utilities)

---

## Units

### Space

**Functions**

- **`s()`**

  It gives space. Returns proper gaps in `rem`.

- **`ss()`**

  Double space. If you need more space than `s(12)`, use this function. `ss(1)` equals to `s(12)`.

### Border Radius

**Functions**

- **`r()`**

**Variables**

- `$border-radius-outer`
- `$border-radius-inner`

**Mixins**

- `@include border-radius-outer`
- `@include border-radius-innter`

### Font Size

**Functions**

- **`b()`**

  Returns font size for body content in `rem`. It doesn't always have to be "body". Use this function where you want smaller font size for titles or headers.

- **`h()`**

  Returns font size for head content in `rem`. Like `b()`, use this function where you want larger font size for bodies or any other places. `h(1)` equals to `b(12)`.

## Layouts

### [BaseLayout](UI-Components.md/#baselayout)

![BaseLayout](https://user-images.githubusercontent.com/19797697/75721464-c17e4700-5d1b-11ea-8b4d-2fcff33c5cd4.png)

Padding, margin, width, max-width and all other style attributes for the master content are already defined, so you don't have to think about them when you develop new pages. You can customize them by styling the root element of a component.

**Variables**

| Name                     | Description               |
| ------------------------ | ------------------------- |
| `$app-content-max-width` | Max width of app content. |

## Responsive Design

Only use `rem` when you define a size. The `rem`ed size will automatically change based on the device's viewport width.

**Variables**

| Name             | Description                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| `$width-step--1` | If the viewport width is smaller than this, consider it as mobile environment. |
| `$width-step--2` | Larger screen needs larger UI.                                                 |

**Mixins**

> There are few useful/handy mixins when you design responsive layouts.

| Mixin                                   | Description                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| `@include smaller-than($width) { ... }` | Shortcut of `@media only screen and (max-width: $width) {}`.                        |
| `@include larger-than($width) { ... }`  | Shortcut of `@media only screen and (min-width: $width) {}`.                        |
| `@include on-mobile { ... }`            | When the viewport width is smaller than `$width-step--1`, we consider it as mobile. |

## Typography

### Semantics

**Headings**

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
```

Don't use `h4 ~ h6`. It also means that you should not make any circumstance that requires `h4 ~ h6`.

> **_NOTE:_** Do not use them just to make text bold or big. Use other tags for that.

**Paragraph**

```html
<p>Paragraph</p>
```

### Size

Basically and globally `h1 ~ h3, p` and also other tags have their own reasonably default sizes.

For detailed font sizes, check out [Units](#units).

## Colors

### White and Black

Use `#fff` and `#000` hex shortcuts for white and black. Never use `white` or `black` directly.

### Chromatic Colors

**Variables**

- For Sass, see the `variables.scss`.
- For TypeScript, see the `EodiroColors.ts`.

### Background Colors

**Mixins**

- `@include bg`
- `@include bg-inverted`
- `@include elm-fill`
- `@include elm-fill-inverted`

### Translucently Layered Colors

> Use these colors to add a distinctive area above an another element.

**Mixins**

- `@include overlay`
- `@include overlay-inverted`

### Text Colors

**Variables**

- `$base-gray`

  The universal greyed color for both light mode and dark mode.

**Mixins**

- `@include text-color`
- `@include text-color-inverted`

## Dark Mode

Most of the time you won't need to define styles for dark mode on each situation since all the mixins support dark mode automatically out of the box. However, if you wish to create your own styles for dark mode there is a simple way to achieve this.

> All the styles you wrote is for light mode as default.

| Mixin                      | Description                                     |
| -------------------------- | ----------------------------------------------- |
| `@mixin dark-mode { ... }` | Insert dark mode style inside the curly braces. |
