import { useMemo } from 'react';
import { TheAssetsClub__factory } from '@assets-club/smart-contracts';
import { useWeb3React } from '@web3-react/core';
import { TAC_GOERLI } from '../contracts';
import useJsonProvider from './useJsonProvider';

export default function useTAC() {
  const json = useJsonProvider();
  const { isActive, provider } = useWeb3React();
  const theProvider = isActive && provider ? provider.getSigner() : json;

  return useMemo(() => {
    return TheAssetsClub__factory.connect(TAC_GOERLI, theProvider);
  }, [theProvider]);
}
