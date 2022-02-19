import { FC } from 'react'
import { Pressable } from 'dripsy'

export const Button: FC = (props) => {
  const { children } = props

  return <Pressable>{children}</Pressable>
}
