import localFont from 'next/font/local';

const SuisseIntl = localFont({
  src: [
    {
      path: './SuisseIntl-regular.woff2',
      weight: '400',
    },
    {
      path: './SuisseIntl-bold.woff2',
      weight: '700',
    },
  ],
  variable: '--suisse-intl',
});

export default SuisseIntl;
