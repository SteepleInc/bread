import { SxProp } from 'dripsy'
import { FC } from 'react'
import { BreadThemeComponents } from 'Helpers/breadTheme'

type IconBaseProps = {
  size: number
  color: string
}

type IconParams = {
  size: number
  color: string
  sx?: SxProp
  name: BreadThemeComponents['icon']['iconNames']
}

export type IconRenderer = FC<IconParams>

export const Icon: IconRenderer = () => null
