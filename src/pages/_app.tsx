import type { AppProps } from 'next/app';
import Head from 'next/head';
import { WagmiConfig } from 'wagmi';
import { ChakraProvider } from '@chakra-ui/react';
import Player from '../components/Player';
import '../styles/fonts.css';
import theme from '../styles/theme';
import client from '../web3/client';

const TheAssetsClubApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>The Assets Club</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <WagmiConfig client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />

        <Player position="fixed" bottom="5vh" left="5vh" zIndex={1000} />
      </ChakraProvider>
    </WagmiConfig>
  </>
);

export default TheAssetsClubApp;
