'use client';

import { WagmiConfig } from 'wagmi';
import { FC, ReactNode } from 'react';
import theme from '@/app/styles/theme';
import client from '@/web3/client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers: FC<{ children: ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};

export default Providers;
