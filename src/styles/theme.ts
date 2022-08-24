import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Arimo', sans-serif`,
    body: `'Arimo', sans-serif`,
  },
  colors: {
    primary: {
      400: '#3474ff',
    },
  },
});

export default theme;
