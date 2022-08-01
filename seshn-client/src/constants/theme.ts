import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#e6f5fe',
      100: '#cbeafc',
      200: '#afe0fb',
      300: '#90d6f9',
      400: '#6cccf8',
      500: '#36c2f6',
      600: '#00a1d3',
      700: '#0081b1',
      800: '#006290',
      900: '#004571',
      1000: '#002a52',
    },
    bgLight: '#e7e5e4', // light.200
    bgDark: '#3f3f46', // dark.200
  },
  config: {
    useSystemColorMode: true,
  },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
