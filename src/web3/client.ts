import { createClient } from 'wagmi';
import { provider, webSocketProvider } from './chains';
import { metamaskConnector, walletConnectConnector } from './connectors';

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: false,
  connectors: [metamaskConnector, walletConnectConnector],
});

export default client;
