import { FC, ReactNode } from 'react';
import MintBox from '@/app/mint/components/MintBox';
import { Tier } from '@/web3/contracts/TheAssetsClub';
import useMint from '@/web3/hooks/useMint';
import { Text } from '@chakra-ui/react';

const tiers: Record<Tier, { name: string; description: ReactNode }> = {
  [Tier.PUBLIC]: {
    name: 'Public',
    description: 'You will be able to mint a token during the public sale.',
  },
  [Tier.ACCESS_LIST]: {
    name: 'Access list',
    description: 'You will be able to mint two tokens for free during the private sale.',
  },
  [Tier.OG]: {
    name: 'OG',
    description: 'You will be able to mint three tokens for free during the private sale.',
  },
};

const MintTier: FC = () => {
  const { tier } = useMint({ slider: 0 });

  if (typeof tier === 'undefined') {
    return null;
  }

  const { name, description } = tiers[tier];
  return (
    <MintBox title={`Tier: ${name}`}>
      <Text>{description}</Text>
    </MintBox>
  );
};

export default MintTier;
