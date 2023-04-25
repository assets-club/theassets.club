import { createClient } from 'wagmi';
import { provider, webSocketProvider } from './chains';
import { ledgerConnector, metamaskConnector, walletConnectConnector } from './connectors';

const client = createClient({
  // @ts-expect-error Sepolia network does seem to be supported
  provider,
  // @ts-expect-error Sepolia network does seem to be supported
  webSocketProvider,
  autoConnect: true,
  connectors: [metamaskConnector, walletConnectConnector, ledgerConnector],
});

export default client;
