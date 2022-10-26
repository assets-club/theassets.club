import { FC } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

const HeadingMF: FC<HeadingProps> = (props) => {
  return <Heading fontFamily="Marker Felt, sans-serif" {...props} />;
};

export default HeadingMF;
