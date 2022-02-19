import { makeTheme } from 'dripsy'

export const theme = makeTheme({
  types: {
    reactNativeTypesOnly: true,
  },
})

type MyTheme = typeof theme

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}
