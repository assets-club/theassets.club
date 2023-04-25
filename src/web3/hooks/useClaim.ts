import { BigNumber } from 'ethers';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useMemo } from 'react';
import useMintStatus, { MintStatus } from '@/web3/hooks/useMintStatus';
import { TransactionReceipt } from '@ethersproject/providers';
import TheAssetsClub, { Proof } from '../contracts/TheAssetsClub';
import useTree from './useTree';

interface UseClaimOptions {
  onSuccess?: (data: TransactionReceipt) => Promise<void> | void;
}

export default function useClaim({ onSuccess }: UseClaimOptions = {}) {
  const { address } = useAccount();
  const { tree, leaves } = useTree();
  const { status } = useMintStatus();

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

  const { data: claimed } = useContractRead({
    enabled: !!address,
    ...TheAssetsClub,
    functionName: 'claimed',
    args: address ? [address] : undefined,
  });

  const args = useMemo(() => {
    if (!address || quantity === 0 || !proof || claimed === true) {
      return;
    }

    return [address, BigNumber.from(quantity), proof] as const;
  }, [address, claimed, proof, quantity]);

  const { config } = usePrepareContractWrite({
    enabled: !!args,
    ...TheAssetsClub,
    functionName: 'claimTo',
    args,
  });
  const { data: writeData, writeAsync: write, isLoading: isWriting } = useContractWrite(config);
  const { isLoading: isWaiting } = useWaitForTransaction({ hash: writeData?.hash, onSuccess });

  const available = useMemo(() => {
    switch (status) {
      case MintStatus.PRIVATE_SALE:
      case MintStatus.PUBLIC_SALE:
        return true;
    }

    return false;
  }, [status]);

  return {
    available,
    claim: write,
    claimed,
    claimable: quantity,
    proof,
    isLoading: isWriting || isWaiting,
    isWriting,
    isWaiting,
  };
}
