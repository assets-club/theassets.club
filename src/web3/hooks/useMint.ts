import { BigNumber } from 'ethers';
import { Address, useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useMemo } from 'react';
import { TransactionReceipt } from '@ethersproject/providers';
import TheAssetsClub, { Phase, Proof, Tier } from '../contracts/TheAssetsClub';
import useMintStatus from './useMintStatus';
import usePrice from './usePrice';
import useTree, { Leaf } from './useTree';

interface UseMintOptions {
  quantity?: number;
  onSuccess?: (data: TransactionReceipt) => Promise<void> | void;
}

export default function useMint({ quantity, onSuccess }: UseMintOptions) {
  const { address } = useAccount();
  const { phase } = useMintStatus();
  const { tree, leaves } = useTree();

  const tier = useMemo(() => {
    return (
      leaves?.reduce((max: Tier, leaf: Leaf) => {
        if (leaf[1] !== Proof.MINT) {
          return max;
        }

        return Math.max(leaf[2], max);
      }, Tier.PUBLIC) ?? Tier.PUBLIC
    );
  }, [leaves]);

  const proof = useMemo(() => {
    if (!address || !tier) {
      return undefined;
    }

    return tree?.getProof([address, Proof.MINT, tier]) as `0x${string}`[];
  }, [address, tier, tree]);

  const args: readonly [Address, BigNumber, number, `0x${string}`[]] | undefined = useMemo(() => {
    if (!address || !quantity) {
      return;
    }

    switch (phase) {
      case Phase.PRIVATE_SALE:
        if (tier > Tier.PUBLIC && proof) {
          return [address, BigNumber.from(quantity), tier, proof];
        }
        break;
      case Phase.PRIVATE_SALE:
        if (tier === Tier.PUBLIC) {
          return [address, BigNumber.from(quantity), tier, []];
        } else if (proof) {
          return [address, BigNumber.from(quantity), tier, proof];
        }
        break;
    }
  }, [address, phase, proof, quantity, tier]);

  const { data: price, isLoading: isPricing } = usePrice(tier, quantity);

  const { config } = usePrepareContractWrite({
    enabled: typeof args !== 'undefined' && BigNumber.isBigNumber(price),
    ...TheAssetsClub,
    functionName: 'mintTo',
    args,
    overrides: {
      value: price,
    },
  });
  const { data: writeData, writeAsync: write, isLoading: isWriting } = useContractWrite(config);
  const { isLoading: isWaiting } = useWaitForTransaction({ hash: writeData?.hash, onSuccess });

  return {
    mint: write,
    tier,
    proof,
    price,
    isLoading: isPricing || isWriting || isWaiting,
    isWriting,
    isWaiting,
  };
}
