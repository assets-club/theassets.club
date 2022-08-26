import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Logger } from '@ethersproject/logger';
import { useWeb3React } from '@web3-react/core';
import ucfirst from '../../utils/ucfirst';
import { isEthersError } from '../EthersError';
import useTAC from './useTAC';

interface UseMintOptions {
  confirmations?: number;
  onError?: (err: unknown) => void;
}

export default function useMint({ confirmations = 3, onError }: UseMintOptions = {}) {
  const [loading, setLoading] = useState(false);
  const toast = useToast({ position: 'bottom-left' });
  const { isActive } = useWeb3React();
  const tac = useTAC();

  return {
    mint: async () => {
      if (!isActive) {
        toast({ status: 'error', title: 'Please connect your wallet' });
        return;
      }

      setLoading(true);

      try {
        await toast.promise(
          tac.mint().then((tx) => tx.wait(confirmations)),
          {
            loading: {
              description: 'Minting in progress',
            },
            success: {
              description: 'Mint succeeded!',
            },
            error: (err) => {
              let message = 'Mint failed!';

              if (isEthersError(err)) {
                message = err.reason.replace('execution reverted: TheAssetsClub:', '').trim();
              }

              return {
                description: ucfirst(message),
              };
            },
          },
        );
      } catch (err) {
        if (onError) {
          onError(err);
        } else {
          throw err;
        }
      } finally {
        setLoading(false);
      }
    },
    loading,
  };
}
