import { useAccount } from 'wagmi';
import { FC } from 'react';
import { useConnectModal } from '@/app/providers/ConnectWalletProvider';
import { Box, BoxProps, Button, Heading, Text } from '@chakra-ui/react';

const MintEligibility: FC<BoxProps> = (props) => {
  const { onOpen } = useConnectModal();
  const { address, isConnected } = useAccount();

  return (
    <Box {...props}>
      <Heading fontSize="2xl" mb={2}>
        Check your eligibility
      </Heading>

      {!isConnected ? (
        <>
          <Text mb={2}>Connect your wallet to check your eligibility</Text>
          <Button onClick={onOpen}>Connect wallet</Button>
        </>
      ) : (
        <Text>
          Your address: <code>{address}</code>
        </Text>
      )}
    </Box>
  );
};

export default MintEligibility;
