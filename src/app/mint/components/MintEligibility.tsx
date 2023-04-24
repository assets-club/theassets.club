import { useAccount } from 'wagmi';
import { FC, ReactNode } from 'react';
import { useConnectModal } from '@/app/providers/ConnectWalletProvider';
import { Tier } from '@/web3/contracts/TheAssetsClub';
import useClaim from '@/web3/hooks/useClaim';
import useMint from '@/web3/hooks/useMint';
import { Box, BoxProps, Button, Heading, Stack, Text } from '@chakra-ui/react';

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

const MintEligibility: FC<BoxProps> = (props) => {
  const { onOpen } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { tier, tokenId } = useMint({ quantity: 0 });
  const { claimable } = useClaim();

  if (typeof tier === 'undefined') {
    return null;
  }

  const { name, description } = tiers[tier];

  return (
    <Box {...props}>
      <Heading fontSize="2xl" mb={2}>
        Check your eligibility
      </Heading>

      {!isConnected ? (
        <>
          <Text mb={2}>Connect your wallet to check your eligibility</Text>
          <Button onClick={onOpen}>Connect wallet</Button>
        </>
      ) : (
        <Stack gap={2}>
          <Text>
            Your address: <code>{address}</code>
          </Text>

          {claimable > 0 && (
            <Box bgColor="whiteAlpha.200" p={4} borderRadius="md">
              <Heading as="h4" fontSize="xl" mb={2}>
                Contributor
              </Heading>
              <Text>
                You were recognized as an active contributor of the project. To thank you, will be able to claim{' '}
                {claimable} for free!
              </Text>
            </Box>
          )}

          {typeof tokenId === 'number' && (
            <Box bgColor="whiteAlpha.200" p={4} borderRadius="md">
              <Heading as="h4" fontSize="xl" mb={2}>
                TheAssetsClub at NFT Paris Holder
              </Heading>
              <Text>You are an early supporter of the project! You will be able to mint two tokens for free!</Text>
            </Box>
          )}

          <Box bgColor="whiteAlpha.200" p={4} borderRadius="md">
            <Heading as="h4" fontSize="xl" mb={2}>
              Tier: {name}
            </Heading>
            <Text>{description}</Text>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default MintEligibility;
