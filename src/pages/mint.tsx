import { constants, utils } from 'ethers';
import { NextPage } from 'next';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useToken,
} from '@chakra-ui/react';
import MintMark from '../components/MintMark';
import Nav from '../components/Nav';
import { price } from '../constants/mint';

const bgColor = '#121212';

const phases = [
  {
    name: "OG's special",
    free: 2,
  },
  {
    name: 'Whitelist',
    free: 1,
  },
  {
    name: 'Public sale',
    free: 1,
  },
];

enum Video {
  DARK = 'dark',
  END = 'end',
}

const MintPage: NextPage = () => {
  const [phaseId, setPhaseId] = useState(2);
  const phase = phases[phaseId];
  const [video, setVideo] = useState<Video>(Video.DARK);
  const [count, setCount] = useState<number>(1);
  const disabled = true;

  const total = price.mul(Math.max(count - phase.free, 0));
  const color = useToken('colors', 'white');
  const { isConnected, address } = useAccount();

  return (
    <Flex minH="100vh">
      <Nav position="fixed" top={0} left={0} right={0} zIndex={100} />

      <Flex minW="900px" bgColor={bgColor} alignItems="center" justifyContent="center" style={{ color }}>
        <Box w="600px">
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

          <Heading mb={2}>Current phase: {phase.name}</Heading>
          <Text mb={8}>
            {!isConnected || !address ? (
              <>Connect your wallet to see your waitlist tier</>
            ) : (
              <>Wallet: {address} - tier:</>
            )}
          </Text>

          <Slider
            aria-label="Mint slider"
            defaultValue={2}
            min={1}
            max={3}
            mb={8}
            value={count}
            onChange={setCount}
            mx="40px"
            width="calc(100% - 80px)"
            isDisabled={disabled}
          >
            <Flex justifyContent="space-between" mb={4} mx="-40px">
              {phases.map((_, i) => (
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
            You will be able to mint at most 3 Asset. Depending of your waitlist tier, you will have access to 1 or 2
            free NFTs. {!isConnected && <>Connect your wallet to check your WaitList tier.</>}
          </Text>

          {!isConnected ? (
            <>
              <Button size="lg" color="chakra-body-text">
                Connect your wallet
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" color="chakra-body-text">
                Mint {count} Asset for{' '}
                {total.isZero() ? 'free' : `${utils.formatEther(total)} ${constants.EtherSymbol}`}
              </Button>
            </>
          )}
        </Box>
      </Flex>

      <Box flexGrow={1} position="relative">
        <Box width="40%" h="100%" bg={`linear-gradient(90deg, ${bgColor} 0%, transparent 100%)`} />
        <video
          key={video}
          autoPlay
          muted
          loop={video === Video.DARK}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={`/mint/${video}.webm`} type="video/webm" />
          <source src={`/mint/${video}.mp4`} type="video/mp4" />
        </video>
      </Box>
    </Flex>
  );
};

export default MintPage;
