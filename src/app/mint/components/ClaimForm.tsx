import { TransactionReceipt } from 'alchemy-sdk';
import { FC, useMemo } from 'react';
import MintBox from '@/app/mint/components/MintBox';
import useClaim from '@/web3/hooks/useClaim';
import { Button, Text } from '@chakra-ui/react';

interface ClaimFormProps {
  onSuccess?: (data: TransactionReceipt) => Promise<void> | void;
}

const ClaimForm: FC<ClaimFormProps> = ({ onSuccess }) => {
  const { claimable, claimed, claim, isLoading, available } = useClaim({ onSuccess });

  const title = useMemo(() => {
    let title = 'Contributor';

    if (claimed && claimable) {
      title += ` (${claimable} claimed)`;
    }

    return title;
  }, [claimable, claimed]);

  if (!claimable) {
    return null;
  }

  return (
    <MintBox title={title} defaultOpen={!claimed}>
      <Text mb={2}>
        You were recognized as an active contributor of the project. To thank you, will be able to claim {claimable} for
        free!
      </Text>

      {available && (
        <>
          {!claimed ? (
            <Button isLoading={isLoading} onClick={claim}>
              Claim {claimable}
            </Button>
          ) : (
            <Button isDisabled={claimed}>Claimed</Button>
          )}
        </>
      )}
    </MintBox>
  );
};

export default ClaimForm;
