import { ReactNode } from 'react'
import $ from './style.module.scss'

type FloatingButtonProps = {
  children: ReactNode
}

export function FloatingButton({ children }: FloatingButtonProps) {
  return (
    <button type="button" className={$['floating-button']}>
      {children}
    </button>
  )
}
