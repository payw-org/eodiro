import React from 'react'
import { AppearanceComponentProps } from './appearance-component'

export interface BasicIconProps {
  className?: string
}

export type ColorIcon = React.FC<BasicIconProps>

export interface FillableIconProps
  extends BasicIconProps,
    AppearanceComponentProps {
  fill?: string
}

export type FillableIcon = React.FC<FillableIconProps>

export interface ClickableIconProps {
  onClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}

export interface FillableAndClickableIconProps
  extends FillableIconProps,
    ClickableIconProps {}

export type FillableAndClickableIcon = React.FC<FillableAndClickableIconProps>
