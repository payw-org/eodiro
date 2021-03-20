import { atom } from 'recoil'

export const authState = atom<{
  isLoggedIn: boolean | undefined
}>({
  key: 'authState',
  default: {
    isLoggedIn: undefined,
  },
})
