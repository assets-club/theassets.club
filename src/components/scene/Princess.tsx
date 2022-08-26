import Image from 'next/future/image';
import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import princess from '../../../public/animations/princess.png';
import tatooMint from '../../../public/animations/tatoo-mint.png';
import { useGlobalState } from '../../lib/StateProvider';
import useMint from '../../web3/hooks/useMint';

const r = tatooMint.width / tatooMint.height;
const wP = 15;
const hP = (wP * princess.width) / (r * princess.height);

const Princess: FC<BoxProps> = (props) => {
  const { mintRef } = useGlobalState();
  const { mint } = useMint();

  return (
    <Box position="relative" {...props}>
      <Image src={princess} width={princess.width} height={princess.height} alt="Princess" />

      <Box
        ref={mintRef as any}
        as="button"
        position="absolute"
        top="59%"
        left="58%"
        width={`${wP}%`}
        height={`${hP}%`}
        onClick={mint}
        zIndex={300}
      >
        <Image src={tatooMint.src} alt="Princess" fill priority />
      </Box>
    </Box>
  );
};

export default Princess;
