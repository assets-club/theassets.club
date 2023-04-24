import merge from 'lodash/merge';
import MarkerFelt from '@/app/fonts/MarkerFelt';
import SuisseIntl from '@/app/fonts/SuisseIntl';
import { extendTheme, Theme, ThemeOverride } from '@chakra-ui/react';

const theme = extendTheme((original: Theme) => {
  return merge(original, {
    fonts: {
      heading: `${SuisseIntl.style.fontFamily}, sans-serif`,
      body: `${SuisseIntl.style.fontFamily}, sans-serif`,
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
          color: '#000000',
          fontFamily: `${MarkerFelt.style.fontFamily}, sans-serif`,
        },
      },
    },
  } as ThemeOverride);
}) as Theme;

export default theme;
