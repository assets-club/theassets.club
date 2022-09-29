import Image from 'next/image';
import type { FC } from 'react';
import type { ModalProps } from '@chakra-ui/react';
import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import metamaskLogo from '../../public/images/metamask.svg';
import walletConnectLogo from '../../public/images/wallet-connect.svg';
import useWeb3Connect from '../web3/hooks/useConnect';

interface ConnectModalProps extends Omit<ModalProps, 'children'> {}

const ConnectModal: FC<ConnectModalProps> = ({ isOpen, onClose, ...props }) => {
  const { connectMetaMask, connectWalletConnect } = useWeb3Connect({
    onConnected: onClose,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Connect your wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="1fr" gap={4} mb={4}>
            <Button
              height="auto"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              py={2}
              onClick={() => connectMetaMask()}
            >
              <Image src={metamaskLogo} width="50px" height="50px" alt="MetaMask logo" />
              <Text>MetaMask</Text>
            </Button>

            <Button
              height="auto"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              py={2}
              onClick={() => connectWalletConnect()}
            >
              <Image src={walletConnectLogo} width="50px" height="50px" alt="WalletConnect logo" />
              <Text>WalletConnect</Text>
            </Button>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;