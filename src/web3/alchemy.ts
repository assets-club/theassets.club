import { Alchemy, Network } from 'alchemy-sdk';
import { sepolia } from 'wagmi';
import { chain } from '@/web3/chains';

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: chain.id === sepolia.id ? Network.ETH_SEPOLIA : Network.ETH_MAINNET,
});

export default alchemy;
