import { useAccount, useContractRead } from 'wagmi';
import { useMemo } from 'react';
import TheAssetsClub, { SALE_PRICE, Tier } from '../contracts/TheAssetsClub';

export default function usePrice(tier: Tier | undefined, quantity: number | undefined) {
  const { address } = useAccount();

  const { data: skip, ...rest } = useContractRead({
    enabled: typeof address === 'string',
    ...TheAssetsClub,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    select: (data) => data.toNumber(),
  });

  const free = useMemo(() => {
    switch (tier) {
      case Tier.OG:
        return 3;
      case Tier.ACCESS_LIST:
        return 2;
      case Tier.PUBLIC:
        return 0;
    }
  }, [tier]);

  const price = useMemo(() => {
    if (typeof quantity === 'undefined') {
      return undefined;
    }

    if (typeof free !== 'number' || typeof skip !== 'number') {
      if (typeof quantity === 'number') {
        return SALE_PRICE.mul(quantity);
      }

      return undefined;
    }

    let actualFree = free >= skip ? free - skip : 0;
    actualFree = actualFree >= quantity ? quantity : free;

    return SALE_PRICE.mul(quantity - actualFree);
  }, [free, quantity, skip]);

  return { data: price, ...rest };
}
