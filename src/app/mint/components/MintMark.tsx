import { constants, utils } from 'ethers';
import Image from 'next/image';
import { FC, useCallback, useMemo } from 'react';
import sound from '@/public/images/sound.png';
import { SALE_PRICE } from '@/web3/contracts/TheAssetsClub';
import { CheckIcon } from '@chakra-ui/icons';
import { Box, Text, useSliderContext } from '@chakra-ui/react';

interface MintMarkProps {
  size?: number;
  value: number;
  free: number;
  disabled?: boolean;
  skipped?: boolean;
}

const MintMark: FC<MintMarkProps> = ({ size = 80, value, free, disabled, skipped = false }) => {
  const { state, actions } = useSliderContext();
  const grayscale = useMemo(() => {
    if (disabled) return 100;
    if (skipped) return 80;
    return state.value >= value ? 0 : 90;
  }, [disabled, skipped, state.value, value]);

  const handleClick = useCallback(() => {
    actions.stepTo(value);
  }, [actions, value]);

  return (
    <Box position="relative" w={`${size}px`} cursor={disabled ? 'not-allowed' : 'pointer'} onClick={handleClick}>
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

      {skipped && (
        <CheckIcon
          position="absolute"
          color="green.400"
          p={2}
          inset={`${size / 2}px auto auto ${size / 2}px`}
          transform="translate(-50%, -50%)"
          fontSize={(size / 4) * 3}
          borderStyle="solid"
          borderWidth="3px"
          borderColor="green.400"
          borderRadius="1000px"
        />
      )}

      <Text textAlign="center" mt={1} fontSize={{ base: 'xs', lg: 'md' }}>
        {free >= value ? 'Free' : `${utils.formatEther(SALE_PRICE)} ${constants.EtherSymbol}`}
      </Text>
    </Box>
  );
};

export default MintMark;
