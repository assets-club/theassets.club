import merge from 'lodash/merge';
import SuisseIntl from '@/app/fonts/SuisseIntl';
import { extendTheme, Theme, ThemeOverride } from '@chakra-ui/react';

const theme = extendTheme((original: Theme) => {
  return merge(original, {
    fonts: {
      heading: `${SuisseIntl.variable}, sans-serif`,
      body: `${SuisseIntl.variable}, sans-serif`,
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
        defaultProps: {
          colorScheme: 'gray',
        },
        baseStyle: {
          fontFamily: 'Marker Felt, sans-serif',
        },
      },
    },
  } as ThemeOverride);
}) as Theme;

export default theme;
