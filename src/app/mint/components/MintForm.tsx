import { TransactionReceipt } from 'alchemy-sdk';
import { BigNumber, constants, utils } from 'ethers';
import { range } from 'lodash';
import { useAccount, useBalance } from 'wagmi';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import MintBox from '@/app/mint/components/MintBox';
import MintMark from '@/app/mint/components/MintMark';
import useMounted from '@/lib/hooks/useMounted';
import { MAXIMUM_MINTS_PER_ACCOUNT, Tier } from '@/web3/contracts/TheAssetsClub';
import useMint from '@/web3/hooks/useMint';
import useMintStatus, { MintStatus } from '@/web3/hooks/useMintStatus';
import {
  Box,
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
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { status } = useMintStatus();
  const { tier, mint, quantity, minted, price, free, isLoading, paris } = useMint({ slider, onSuccess });
  const insufficientBalance = useMemo(() => {
    if (!BigNumber.isBigNumber(balance?.value) || !BigNumber.isBigNumber(price)) {
      return false;
    }

    return balance?.value?.lt(price) ?? false;
  }, [balance?.value, price]);

  const size = useBreakpointValue({ lg: 60 }) ?? 40;
  const mounted = useMounted();

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
    if (status !== MintStatus.PRIVATE_SALE) {
      return false;
    }

    if (paris.used === constants.AddressZero || paris.used === address) {
      return false;
    }

    return tier === Tier.PUBLIC;
  }, [paris.used, status, tier, address]);

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

  if (!mounted) {
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

      {quantity !== 0 && BigNumber.isBigNumber(price) && (
        <Flex gap={4} flexDir={{ base: 'column', lg: 'row' }} alignItems="center">
          <Button
            isLoading={isLoading}
            isDisabled={disabled || insufficientBalance}
            onClick={mint}
            width={{ base: '100%', lg: 'auto' }}
          >
            Mint {quantity} for {utils.formatEther(price)} {constants.EtherSymbol}
          </Button>
          {insufficientBalance && <Text fontSize="sm">Insufficient balance</Text>}
        </Flex>
      )}

      {quantity === 0 && (
        <Box>
          <Text>You minted the maximum assets per wallet, thank you so much for your support!</Text>
        </Box>
      )}
    </MintBox>
  );
};

export default MintForm;
