import type { AppProps } from 'next/app';
import Head from 'next/head';
import { WagmiConfig } from 'wagmi';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Player from '../app/components/Player';
import ConnectWalletProvider from '../app/providers/ConnectWalletProvider';
import '../app/styles/fonts.css';
import '../app/styles/global.css';
import theme from '../app/styles/theme';
import client from '../web3/client';

const queryClient = new QueryClient();

const TheAssetsClubApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>The Assets Club</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ConnectWalletProvider
            /** @see https://github.com/chakra-ui/chakra-ui/issues/6213#issuecomment-1216003840 */
            blockScrollOnMount={false}
          >
            <Component {...pageProps} />
            <Player position="fixed" bottom="5vh" left="5vh" zIndex={1000} />
          </ConnectWalletProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiConfig>
  </>
);

export default TheAssetsClubApp;
