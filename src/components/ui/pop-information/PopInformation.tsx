import { ReactNode } from 'react'
import { atom } from 'recoil'
import $ from './PopInformation.module.scss'

export const popInformationState = atom<
  {
    content: ReactNode
  }[]
>({
  key: 'popInformationState',
  default: [],
})

export default function PopInformation() {
  return <div className={$['hello world']} />
}
