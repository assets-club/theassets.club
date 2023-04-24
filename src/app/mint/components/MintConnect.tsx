import { FC } from 'react';
import { useConnectModal } from '@/app/providers/ConnectWalletProvider';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const MintConnect: FC = () => {
  const { onOpen } = useConnectModal();

  return (
    <Box>
      <Heading fontSize="2xl" mb={2}>
        Check your eligibility
      </Heading>

      <Text mb={2}>Connect your wallet to check your eligibility</Text>
      <Button onClick={onOpen}>Connect wallet</Button>
    </Box>
  );
};

export default MintConnect;
