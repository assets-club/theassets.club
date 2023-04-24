import localFont from 'next/font/local';

const SuisseWorks = localFont({
  src: [
    {
      path: './SuisseWorks-regular.woff2',
      weight: '400',
    },
    {
      path: './SuisseWorks-bold.woff2',
      weight: '700',
    },
  ],
});

export default SuisseWorks;
