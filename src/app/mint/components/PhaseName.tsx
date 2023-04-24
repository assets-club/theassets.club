import { FC, ReactNode } from 'react';
import useMintStatus, { MintStatus } from '@/web3/hooks/useMintStatus';
import { Box, Heading, Text } from '@chakra-ui/react';

const statuses: Record<MintStatus, { title: string; description: ReactNode }> = {
  [MintStatus.CLOSED]: {
    title: 'Closed',
    description: 'Mint will start very soon! Stay tuned.',
  },
  [MintStatus.PRIVATE_SALE]: {
    title: 'Private sale',
    description: "Mint is reserved to OG's and our access list",
  },
  [MintStatus.PUBLIC_SALE]: {
    title: 'Public sale',
    description: 'Mint is opened to everyone until sold out',
  },
  [MintStatus.ENDED]: {
    title: 'Ended',
    description: 'Mint has eneded.',
  },
  [MintStatus.SOLD_OUT]: {
    title: 'Sold out',
    description: 'The collection has sold out! Thank you so much for your support.',
  },
};

const PhaseInfo: FC = (props) => {
  const { status } = useMintStatus();
  const { title, description } = statuses[status ?? MintStatus.CLOSED];

  return (
    <Box color="white">
      <Heading mb={2}>Mint status: {title}</Heading>
      <Text>{description}</Text>
    </Box>
  );
};

export default PhaseInfo;
