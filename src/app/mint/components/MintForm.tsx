import { count } from 'console';
import { constants, utils } from 'ethers';
import { range } from 'lodash';
import MintMark from '@/app/mint/components/MintMark';
import { Button, Flex, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';

const MintForm = () => {
  return (
    <>
      <Box>
        {phases.map(({ name }, i) => (
          <Button colorScheme="blue" key={name} onClick={() => setPhaseId(i)}>
            {name}
          </Button>
        ))}

        <Button colorScheme="blue" onClick={() => setVideo(Video.END)}>
          Mint
        </Button>
      </Box>

      <Text mb={8}>
        {!isConnected || !address ? <>Connect your wallet to see your waitlist tier</> : <>Wallet: {address} - tier:</>}
      </Text>

      <Slider
        aria-label="Mint slider"
        defaultValue={2}
        min={1}
        max={7}
        mb={8}
        value={count}
        onChange={setCount}
        mx="40px"
        width="calc(100% - 80px)"
        isDisabled={disabled}
      >
        <Flex justifyContent="space-between" mb={4} mx="-40px">
          {range(7).map((_, i) => (
            <MintMark key={i} value={i + 1} free={phase.free} disabled={disabled} />
          ))}
        </Flex>

        <SliderTrack sx={{ top: '100% !important' }}>
          <SliderFilledTrack />
        </SliderTrack>

        <SliderThumb sx={{ top: '100% !important' }} />
      </Slider>

      <Heading mb={8}>How to proceed</Heading>

      <Text mb={4}>
        You will be able to mint at most 3 Asset. Depending of your waitlist tier, you will have access to 1 or 2 free
        NFTs. {!isConnected && <>Connect your wallet to check your WaitList tier.</>}
      </Text>

      <Button size="lg" color="chakra-body-text">
        Mint {count} Asset for {total.isZero() ? 'free' : `${utils.formatEther(total)} ${constants.EtherSymbol}`}
      </Button>
    </>
  );
};

export default MintForm;
