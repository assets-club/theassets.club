import type { AddEthereumChainParameter } from '@web3-react/types';

export const ETHEREUM_MAINNET: AddEthereumChainParameter = {
  chainId: 1,
  chainName: 'Ethereum Mainnet',
  rpcUrls: ['https://mainnet.infura.io/v3/'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://etherscan.io'],
};

export const GOERLI_TESTNET: AddEthereumChainParameter = {
  chainId: 5,
  chainName: 'Goerli Test Network',
  rpcUrls: ['https://goerli.infura.io/v3/'],
  nativeCurrency: {
    name: 'GoerliETH',
    symbol: 'GoerliETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://goerli.etherscan.io'],
};

/**
 * The default chain is computed from the NEXT_PUBLIC_APP_ENV environment variable.
 * It points to the Ethereum Mainnet if NEXT_PUBLIC_APP_ENV is 'production' and to the Goerli Testnet otherwise.
 */
const defaultChain = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? ETHEREUM_MAINNET : GOERLI_TESTNET;

export default defaultChain;
