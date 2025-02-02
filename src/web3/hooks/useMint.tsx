import { BigNumber, constants } from 'ethers';
import { Address, useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useMemo, useRef } from 'react';
import { chain } from '@/web3/chains';
import { Link } from '@chakra-ui/next-js';
import { ToastId, useToast } from '@chakra-ui/react';
import { TransactionReceipt } from '@ethersproject/providers';
import TheAssetsClub, { Phase, Proof, Tier } from '../contracts/TheAssetsClub';
import useMintStatus from './useMintStatus';
import usePrice from './usePrice';
import useTree, { Leaf } from './useTree';

interface UseMintOptions {
  slider?: number;
  onSuccess?: (data: TransactionReceipt) => Promise<void> | void;
}

export default function useMint({ slider, onSuccess }: UseMintOptions) {
  const toastRef = useRef<ToastId>();
  const toast = useToast({
    position: 'top-right',
    isClosable: true,
  });

  const { address } = useAccount();
  const { phase } = useMintStatus();
  const { tree, leaves } = useTree();

  const tier = useMemo(() => {
    return leaves?.reduce((max: Tier, leaf: Leaf) => {
      if (leaf[1] !== Proof.MINT) {
        return max;
      }

      return Math.max(leaf[2], max);
    }, Tier.PUBLIC);
  }, [leaves]);

  const { price, quantity, minted, isLoading: isPricing, free, paris } = usePrice(tier, slider);

  const args: readonly [Address, BigNumber, number, `0x${string}`[]] | undefined = useMemo(() => {
    if (!address || !quantity || typeof tier !== 'number') {
      return;
    }

    if (paris.proof && (paris.used === constants.AddressZero || paris.used === address)) {
      return [address, BigNumber.from(quantity), Tier.ACCESS_LIST, paris.proof];
    }

    let proof: `0x${string}`[] | undefined;

    if (tier > Tier.PUBLIC) {
      try {
        proof = tree?.getProof([address, Proof.MINT, tier]) as `0x${string}`[];
      } catch {}

      if (!proof) {
        return;
      }
    }

    switch (phase) {
      case Phase.PRIVATE_SALE:
        if (tier > Tier.PUBLIC && proof) {
          return [address, BigNumber.from(quantity), tier, proof];
        }
        break;
      case Phase.PUBLIC_SALE:
        if (tier === Tier.PUBLIC) {
          return [address, BigNumber.from(quantity), tier, []];
        } else if (proof) {
          return [address, BigNumber.from(quantity), tier, proof];
        }
        break;
    }
  }, [address, quantity, tier, paris, phase, tree]);

  const { config } = usePrepareContractWrite({
    enabled: typeof args !== 'undefined' && BigNumber.isBigNumber(price),
    ...TheAssetsClub,
    functionName: 'mintTo',
    args,
    overrides: {
      value: price,
    },
  });
  const { data: writeData, writeAsync: write, isLoading: isWriting, error } = useContractWrite(config);
  const { isLoading: isWaiting } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (receipt) => {
      toastRef.current = toast({
        title: 'Transaction sent',
        description: (
          <Link href={`${chain.blockExplorers.default.url}/tx/${receipt.transactionHash}`} target="_blank">
            See on Etherscan
          </Link>
        ),
        status: 'success',
      });

      return onSuccess?.(receipt);
    },
  });

  return {
    mint: write,
    tier,
    free,
    quantity,
    minted,
    price,
    paris,
    isLoading: isPricing || isWriting || isWaiting,
    isWriting,
    isWaiting,
  };
}
