// Atoms from global navigation

import { atom } from 'recoil'

export const navHiddenState = atom({
  key: 'navHiddenState',
  default: true,
})

export const navScrolledState = atom({
  key: 'navScrolledState',
  default: false,
})

export const navTitleState = atom({
  key: 'navTitleState',
  default: '',
})
