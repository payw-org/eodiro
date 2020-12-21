import React from 'react'
import { ArrowBlock, ArrowBlockProps } from './ArrowBlock'

export const FlatBlock: React.FC<ArrowBlockProps> = (props) => {
  const flatBlockProps = { ...props }

  flatBlockProps.flat = true
  flatBlockProps.noArrow = true

  const { children } = props

  return <ArrowBlock {...flatBlockProps}>{children}</ArrowBlock>
}
