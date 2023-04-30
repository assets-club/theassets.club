import { FC, ReactNode } from 'react';
import { opensea } from '@/app/constants/socials';
import useMounted from '@/lib/hooks/useMounted';
import useMintStatus, { MintStatus } from '@/web3/hooks/useMintStatus';
import { Link } from '@chakra-ui/next-js';
import { Box, BoxProps, Button, Heading, Text } from '@chakra-ui/react';

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
    description: (
      <>
        <Text>Mint has ended, no more Assets can be minted (forever).</Text>
        <Text>
          Checkout the collection on{' '}
          <Button variant="link" as={Link} href={opensea} target="_blank">
            OpenSea
          </Button>
          !
        </Text>
      </>
    ),
  },
  [MintStatus.SOLD_OUT]: {
    title: 'Sold out',
    description: 'The collection has sold out! Thank you so much for your support.',
  },
};

const MintInfo: FC<BoxProps> = (props) => {
  const mounted = useMounted();
  const { status, remaining } = useMintStatus();
  const { title, description } = statuses[status ?? MintStatus.CLOSED];

  if (!mounted) {
    return null;
  }

  return (
    <Box color="white" {...props}>
      <Heading as="h2" mb={2}>
        Mint status: {title}
      </Heading>
      {status !== MintStatus.ENDED && (
        <Heading as="h3" mb={2} fontSize="2xl">
          {remaining} remaining Asses
        </Heading>
      )}

      {typeof description === 'string' ? <Text>{description}</Text> : description}
    </Box>
  );
};

export default MintInfo;
