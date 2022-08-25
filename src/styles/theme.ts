import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Suisse Works', sans-serif`,
    body: `'Suisse Intl', sans-serif`,
  },
  colors: {
    primary: {
      400: '#3474ff',
    },
  },
});

export default theme;
