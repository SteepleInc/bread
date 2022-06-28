import { makeTheme } from 'dripsy'
import { PressableStateCallbackType, TextStyle, ViewStyle } from 'react-native'
import { ButtonBaseProps, ButtonVariants } from 'Components/Button'
import { Icon, IconRenderer } from 'Components/Icon'

export type ColorBase =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'

export type BreadThemeComponents = {
  button: {
    defaultProps: Partial<ButtonBaseProps>
    styleOverrides: Readonly<{
      [Key in ButtonVariants]?: (
        params: PressableStateCallbackType & {
          background: string
        },
      ) => TextStyle | ViewStyle
    }>
  }
  icon: {
    iconNames: string
    renderer: IconRenderer
    defaultProps: Partial<ButtonBaseProps>
    styleOverrides: Readonly<{
      [Key in ButtonVariants]?: TextStyle | ViewStyle
    }>
  }
}

const componentStyles: BreadThemeComponents = {
  button: {
    defaultProps: {},
    styleOverrides: {},
  },
  icon: {
    iconNames: 'home',
    renderer: Icon,
    defaultProps: {},
    styleOverrides: {},
  },
}

export const breadTheme = makeTheme({
  colors: {
    $primaryBackground: 'blue',
    $primaryColor: 'white',
    $secondaryBackground: 'blue',
    $secondaryColor: 'white',
    $successBackground: 'blue',
    $successColor: 'white',
    $errorBackground: 'blue',
    $errorColor: 'white',
    $infoBackground: 'blue',
    $infoColor: 'white',
    $warningBackground: 'blue',
    $warningColor: 'white',
  },
  types: {
    reactNativeTypesOnly: true,
    strictVariants: true,
  },
  ...componentStyles,
})

export type BreadTheme = typeof breadTheme

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends BreadTheme {}
}
