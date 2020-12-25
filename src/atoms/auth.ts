import { AuthData } from '@/modules/jwt'
import { atom } from 'recoil'

export const authState = atom<AuthData>({
  key: 'authState',
  default: {
    userId: 0,
  },
})
