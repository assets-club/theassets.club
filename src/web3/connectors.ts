import type { Web3ReactHooks } from '@web3-react/core';
import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import defaultChain from './chains';

/**
 * web3-react connectors available into the application.
 * We currently support:
 * - MetaMask via {@see MetaMask}
 * - WalletConnect via {@see WalletConnect}
 */

export const [metaMaskConnector, metaMaskHooks] = initializeConnector<MetaMask>((actions) => {
  return new MetaMask({ actions });
});

export const [walletConnectConnector, walletConnectHooks] = initializeConnector<WalletConnect>((actions) => {
  return new WalletConnect({
    actions,
    options: {
      rpc: defaultChain.rpcUrls[0],
    },
  });
});

const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metaMaskConnector, metaMaskHooks],
  [walletConnectConnector, walletConnectHooks],
];

export default connectors;
