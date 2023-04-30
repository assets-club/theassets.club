import { useAccount } from 'wagmi';
import { FC } from 'react';
import { useConnectModal } from '@/app/providers/ConnectWalletProvider';
import useMounted from '@/lib/hooks/useMounted';
import useMintStatus, { MintStatus } from '@/web3/hooks/useMintStatus';
import { Box, BoxProps, Button, Heading, Text } from '@chakra-ui/react';

const MintEligibility: FC<BoxProps> = (props) => {
  const mounted = useMounted();
  const { onOpen } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { status } = useMintStatus();

  if (status === MintStatus.ENDED) {
    return null;
  }

  return (
    <Box {...props}>
      <Heading fontSize="2xl" mb={2}>
        Check your eligibility
      </Heading>

      {!mounted || !isConnected ? (
        <>
          <Text mb={2}>Connect your wallet to check your eligibility</Text>
          <Button onClick={onOpen}>Connect wallet</Button>
        </>
      ) : (
        <Text>
          Your address: <code>{mounted && address}</code>
        </Text>
      )}
    </Box>
  );
};

export default MintEligibility;
