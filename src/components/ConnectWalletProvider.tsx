import Image from 'next/image';
import { useConnect } from 'wagmi';
import type { FC } from 'react';
import { createContext, useContext } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import metamaskLogo from '../../public/images/metamask.svg';
import walletConnectLogo from '../../public/images/wallet-connect.svg';
import { metamaskConnector, walletConnectConnector } from '../web3/connectors';

const ConnectWalletContext = createContext<Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onOpen' | 'onClose'>>({
  isOpen: false,
  onOpen: () => void 0,
  onClose: () => void 0,
});

export const useConnectModal = () => useContext(ConnectWalletContext);

interface ConnectModalProps extends Omit<ModalProps, 'isOpen' | 'onClose'> {}

const ConnectWalletProvider: FC<ConnectModalProps> = ({ children, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connectAsync: connectMetaMask } = useConnect({
    connector: metamaskConnector,
  });
  const { connectAsync: connectWalletConnect } = useConnect({
    connector: walletConnectConnector,
  });

  return (
    <ConnectWalletContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}

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
    </ConnectWalletContext.Provider>
  );
};

export default ConnectWalletProvider;
