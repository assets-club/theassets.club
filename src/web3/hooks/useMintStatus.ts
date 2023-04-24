import { useContractReads } from 'wagmi';
import { z } from 'zod';
import { useMemo } from 'react';
import TheAssetsClub, {
  PRIVATE_SALE_DURATION,
  PUBLIC_SALE_DURATION,
  Phase,
  START_DATE,
} from '../contracts/TheAssetsClub';

export enum MintStatus {
  CLOSED,
  PUBLIC_SALE,
  PRIVATE_SALE,
  ENDED,
  SOLD_OUT,
}

const phaseSchema = z.nativeEnum(Phase);

export default function useMintStatus() {
  const { data, isLoading, ...rest } = useContractReads({
    contracts: [
      {
        ...TheAssetsClub,
        functionName: 'phase',
      },
      {
        ...TheAssetsClub,
        functionName: 'remaining',
      },
    ],
    select: (data) => {
      return [phaseSchema.parse(data[0]), data[1].toNumber()];
    },
  });

  const phase = data?.[0];
  const remaining = data?.[1];
  const nowUnix = Math.floor(Date.now() / 1000);

  const status = useMemo(() => {
    if (!data) return;

    if (remaining === 0) {
      return MintStatus.SOLD_OUT;
    }

    switch (phase) {
      case Phase.CLOSED: {
        if (nowUnix > START_DATE + PUBLIC_SALE_DURATION + PRIVATE_SALE_DURATION) {
          return MintStatus.ENDED;
        }

        return MintStatus.CLOSED;
      }

      case Phase.PRIVATE_SALE:
        return MintStatus.PRIVATE_SALE;

      case Phase.PUBLIC_SALE:
        return MintStatus.PUBLIC_SALE;
    }
  }, [data, nowUnix, phase, remaining]);

  return { status, phase, remaining, isLoading };
}
