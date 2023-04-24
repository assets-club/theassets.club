import { constants, utils } from 'ethers';
import Image from 'next/image';
import { FC, useCallback, useMemo } from 'react';
import sound from '@/public/images/sound.png';
import { SALE_PRICE } from '@/web3/contracts/TheAssetsClub';
import { Box, Text, useSliderContext } from '@chakra-ui/react';

interface MintMarkProps {
  size?: number;
  value: number;
  free: number;
  disabled?: boolean;
}

const MintMark: FC<MintMarkProps> = ({ size = 80, value, free, disabled }) => {
  const { state, actions } = useSliderContext();
  const grayscale = useMemo(() => {
    if (disabled) return 100;
    return state.value >= value ? 0 : 90;
  }, [disabled, state.value, value]);

  const handleClick = useCallback(() => {
    actions.stepTo(value);
  }, [actions, value]);

  return (
    <Box w={`${size}px`} cursor={disabled ? 'not-allowed' : 'pointer'} onClick={handleClick}>
      <Image
        src={sound}
        alt="sound"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          filter: `grayscale(${grayscale})`,
          transition: 'filter 0.3s ease',
        }}
      />

      <Text textAlign="center" mt={1}>
        {free >= value ? 'Free' : `${utils.formatEther(SALE_PRICE)} ${constants.EtherSymbol}`}
      </Text>
    </Box>
  );
};

export default MintMark;
