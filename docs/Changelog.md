# Changelog

## v2.1.0 Beta 22

### Chore

- Add hamlet icons and transition to the New Banner

---

## v2.1.0 Beta 21

### Chore

- Set `min-height` of the App

---

## v2.1.0 Beta 20

### Bug Fixes

- Resolve wrong background color in the adaptive color scheme mode

---

## v2.1.0 Beta 19

### Bug Fixes

- Use padding instead of margin under the banner

### Chore

- Remove headers from 'sign in', 'sign up', 'forgot' pages
- Replace `nuxt-link` with `EodiroLink` in Pepero Square 'sign in' requirement
- Make the page transition twice as faster

---

## v2.1.0 Beta 18

### Highlights

- Introducing all new design including Banner and page transition
- Completely kill the flickering issue of the Banner component

### Bug Fixes

- Prevent zooming select element on iOS Safari

---

## v2.1.0 Beta 17

### Refactor

- Improve the stability of navigation including Go Back and Jump

### Bug Fixes

- Fix an issue where the lanuage changes unexpectedly when navigate to a post through my page - #260

---

## v2.1.0 Beta 16

### Features

- Show contributors in the opensource page
- Now can select coverage options for searching lectures
- Add a new `extraSmall` proportion props option to Grid layout comoponent
- Create a new string utils module and `camelToKebab` function
- New 'Jump Back' navigation alongside the 'Go Back'
- No more duplicate `asyncData` process when navigate to cached pages
  - Create and use a new `isCached` module
- Show the posts I wrote in my page and also you can navigate to the post page directly by clicking it

### Performance

- Make square posts and comments load much faster

### Chore

- Improve the stability of topbar progress
- Now the GoBack button disappears when scroll over 100px distance, not immediately after scroll down

---

## v2.1.0 Beta 15

### Features

- New lecture search using the eodiro API 2

### Bug Fixes

- Now can set the language properly - #259

### Dev

- Create scripts for purely automated deployment

---

## v2.1.0 Beta 14

### Fix

- Fix deploy scripts

---

## v2.1.0 Beta 13

### Fix

- Add a component name to lecture page

---

## v2.1.0 Beta 12

### Features

- Use new eodiro API 2's lecture API

### Refactors

- Add trailing commas

### Bug Fixes

- Keep scroll position when reload the page - #256

### Chore

- Add a slight border around the element fills to make them more distinguishable

---

## v2.1.0 Beta 11

### Bug Fixes

- Resolve the problem where pepero square loads all the posts at first load - #252

### Improvements

- Autofocus sign in input - #254

### Chore

- Update year - #253

---

## v2.1.0 Beta 10

### Bug Fixes

- Now send refresh token to API2 and refresh the access token and refresh token itself correctly - #250

### Performance

- Improve go back speed from post to pepero square page
- Remove transforming page transition due to a Safari bug - #249

---

## v2.1.0 Beta 9

### Performance

- Use only two components to transition between previous and next routes instead of utilizing redundant `v-if`s for every hamlet

### Bug Fixes

- Mitigate some flickering problems inside the Banner - #205
- Resolve #245
- Resolve #246

### Chore

- Improve my page design and layouts
- Show the currently deployed version number in home
- Enhance page transition

---

## v2.1.0 Beta 8

### Bug Fixes

- Fix broken post item layout - #228
- Fix infinite comments fetching - #237
- Conceal the post data when access without authentication - #243

### Features

- Display the number of comments

### Chore

- Faster page transition
- No more auto-redirection to the Sign In page when a page requires the authentication

---

Check out [release notes](https://github.com/paywteam/eodiro/releases) for the previous updates.
