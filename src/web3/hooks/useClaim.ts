import { BigNumber } from 'ethers';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useMemo } from 'react';
import { TransactionReceipt } from '@ethersproject/providers';
import TheAssetsClub, { Proof } from '../contracts/TheAssetsClub';
import useTree from './useTree';

interface UseClaimOptions {
  onSuccess?: (data: TransactionReceipt) => Promise<void> | void;
}

export default function useClaim({ onSuccess }: UseClaimOptions) {
  const { address } = useAccount();

  const { tree, leaves } = useTree();

  const quantity = useMemo(() => {
    return (
      leaves?.reduce((claimable, leaf) => {
        if (leaf[1] !== Proof.CLAIM) {
          return claimable;
        }

        return Math.max(claimable, leaf[2]);
      }, 0) ?? 0
    );
  }, [leaves]);

  const proof = useMemo(() => {
    if (!address || quantity === 0) {
      return undefined;
    }

    return tree?.getProof([address, Proof.CLAIM, quantity]) as `0x${string}`[];
  }, [address, quantity, tree]);

  const args = useMemo(() => {
    if (!address || quantity === 0 || !proof) {
      return;
    }

    return [address, BigNumber.from(quantity), proof];
  }, [address, proof, quantity]);

  const { config } = usePrepareContractWrite({
    enabled: !!args,
    ...TheAssetsClub,
    functionName: 'claimTo',
  });
  const { data: writeData, writeAsync: write, isLoading: isWriting } = useContractWrite(config);
  const { isLoading: isWaiting } = useWaitForTransaction({ hash: writeData?.hash, onSuccess });

  return {
    claim: write,
    claimable: quantity,
    proof,
    isLoading: isWriting || isWaiting,
    isWriting,
    isWaiting,
  };
}
