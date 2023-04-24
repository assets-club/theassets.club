import { isValidMotionProp, motion } from 'framer-motion';
import { chakra } from '@chakra-ui/react';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

export default MotionBox;
