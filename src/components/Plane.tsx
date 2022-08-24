import Image from 'next/future/image';
import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import plane from '../../public/animations/plane.png';
import useScrollToMint from '../lib/hooks/useScrollToMint';
import MotionBox from './MotionBox';

const Plane: FC = () => {
  const scroll = useScrollToMint();

  return (
    <MotionBox
      position="absolute"
      animate={{
        left: ['150%', '-70%', '-70%'],
      }}
      top="280px"
      width={plane.width}
      height={plane.height}
      // @ts-expect-error no problem in operation, although type error appears.
      transition={{
        duration: 30,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      }}
      zIndex={9999}
    >
      <Image src={plane} width={plane.width} height={plane.height} alt="Free Mint plane" onClick={scroll} />
    </MotionBox>
  );
};

export default Plane;
