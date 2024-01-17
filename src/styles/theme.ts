import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    palette: {
      purple: '#A34FD8',
      purpleDark: '#7F31B0',
      blue: '#071673',
      lightBlue: '#AC9AFE',
      yellow: '#FBF65F',
      melonIce: '#F5D9C9',
      orange: '#ED893E',
      light: {
        purple: '#AD63DC',
        blue: '#5C72F5',
      }
    },
    gray: {
      950: '#09090A',
      900: '#121214',
      800: '#202024',
      600: '#323238',
      300: '#8D8D99',
      200: '#C4C4CC'
    },
    dark: {
      200: '#303745',
      300: '#262b36'
    },
    green: {
      500: '#047C3F'
    },
    yellow: {
      500: '#F7DD43',
      600: '#BBA317'
    },
    red: {
      500: '#DB4437'
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'OpenSans_700Bold',
    body: 'OpenSans_400Regular',
    medium: 'OpenSans_500Medium'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24
  },
  sizes: {
    14: 56,
    22: 87
  }
})
