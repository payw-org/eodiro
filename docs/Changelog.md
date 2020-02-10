# Changelog

## v2.1.0 Beta 14

### Fix

- Fix deploy scripts

## v2.1.0 Beta 13

### Fix

- Add a component name to lecture page

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
