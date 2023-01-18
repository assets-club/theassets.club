import { constants, utils } from 'ethers';
import Image from 'next/future/image';
import { FC, useCallback } from 'react';
import { Box, useSliderContext, Text } from '@chakra-ui/react';
import sound from '../../public/images/sound.png';
import { price } from '../constants/mint';

interface MintMarkProps {
  size?: number;
  value: number;
  free: number;
}

const MintMark: FC<MintMarkProps> = ({ size = 80, value, free }) => {
  const { state, actions } = useSliderContext();
  const grayscale = state.value >= value ? 0 : 90;

  const handleClick = useCallback(() => {
    actions.stepTo(value);
  }, [actions, value]);

  return (
    <Box w={`${size}px`} onClick={handleClick}>
      <Image
        src={sound}
        alt="sound"
        width={size}
        height={size}
        style={{ width: size, height: size, filter: `grayscale(${grayscale})`, transition: 'filter 0.3s ease' }}
      />

      <Text textAlign="center" mt={1}>
        {free >= value ? 'Free' : `${utils.formatEther(price)} ${constants.EtherSymbol}`}
      </Text>
    </Box>
  );
};

export default MintMark;
