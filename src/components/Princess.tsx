import Image from 'next/future/image';
import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import princess from '../../public/animations/princess.png';
import mint from '../../public/animations/tatoo-mint.png';
import { useGlobalState } from '../lib/StateProvider';

const Princess: FC = () => {
  const { mintRef } = useGlobalState();

  return (
    <Box position="relative" ref={mintRef as any}>
      <Image src={princess} width={princess.width} height={princess.height} alt="Princess" />
      <Box id="mint" position="absolute" top="58%" left="58%">
        <Image src={mint} width={mint.width} height={mint.height} alt="Princess" />
      </Box>
    </Box>
  );
};

export default Princess;
