import { Metadata } from 'next';
import MintPageClient from '@/app/mint/page.client';

export const metadata: Metadata = {
  title: 'Mint',
  description: 'Mint TheAssetsClub token with your wallet on the Ethereum blockchain.',
};

const MintPage = () => {
  return <MintPageClient />;
};

export default MintPage;
