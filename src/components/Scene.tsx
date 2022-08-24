import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Box } from '@chakra-ui/react';
import Cloud1 from './Cloud1';
import Plane from './Plane';
import Princess from './Princess';

const Scene = () => {
  return (
    <Box flexGrow={1} position="absolute" inset="0 0 0 0" maxW="100%" overflow="hidden" zIndex={1}>
      <Cloud1 />
      <Plane />

      <Parallax translateY={['50vh', '-100vh']}>
        <Princess />
      </Parallax>
    </Box>
  );
};

export default Scene;
