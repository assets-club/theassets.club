'use client';

import Image from 'next/image';
import { useConnect } from 'wagmi';
import type { FC } from 'react';
import { createContext, useContext } from 'react';
import ledgerLogo from '@/public/images/ledger.svg';
import metamaskLogo from '@/public/images/metamask.svg';
import walletConnectLogo from '@/public/images/wallet-connect.svg';
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
import { ledgerConnector, metamaskConnector, walletConnectConnector } from '../../web3/connectors';

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
    onSuccess: onClose,
  });
  const { connectAsync: connectWalletConnect } = useConnect({
    connector: walletConnectConnector,
    onSuccess: onClose,
  });
  const { connectAsync: connectLedger } = useConnect({
    connector: ledgerConnector,
    onSuccess: onClose,
  });

  const connectors = [
    { connect: connectMetaMask, image: metamaskLogo, label: 'MetaMask' },
    {
      connect: () => {
        onClose();
        connectWalletConnect();
      },
      image: walletConnectLogo,
      label: 'WalletConnect',
    },
    {
      connect: () => {
        onClose();
        connectLedger();
      },
      image: ledgerLogo,
      label: 'Ledger',
    },
  ];

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
              {connectors.map(({ connect, image, label }) => (
                <Button
                  key={label}
                  height="auto"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                  py={4}
                  onClick={() => connect()}
                >
                  <Image src={image} height={50} alt={`${label} logo`} />
                  <Text>{label}</Text>
                </Button>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ConnectWalletContext.Provider>
  );
};

export default ConnectWalletProvider;
