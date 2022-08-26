import { useMemo } from 'react';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import defaultChain from '../chains';

export default function useJsonProvider() {
  return useMemo(() => new StaticJsonRpcProvider(defaultChain.rpcUrls[0]), []);
}
