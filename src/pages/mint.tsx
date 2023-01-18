import { constants, utils } from 'ethers';
import { NextPage } from 'next';
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

const MintPage: NextPage = () => {
  const [phaseId, setPhaseId] = useState(2);
  const phase = phases[phaseId];
  const [count, setCount] = useState<number>(1);
  const total = price.mul(Math.max(count - phase.free, 0));

  return (
    <Flex minH="100vh">
      <Nav position="fixed" top={0} left={0} right={0} zIndex={100} />

      <Flex minW="900px" bgColor={bgColor} alignItems="center" justifyContent="center" color="white.100">
        <Box w="600px">
          <Box>
            {phases.map(({ name }, i) => (
              <Button colorScheme="blue" key={name} onClick={() => setPhaseId(i)}>
                {name}
              </Button>
            ))}
          </Box>

          <Heading mx="-40px" mb={8}>
            Current phase: {phase.name}
          </Heading>
          <Slider aria-label="Mint slider" defaultValue={2} min={1} max={3} mb={8} value={count} onChange={setCount}>
            <Flex justifyContent="space-between" mx="-40px" mb={4}>
              {phases.map((_, i) => (
                <MintMark key={i} value={i + 1} free={phase.free} />
              ))}
            </Flex>
            <SliderTrack sx={{ top: '100% !important' }}>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb sx={{ top: '100% !important' }} />
          </Slider>
          <Box mx="-40px">
            <Heading mb={8}>How to proceed</Heading>
            <Text>
              You will be able to mint at most 3 Asset. Depending of your whitelist tier, you will have access to 1 or 2
              free NFTs.
            </Text>

            <Button size="lg" variant="nav" mt={8}>
              Mint {count} Asset for {total.isZero() ? 'free' : `${utils.formatEther(total)} ${constants.EtherSymbol}`}
            </Button>
          </Box>
        </Box>
      </Flex>

      <Box flexGrow={1} position="relative">
        <Box width="40%" h="100%" bg={`linear-gradient(90deg, ${bgColor} 0%, transparent 100%)`} />
        <video
          autoPlay
          muted
          loop
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
          <source src="/mint/dark.mp4" type="video/mp4" />
        </video>
      </Box>
    </Flex>
  );
};

export default MintPage;
