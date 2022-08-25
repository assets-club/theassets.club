import { Box } from '@chakra-ui/react';
import Cloud1 from './scene/Cloud1';
import Plane from './scene/Plane';
import Princess from './scene/Princess';

const Scene = () => {
  return (
    <Box flexGrow={1} position="absolute" inset="0 0 0 0" maxW="100%" overflow="hidden" zIndex={1}>
      <Cloud1 />
      <Plane />
    </Box>
  );
};

export default Scene;
