import { ReactNode } from 'react'
import $ from './style.module.scss'

type FloadingButtonProps = {
  children: ReactNode
}

export function FloadingButton({ children }: FloadingButtonProps) {
  return (
    <button type="button" className={$['floating-button']}>
      {children}
    </button>
  )
}
