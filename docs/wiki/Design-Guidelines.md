## Import

```scss
@import '~/assets/styles/scss/main';
```

---

- [UI 6](#UI-6)
- [Layouts](#layouts)
- [Responsive Design](#responsive-design)
- [Typography](#typography)
- [Colors](#colors)
- [Borders](#borders)
- [Spacing](#spacing)

---

## UI 6

Build and design UI faster with carefully predefined 6 steps of every aspect. You can pass number from 1 to 6 to Sass functions.

### s()
Returns proper gaps in `rem`.

### f()
If you need more space than `s(6)`, use this function. f means far.

### r()
Returns proper border-radius amount in `rem`.

### b()
Returns font size for body content in `rem`. It doesn't always have to be "body". Use this function where you want smaller font size for titles or headers.

### h()
Returns font size for head content in `rem`. Same as `body()`, use this function where you want larger font size for bodies or any other places.

### fw()
Returns font-weight in `rem`. It reduces time for you from being thinking about what font weights are eligible. We properly assigned font weights to each number from 1 to 6. These options may be changed at some point.

### lh()
Returns line-height in `rem`.

## Layouts

### default.vue

Nuxt.js has a notion of **_layouts_**. You can just consider it as an `App.vue` file on a traditional Vue app.

![iPhone SE](https://user-images.githubusercontent.com/19797697/62354100-115b1c80-b547-11e9-9978-5b2059f9c9f7.png)

Padding, margin, width, max-width and all other style attributes for the master content are already defined, so you don't have to think about them when you develop new pages. You can customize them by styling the root element of a component.

**Variables**

Name | Description
--|--
`$master-content-max-width` | Max width of master content.
`$master-content-top-gap` | Gap from the banner.
`$master-content-bottom-gap` | Gap from the bottom.

## Responsive Design
Only use `rem` when you define a size. The `rem`ed size will automatically change based on devices' viewport width.

**Variables**

Name | Description
--|--
`$width-step--1` | If the viewport width is smaller than this, consider it as mobile environment.
`$width-step--2` | Larger screen needs larger UI.

**Mixins**

> There are few useful/handy mixins when you design responsive layouts.

Mixin | Description
--|--
`@mixin smaller-than($width) { ... }` | Shortcut of `@media only screen and (max-width: $width) {}`.
`@mixin larger-than($width) { ... }` | Shortcut of `@media only screen and (min-width: $width) {}`.
`@mixin on-mobile { ... }` | When the viewport width is smaller than `$width-step--1`.

## Typography

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

**Mixins**

> By default, tags have their own styles like font weight, font size or line height. But you can apply different styles of other types of typography with mixins.

Mixin | Description
--|--
`@mixin heading1` | Applies `h1` style.
`@mixin heading2` | Applies `h2` style.
`@mixin heading3` | Applies `h3` style.
`@mixin paragraph` | Applies `p` style.

### 

## Colors

> **_NOTE:_** Use mixins instead of using variables directly.

### White and Black
Use `#fff` and `#000` for white and black. Don't use `white` or `black` directly on any other color properties.

### Dark Mode
Most of the time you won't need to define styles for dark mode since all mixins support it out of the box. However, if you wish to create your own styles for dark mode there is a simple way to achieve this. All the styles you wrote is for light mode as default.

Mixin | Description
--|--
`@mixin dark-mode { ... }` | Insert dark mode style inside the curly braces.

### Chromatic Colors

**Variables**

Name | Description
--|--
`$c-step--4` | A primary color across the entire system.

### Background Colors

**Variables**

Name | Description
--|--
`$base-white-blue` | Slightly bluish white color for elements fill.
`$base-black-soft` | Black color for elements fill.

**Mixins**

Mixin | Light Mode | Dark Mode
--|--|--
`@mixin bg` | `#fff` | `#000`
`@mixin bg-inverted` | `#000` | `#fff`
`@mixin elm-fill` | `$base-white-blue` | `$base-black-soft`
`@mixin elm-fill-inverted` | `$base-black-soft` | `$base-white-blue`

### Translucently Layered Colors

> Use these colors to add distinctive areas onto another elements.

**Variables**

Name | Description
--|--
`$t-white` | Translucent white for light mode.
`$t-black` | Translucent black for dark mode.

**Mixins**

Mixin | Light Mode | Dark Mode
--|--|--
`@mixin overlay` | `$t-white` | `$t-black`
`@mixin overlay-inverted` | `$t-black` | `$t-white`

### Text Colors

**Variables**

Name | Description
--|--
`$base-black` | Softly dimmed black color for texts.
`$base-white` | Softly dimmed white color for texts.
`$base-gray` | Gray color that looks great on both light mode and dark mode.

**Mixins**

Mixin | Light Mode | Dark Mode
--|--|--
`@mixin text-color` | `$base-black` | `$base-white`
`@mixin text-color-inverted` | `$base-white` | `$base-black`

## Borders

Mixin | Description
--|--
`@mixin separator` | Include this after defining a minimum requirements.

**Examples**
```scss
.elm {
  border-bottom: solid; // you can set minimum
  @include separator; // it will override border width and color
}
```