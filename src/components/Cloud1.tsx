import Image from 'next/future/image';
import { FC } from 'react';
import cloud1 from '../../public/animations/cloud1.png';
import MotionBox from './MotionBox';

const Cloud1: FC = () => (
  <MotionBox
    position="absolute"
    animate={{
      scale: ['0.8', '1'],
    }}
    top="-150px"
    left="-80px"
    width={cloud1.width}
    height={cloud1.height}
    // @ts-expect-error no problem in operation, although type error appears.
    transition={{
      duration: 10,
      ease: 'linear',
    }}
    transformOrigin="center 90%"
  >
    <Image src={cloud1} width={cloud1.width} height={cloud1.height} alt="Cloud" />
  </MotionBox>
);

export default Cloud1;
