import { useAccount, useContractRead } from 'wagmi';
import { useMemo } from 'react';
import useNFTParisToken from '@/web3/hooks/useNFTParis';
import TheAssetsClub, { SALE_PRICE, Tier } from '../contracts/TheAssetsClub';

function getPrice(quantity: number, free: number, minted: number) {
  const actualFree = Math.max(free - minted, 0);
  return SALE_PRICE.mul(quantity - actualFree);
}

export default function usePrice(tier: Tier | undefined, slider: number | undefined) {
  const { address } = useAccount();
  const paris = useNFTParisToken();

  const { data: minted, ...rest } = useContractRead({
    enabled: typeof address === 'string',
    ...TheAssetsClub,
    functionName: 'minted',
    args: address ? [address] : undefined,
    select: (data) => data.toNumber(),
  });

  const quantity = useMemo(() => {
    if (typeof slider !== 'number' || typeof minted !== 'number') {
      return;
    }

    return slider - minted;
  }, [minted, slider]);

  const free = useMemo(() => {
    if (paris.proof) {
      return 2;
    }

    switch (tier) {
      case Tier.OG:
        return 3;
      case Tier.ACCESS_LIST:
        return 2;
      case Tier.PUBLIC:
        return 0;
    }
  }, [paris.proof, tier]);

  const price = useMemo(() => {
    if (typeof quantity !== 'number' || typeof free !== 'number' || typeof minted !== 'number') {
      return undefined;
    }

    return getPrice(quantity, free, minted);
  }, [quantity, free, minted]);

  return { quantity, minted, price, free, paris, ...rest };
}
