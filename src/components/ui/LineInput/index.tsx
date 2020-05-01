import './style.scss'

import React, { useState } from 'react'

import EodiroColors from '@/modules/styles/EodiroColors'
import { Magnifier } from '@/components/global/icons'
import mergeClassNames from '@/modules/merge-class-name'

export type LineInputOnChangeHook = (inputValue: string) => void

type LineInputProps = {
  value?: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
  className?: string
  type?: 'text' | 'search' | 'email' | 'password'
  placeholder?: string
  onChangeHook?: LineInputOnChangeHook
  onChangeThrottle?: [LineInputOnChangeHook, number?]
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onEnter?: () => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  autoComplete?: string
  alignCenter?: boolean
}

const IconField = React.memo(() => {
  return (
    <div className="magnifier-icon-wrapper">
      <Magnifier className="icon" fill={EodiroColors.primary} size={'2rem'} />
    </div>
  )
})

export const LineInput = React.memo(
  React.forwardRef<HTMLInputElement, LineInputProps>(
    (
      {
        value,
        setValue = (): void => {},
        className,
        type = 'text',
        placeholder,
        onChangeHook = (): void => {},
        onChangeThrottle,
        onKeyDown,
        onKeyPress,
        onKeyUp,
        onEnter,
        onFocus,
        disabled = false,
        autoComplete,
        alignCenter,
      },
      ref
    ) => {
      const [throttleTimeout, setThrottleTimeout] = useState<number>(null)

      return (
        <div className={mergeClassNames('eodiro-line-input', className)}>
          <input
            ref={ref}
            value={value}
            disabled={disabled}
            type={type === 'search' ? 'text' : type}
            spellCheck="false"
            placeholder={placeholder}
            className={mergeClassNames(
              'li-field',
              type === 'search' && 'search',
              alignCenter && 'center'
            )}
            onChange={(e): void => {
              e.persist()
              const value = e.target.value
              setValue(value)
              onChangeHook(value)

              // No Hangul in password field
              if (type === 'password') {
                if (value.match(/[ㄱ-힣]/)) {
                  alert('암호에 한글을 사용할 수 없습니다.')
                  setValue('')
                }
              }

              if (!onChangeThrottle) return
              const [
                throttleHook = (): void => {},
                throttle = 300,
              ] = onChangeThrottle
              if (throttleTimeout) {
                window.clearTimeout(throttleTimeout)
              }
              setThrottleTimeout(
                window.setTimeout(() => {
                  throttleHook(value)
                }, throttle)
              )
            }}
            onKeyDown={(e): void => {
              if (onKeyDown) {
                onKeyDown(e)
              }

              if (onEnter && e.key === 'Enter') {
                onEnter()
              }
            }}
            onKeyPress={onKeyPress}
            onKeyUp={onKeyUp}
            onFocus={onFocus}
            autoComplete={autoComplete}
          />
          {type === 'search' && <IconField />}
        </div>
      )
    }
  ),
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value
  }
)
