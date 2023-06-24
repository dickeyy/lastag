import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
  styles: {
    global: {
      body: {
        bg: '#1f2833',
        color: 'white',
      },
    },
  },
  colors: {
    brand: {
        teal: {
            50: '#e0fefc',
            100: '#d1fefa',
            200: '#c1fdf9',
            300: '#a3fdf6',
            400: '#84fcf3',
            500: '#66fcf1',
            600: '#5be2d8',
            700: '#51c9c0',
            800: '#47b0a8',
            900: '#3d9790',
        },
        gray: {
            900: '#2e2e2e',
            800: '#333333',
            700: '#383838',
            600: '#3d3d3d',
            500: '#444444',
            400: '#5a5a5a',
            300: '#707070',
            200: '#868686',
            100: '#9d9d9d',
            50: '#b3b3b3',
        },
        light: {
          500: '#3c4d63'
        },
        dark: {
          500: '#1f2833'
        },
        black: {
          500: '#0b0c10'
        }
    }
  }
}

// 3. extend the theme
const theme = extendTheme(config)

export default theme