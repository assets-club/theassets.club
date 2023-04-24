'use client';

import { FC } from 'react';
import MarkerFelt from '@/app/fonts/MarkerFelt';
import { Heading, HeadingProps } from '@chakra-ui/react';

const HeadingMF: FC<HeadingProps> = (props) => {
  return <Heading className={MarkerFelt.className} {...props} />;
};

export default HeadingMF;
