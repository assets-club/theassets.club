import type { AppProps } from 'next/app';
import Head from 'next/head';
import { WagmiConfig } from 'wagmi';
import { ChakraProvider } from '@chakra-ui/react';
import ConnectWalletProvider from '../components/ConnectWalletProvider';
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
        <ConnectWalletProvider
          /** @see https://github.com/chakra-ui/chakra-ui/issues/6213#issuecomment-1216003840 */
          blockScrollOnMount={false}
        >
          <Component {...pageProps} />
          <Player position="fixed" bottom="5vh" left="5vh" zIndex={1000} />
        </ConnectWalletProvider>
      </ChakraProvider>
    </WagmiConfig>
  </>
);

export default TheAssetsClubApp;
