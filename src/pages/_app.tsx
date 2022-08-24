import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ChakraProvider } from '@chakra-ui/react';
import StateProvider from '../lib/StateProvider';
import theme from '../styles/theme';

function TheAssetsClubApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Assets Club</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ChakraProvider theme={theme}>
        <StateProvider>
          <ParallaxProvider>
            <Component {...pageProps} />
          </ParallaxProvider>
        </StateProvider>
      </ChakraProvider>
    </>
  );
}

export default TheAssetsClubApp;
