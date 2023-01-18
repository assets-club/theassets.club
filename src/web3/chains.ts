import { configureChains } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const chain = (() => {
  if (process.env.WEB3_CHAIN === 'mumbai' || process.env.NEXT_PUBLIC_APP_ENV !== 'production') {
    return polygonMumbai;
  }

  return polygon;
})();

export const { chains, provider, webSocketProvider } = (() => {
  const providers = [publicProvider()];

  if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
    providers.unshift(alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string }));
  }

  return configureChains([chain], providers);
})();
