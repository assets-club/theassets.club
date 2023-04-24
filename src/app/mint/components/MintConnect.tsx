import { useConnectModal } from '@/app/providers/ConnectWalletProvider';
import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';

const MintConnect: FC = () => {
  const { onOpen } = useConnectModal();

  return (
    <Box>
      <Button onClick={onOpen}>Connect</Button>
    </Box>
  );
};

export default MintConnect;
