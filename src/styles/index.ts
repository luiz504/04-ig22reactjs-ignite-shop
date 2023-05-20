import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#FFFFFF',

      gray100: '#E1E1E6',
      gray300: '#C4C4CC',
      gray400: '#8D8D99',
      gray800: '#202024',
      gray900: '#121214',

      green300: '#00B37E',
      green500: '#00875F',
    },
    fontSizes: {
      sm: '0.875rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
} as const)
