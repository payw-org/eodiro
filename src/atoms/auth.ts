import { AuthData } from '@/modules/jwt'
import { atom, useRecoilValue } from 'recoil'

export const authState = atom<AuthData>({
  key: 'authState',
  default: {
    userId: 0,
  },
})

export function useUserId() {
  const { userId } = useRecoilValue(authState)

  return userId
}
