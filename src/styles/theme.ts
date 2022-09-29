import merge from 'lodash/merge';
import { extendTheme, Theme, ThemeOverride } from '@chakra-ui/react';

const theme = extendTheme((original: Theme) => {
  return merge(original, {
    fonts: {
      heading: `'Suisse Works', sans-serif`,
      body: `'Suisse Intl', sans-serif`,
    },
    colors: {
      primary: {
        400: '#3474ff',
      },
      player: {
        200: '#ff4060',
        500: '#ff6080',
      },
    },
  } as ThemeOverride);
}) as Theme;

export default theme;
