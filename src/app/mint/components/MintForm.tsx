import { TransactionReceipt } from 'alchemy-sdk';
import { constants, utils } from 'ethers';
import { range } from 'lodash';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import MintBox from '@/app/mint/components/MintBox';
import MintMark from '@/app/mint/components/MintMark';
import { MAXIMUM_MINTS_PER_ACCOUNT, Tier } from '@/web3/contracts/TheAssetsClub';
import useMint from '@/web3/hooks/useMint';
import useMintStatus, { MintStatus } from '@/web3/hooks/useMintStatus';
import {
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

interface MintFormProps {
  onSuccess?: (data: TransactionReceipt) => Promise<void> | void;
}

const MintForm: FC<MintFormProps> = ({ onSuccess }) => {
  const [slider, setInternalSlider] = useState(1);
  const { status } = useMintStatus();
  const { tier, mint, quantity, minted, price, free, isLoading, paris } = useMint({ slider, onSuccess });
  const size = useBreakpointValue({ lg: 60 }) ?? 40;

  const setSlider = useCallback(
    (newValue: number) => {
      if (newValue < 1) {
        newValue = 1;
      }

      if (newValue > MAXIMUM_MINTS_PER_ACCOUNT) {
        newValue = MAXIMUM_MINTS_PER_ACCOUNT;
      }

      if (newValue < (free ?? 0)) {
        newValue = free ?? 0;
      }

      if (newValue < (minted ?? 1)) {
        newValue = (minted ?? 0) + 1;
      }

      setInternalSlider(newValue);
    },
    [free, minted],
  );

  useEffect(() => {
    if (minted) {
      setSlider(minted + 1);
    } else if (free) {
      setSlider(free + 1);
    }
  }, [minted, free, setSlider]);

  const locked = useMemo(() => {
    if (status === MintStatus.PRIVATE_SALE) {
      return paris.used || tier === Tier.PUBLIC;
    }

    return false;
  }, [paris.used, status, tier]);

  const title = useMemo(() => {
    if (locked) {
      return 'Mint (locked until public sale)';
    }

    return 'Mint';
  }, [locked]);

  const disabled = useMemo(() => {
    if (locked) {
      return true;
    }

    if (typeof paris.tokenId === 'number') {
      return false;
    }

    switch (status) {
      case MintStatus.PRIVATE_SALE:
        return typeof tier === 'undefined' || ![Tier.ACCESS_LIST, Tier.OG].includes(tier);
      case MintStatus.PUBLIC_SALE:
        return false;
    }

    return true;
  }, [locked, paris.tokenId, status, tier]);

  if (typeof status === 'undefined' || ![MintStatus.PRIVATE_SALE, MintStatus.PUBLIC_SALE].includes(status)) {
    return null;
  }

  return (
    <MintBox title={title} defaultOpen={true}>
      <Slider
        aria-label="Mint slider"
        defaultValue={2}
        min={1}
        max={7}
        mb={8}
        value={slider}
        onChange={setSlider}
        mx={`${size / 2}px`}
        width={`calc(100% - ${size}px)`}
        isDisabled={disabled}
      >
        <Flex justifyContent="space-between" mb={4} mx={`-${size / 2}px`}>
          {range(MAXIMUM_MINTS_PER_ACCOUNT).map((_, i) => (
            <MintMark
              key={i}
              size={size}
              value={i + 1}
              free={free ?? 0}
              disabled={disabled}
              skipped={(minted ?? 0) > i}
            />
          ))}
        </Flex>

        <SliderTrack sx={{ top: '100% !important' }}>
          <SliderFilledTrack />
        </SliderTrack>

        <SliderThumb sx={{ top: '100% !important' }} />
      </Slider>

      {quantity !== 0 ? (
        <Button isLoading={isLoading} isDisabled={disabled} onClick={mint} width={{ base: '100%', lg: 'auto' }}>
          Mint {quantity} for {price && utils.formatEther(price)} {constants.EtherSymbol}
        </Button>
      ) : (
        <MintBox title="Thank you!">
          <Text>You minted the maximum assets per wallet, thank you so much for your support!</Text>
        </MintBox>
      )}
    </MintBox>
  );
};

export default MintForm;
