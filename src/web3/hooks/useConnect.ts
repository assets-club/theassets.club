import { MetaMask } from '@web3-react/metamask';
import { AddEthereumChainParameter } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import defaultChain from '../chains';
import { metaMaskConnector, walletConnectConnector } from '../connectors';

interface UseWeb3ConnectOptions {
  /** Callback when a wallet has been connected. */
  onConnected?: () => Promise<void> | void;
}

interface UseWeb3ConnectResult {
  connectMetaMask: MetaMask['activate'];
  connectWalletConnect: WalletConnect['activate'];
}

export default function useWeb3Connect({ onConnected }: UseWeb3ConnectOptions = {}): UseWeb3ConnectResult {
  return {
    connectMetaMask: async (chain: number | AddEthereumChainParameter) => {
      return metaMaskConnector.activate(chain ?? defaultChain).then(onConnected);
    },
    connectWalletConnect: async (chain) => {
      return walletConnectConnector
        .activate(chain ?? defaultChain.chainId)
        .then(onConnected)
        .catch((err) => {
          if (err.message !== 'User closed modal') {
            throw err;
          }
        });
    },
  };
}
