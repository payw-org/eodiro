import React from 'react'
import { ArrowBlock, ArrowBlockProps } from './ArrowBlock'

export const FlatBlock: React.FC<ArrowBlockProps> = (props) => {
  const flatBlockProps = { ...props }
  flatBlockProps.flat = true
  flatBlockProps.noArrow = true

  return <ArrowBlock {...flatBlockProps}>{props.children}</ArrowBlock>
}
