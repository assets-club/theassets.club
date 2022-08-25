import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import StateProvider from '../lib/StateProvider';
import '../styles/fonts.css';
import theme from '../styles/theme';
import connectors from '../web3/connectors';

const TheAssetsClubApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>The Assets Club</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <Web3ReactProvider connectors={connectors}>
      <ChakraProvider theme={theme}>
        <StateProvider>
          <Component {...pageProps} />
        </StateProvider>
      </ChakraProvider>
    </Web3ReactProvider>
  </>
);

export default TheAssetsClubApp;
