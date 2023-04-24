import { Metadata } from 'next';
import MintPageClient from '@/app/mint/page.client';

export const metadata: Metadata = {
  title: 'Mint',
};

const MintPage = () => {
  return <MintPageClient />;
};

export default MintPage;
