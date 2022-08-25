import Image from 'next/future/image';
import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import princess from '../../public/animations/princess.png';
import mint from '../../public/animations/tatoo-mint.png';
import { useGlobalState } from '../lib/StateProvider';

const r = mint.width / mint.height;
const wP = 15;
const hP = (wP * princess.width) / (r * princess.height);

const Princess: FC<BoxProps> = (props) => {
  const { mintRef } = useGlobalState();

  return (
    <Box position="relative" {...props} ref={mintRef as any}>
      <Image src={princess} width={princess.width} height={princess.height} alt="Princess" />
      <Box id="mint" position="absolute" top="59%" left="58%" width={`${wP}%`} height={`${hP}%`}>
        <Image src={mint.src} alt="Princess" fill />
      </Box>
    </Box>
  );
};

export default Princess;
