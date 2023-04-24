import { constants, utils } from 'ethers';
import { range } from 'lodash';
import { FC, useCallback, useEffect, useState } from 'react';
import MintMark from '@/app/mint/components/MintMark';
import { MAXIMUM_MINTS_PER_ACCOUNT, Tier } from '@/web3/contracts/TheAssetsClub';
import useMint from '@/web3/hooks/useMint';
import { Box, Button, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';

const freeMap: Record<Tier, number> = {
  [Tier.PUBLIC]: 0,
  [Tier.ACCESS_LIST]: 2,
  [Tier.OG]: 3,
};

const MintForm: FC = () => {
  const [quantity, setQuantityInternal] = useState(1);
  const { mint, tier, price } = useMint({ quantity });
  const free = freeMap[tier ?? Tier.PUBLIC];

  const setQuantity = useCallback(
    (newValue: number) => {
      setQuantityInternal(() => {
        return Math.min(Math.max(Math.floor(newValue), free, 1), 7);
      });
    },
    [free],
  );

  const disabled = false;

  useEffect(() => {
    setQuantity(free + 1);
  }, [free, setQuantity]);

  return (
    <Box>
      <Slider
        aria-label="Mint slider"
        defaultValue={2}
        min={1}
        max={7}
        mb={8}
        value={quantity}
        onChange={setQuantity}
        mx="40px"
        width="calc(100% - 80px)"
        isDisabled={disabled}
      >
        <Flex justifyContent="space-between" mb={4} mx="-40px">
          {range(MAXIMUM_MINTS_PER_ACCOUNT).map((_, i) => (
            <MintMark key={i} value={i + 1} free={free} disabled={disabled} />
          ))}
        </Flex>

        <SliderTrack sx={{ top: '100% !important' }}>
          <SliderFilledTrack />
        </SliderTrack>

        <SliderThumb sx={{ top: '100% !important' }} />
      </Slider>

      <Button onClick={mint}>
        Mint {quantity} for {price && utils.formatEther(price)} {constants.EtherSymbol}
      </Button>
    </Box>
  );
};

export default MintForm;
