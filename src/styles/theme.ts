import merge from 'lodash/merge';
import { extendTheme, Theme, ThemeOverride } from '@chakra-ui/react';

const theme = extendTheme((original: Theme) => {
  return merge(original, {
    fonts: {
      heading: `'Suisse Intl', sans-serif`,
      body: `'Suisse Intl', sans-serif`,
    },
    colors: {
      primary: {
        400: '#3474ff',
      },
      gray2: {
        400: '#4d5251',
      },
      player: {
        200: '#ff4060',
        500: '#ff6080',
      },
    },
    components: {
      Button: {
        variants: {
          nav: {
            color: '#000000',
            bgColor: '#ffffff',
            fontFamily: 'Marker Felt, sans-serif',
            _hover: {
              color: '#ffffff',
              bgColor: '#000000',
            },
          },
        },
      },
    },
  } as ThemeOverride);
}) as Theme;

export default theme;
