import { useAccount } from 'wagmi';
import { FC, ReactNode } from 'react';
import { Tier } from '@/web3/contracts/TheAssetsClub';
import useClaim from '@/web3/hooks/useClaim';
import useMint from '@/web3/hooks/useMint';
import { Box, Heading, Text } from '@chakra-ui/react';

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

const Eligibility: FC = () => {
  const { address } = useAccount();
  const { tier } = useMint({ quantity: 0 });
  const { claimable } = useClaim();

  if (typeof tier === 'undefined') {
    return null;
  }

  const { name, description } = tiers[tier];

  return (
    <Box>
      <Heading as="h3" fontSize="3xl" mb={2}>
        Eligibility
      </Heading>

      <Text mb={2}>
        Your address: <code>{address}</code>
      </Text>

      {claimable > 0 ? (
        <Box>
          <Text>Tier: contributor</Text>
          <Text>
            You were recognized as an active contributor of the project. To thank you, will be able to claim {claimable}{' '}
            for free!
          </Text>
        </Box>
      ) : (
        <Box>
          <Text>Tier: {name}</Text>
          <Text>{description}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Eligibility;
