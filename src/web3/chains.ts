import { configureChains, mainnet } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

export const chain = (() => {
  if (process.env.WEB3_CHAIN === 'mumbai' || process.env.NEXT_PUBLIC_APP_ENV !== 'production') {
    return sepolia;
  }

  return mainnet;
})();

const defaultProvider = (() => {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  if (apiKey && chain === sepolia) {
    return jsonRpcProvider({
      static: true,
      rpc: () => ({
        http: `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
        webSocket: `wss://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
      }),
    });
  }

  if (apiKey) {
    return alchemyProvider({ apiKey });
  }

  return publicProvider();
})();

export const { chains, provider, webSocketProvider } = configureChains([chain], [defaultProvider]);
