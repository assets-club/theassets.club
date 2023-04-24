import { LedgerConnector } from 'wagmi/connectors/ledger';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { chains } from './chains';

export const metamaskConnector = new MetaMaskConnector();
export const walletConnectConnector = new WalletConnectLegacyConnector({
  chains,
  options: {
    qrcode: true,
  },
});
export const ledgerConnector = new LedgerConnector({
  chains,
  options: {},
});
