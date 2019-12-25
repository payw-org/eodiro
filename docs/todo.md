# ToDo

It includes new features to be added, bug fixes, source code refactoring and anything related to performance issue.

## General

- [ ] Add **Terms of Use** section and agreeing process
- [ ] Set default color scheme to 'auto'

## Banner

### Performance

- [ ] Select current hamlet in logic, not in view

### Design

- [ ] Unpaint the part above bottom navigation to prevent flashing on iOS devices due to the translucency

## My Page

- [ ] Better UI
- [ ] Reissue password
- [ ] Withdraw a membership

## Pepero Square (Tentative Title)

### Chore

- [ ] Display 'need to sign in' component instead of `require-auth` mixin, popup and redirection

### Bug Fixes

- [x] Indicate non-existing post
- [x] Infinite comments refreshing

### Features

- [x] Show the number of comments of each post
- [ ] Upload images or files
- [ ] Categories
- [ ] Comments of a comment
- [ ] 🔍 Search

### Design

- [x] Specify font size of post item's information

## Auth

> Related to [eodiro API 2](https://github.com/paywteam/eodiro-api2)

- Validation APIs should send 2xx status code with the result of validation
  - Currently the APIs respond with 4xx when the validations have been failed
  - [x] `isSignedIn`
  - [ ] Sign up validation

## Modules

### eodiro Dialog

- [ ] Focus keyboard action
