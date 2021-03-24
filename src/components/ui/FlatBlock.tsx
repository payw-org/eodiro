import React from 'react'
import { Tile, TileProps } from './Tile'

/**
 * @deprecated
 */
export const FlatBlock: React.FC<TileProps> = (props) => {
  const flatBlockProps = { ...props }

  flatBlockProps.flat = true
  flatBlockProps.noArrow = true

  const { children } = props

  return <Tile {...flatBlockProps}>{children}</Tile>
}
