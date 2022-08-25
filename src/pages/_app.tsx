import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import StateProvider from '../lib/StateProvider';
import '../styles/fonts.css';
import theme from '../styles/theme';
import connectors from '../web3/connectors';

function TheAssetsClubApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Assets Club</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Web3ReactProvider connectors={connectors}>
        <ChakraProvider theme={theme}>
          <StateProvider>
            <ParallaxProvider>
              <Component {...pageProps} />
            </ParallaxProvider>
          </StateProvider>
        </ChakraProvider>
      </Web3ReactProvider>
    </>
  );
}

export default TheAssetsClubApp;
