import { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { Pressable, Sx, SxProp, useDripsyTheme, Text } from 'dripsy'
import { BreadThemeComponents, ColorBase } from 'Helpers/breadTheme'

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

  const { children, variant, sx, StartIcon, EndIcon, color } =
    useComponentProps<ButtonBaseProps, ButtonProps>({
      componentName: 'button',
      componentDefaultProps: buttonDefaultProps,
      props,
    })

  const {} = useGetColorsForType({ color })

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
    >
      {RenderStartIcon}

      <Text>{children}</Text>

      {RenderEndIcon}
    </Pressable>
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
