import { configureChains, mainnet } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider, webSocketProvider } = (() => {
  const chain = process.env.NEXT_PUBLIC_CHAIN === 'sepolia' ? sepolia : mainnet;
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  if (apiKey && chain === sepolia) {
    return configureChains(
      [sepolia],
      [
        jsonRpcProvider({
          static: true,
          rpc: () => ({
            http: `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
            webSocket: `wss://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
          }),
        }),
      ],
    );
  }

  if (apiKey) {
    return configureChains([mainnet], [alchemyProvider({ apiKey })]);
  }

  return configureChains([mainnet], [publicProvider()]);
})();

export const chain = chains[0];
