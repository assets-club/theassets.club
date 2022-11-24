import { StaticImageData } from 'next/future/image';
import { Parallax } from 'react-scroll-parallax';
import { ComponentProps, CSSProperties } from 'react';
import { BoxProps } from '@chakra-ui/react';

export default interface Layer extends Pick<BoxProps, 'top'> {
  img: StaticImageData;
  scale?: number;
  position: CSSProperties['inset'];
  z: number;
  parallax: Omit<ComponentProps<typeof Parallax>, 'children'>;
}
