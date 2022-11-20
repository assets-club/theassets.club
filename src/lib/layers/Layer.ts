import { StaticImageData } from 'next/future/image';
import { Parallax } from 'react-scroll-parallax';
import { ComponentProps } from 'react';
import { BoxProps } from '@chakra-ui/react';

export default interface Layer extends Pick<BoxProps, 'top'> {
  img: StaticImageData;
  scale?: number;
  position: BoxProps['inset'];
  z: number;
  parallax: Omit<ComponentProps<typeof Parallax>, 'children'>;
}
