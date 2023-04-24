import { useContractRead } from 'wagmi';
import { z } from 'zod';
import TheAssetsClub, { Phase } from '../contracts/TheAssetsClub';

const phaseSchema = z.nativeEnum(Phase);

export default function usePhase() {
  return useContractRead({
    ...TheAssetsClub,
    functionName: 'phase',
    select: (data) => phaseSchema.parse(data),
  });
}
