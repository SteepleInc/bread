import { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { Pressable, Sx, SxProp, useDripsyTheme, Text, useSx } from 'dripsy'
import { BreadThemeComponents, ColorBase } from 'Helpers/breadTheme'
import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import colorTool from 'color'

export type ButtonVariants = 'contained' | 'outlined' | 'text'

export type ButtonSize = 'small' | 'medium' | 'large'

export type ButtonBaseProps = {
  variant: ButtonVariants
  color: ColorBase
  disabled: boolean
  EndIcon: ReactNode | BreadThemeComponents['icon']['iconNames']
  StartIcon: ReactNode | BreadThemeComponents['icon']['iconNames']
  fullWidth: boolean
  size: ButtonSize
}

const buttonDefaultProps: ButtonBaseProps = {
  variant: 'contained',
  color: 'primary',
  disabled: false,
  EndIcon: undefined,
  StartIcon: undefined,
  fullWidth: false,
  size: 'medium',
}

type ButtonProps = Partial<ButtonBaseProps> & {
  sx?: SxProp
}

export const Button: FC<ButtonProps> = (props) => {
  const { theme } = useDripsyTheme()

  const { children, variant, sx, StartIcon, EndIcon, color, size } =
    useComponentProps<ButtonBaseProps, ButtonProps>({
      componentName: 'button',
      componentDefaultProps: buttonDefaultProps,
      props,
    })

  const styles = useButtonStyles({ color, variant, size })

  const RenderStartIcon = useMemo(() => {
    if (typeof StartIcon === 'string') {
      return theme.icon.renderer({
        size: 24,
        color: '$primaryColor',
        name: StartIcon,
      })
    }

    return StartIcon
  }, [StartIcon])

  const RenderEndIcon = useMemo(() => {
    if (typeof EndIcon === 'string') {
      return theme.icon.renderer({
        size: 24,
        color: '$primaryColor',
        name: EndIcon,
      })
    }

    return EndIcon
  }, [EndIcon])

  return (
    <Pressable
      sx={{
        ...(theme.button.styleOverrides[variant] as Sx),
        ...sx,
      }}
      style={styles.root}
    >
      {RenderStartIcon}

      <Text sx={styles.text}>{children}</Text>

      {RenderEndIcon}
    </Pressable>
  )
}

const buttonRootVariantStyles: Record<
  ButtonVariants,
  (
    params: PressableStateCallbackType & {
      background: string
    },
  ) => Sx
> = {
  contained: (params) => {
    const { pressed, focused, hovered, background } = params

    return {
      backgroundColor: background,
    }
  },
  outlined: (params) => {
    const { pressed, focused, hovered, background } = params

    return {
      borderColor: background,
    }
  },
  text: (params) => {
    const { pressed, focused, hovered, background } = params

    return {}
  },
}

const buttonRootSizeStyles: Record<ButtonSize, Sx> = {
  small: {},
  medium: {},
  large: {},
}

const buttonTextVariantStyles: Record<ButtonVariants, Sx> = {
  contained: {},
  outlined: {},
  text: {},
}

function useButtonStyles(params: {
  color: ColorBase
  variant: ButtonVariants
  size: ButtonSize
}): {
  root: (state: PressableStateCallbackType) => StyleProp<ViewStyle>
  text: Sx
} {
  const { color: colorBase, variant, size } = params
  const sx = useSx()

  const { background, color } = useGetColorsForType({ color: colorBase })

  return useMemo(
    () => ({
      root: (state) =>
        sx({
          ...buttonRootSizeStyles[size],
          ...buttonRootVariantStyles[variant]({ ...state, background }),
        }),
      text: {
        color,
      },
    }),
    [size, variant, background, color],
  )
}

function useComponentProps<DP extends object, CP extends {}>(params: {
  componentName: keyof BreadThemeComponents
  componentDefaultProps: DP
  props: PropsWithChildren<CP>
}) {
  const { componentName, componentDefaultProps, props } = params

  const { theme } = useDripsyTheme()

  return useMemo(
    () => ({
      ...componentDefaultProps,
      ...theme[componentName].defaultProps,
      ...props,
    }),
    [componentDefaultProps, theme, props],
  )
}

function useGetColorsForType(params: { color: ColorBase }) {
  const { color } = params
  const {
    theme: { colors },
  } = useDripsyTheme()

  return useMemo(
    () => ({
      background: colors[`$${color}Background`],
      color: colors[`$${color}Color`],
    }),
    [color, colors],
  )
}
