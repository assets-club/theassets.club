'use client';

import { constants, utils } from 'ethers';
import { range } from 'lodash';
import { NextPage } from 'next';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import MintConnect from '@/app/mint/components/MintConnect';
import Phase from '@/app/mint/components/PhaseName';
import useMint from '@/web3/hooks/useMint';
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
import { price } from '../constants/mint';
import MintMark from './components/MintMark';

const bgColor = '#121212';

const phases = [
  {
    name: "OG's special",
    free: 3,
  },
  {
    name: 'Whitelist',
    free: 2,
  },
  {
    name: 'Public sale',
    free: 0,
  },
];

enum Video {
  DARK = 'dark',
  END = 'end',
}

const MintPageClient: NextPage = () => {
  const [phaseId, setPhaseId] = useState(2);
  const phase = phases[phaseId];
  const [video, setVideo] = useState<Video>(Video.DARK);
  const [count, setCount] = useState<number>(1);
  const disabled = false;

  const total = price.mul(Math.max(count - phase.free, 0));
  const color = useToken('colors', 'white');
  const { isConnected, address } = useAccount();

  const [quantity, setQuantity] = useState(1);
  const { mint, tier } = useMint({ quantity });

  return (
    <Flex minH="100vh">
      <Flex minW="900px" bgColor={bgColor} alignItems="center" justifyContent="center">
        <Box w="600px">
          <Phase color="white" />

          {!isConnected ? (
            <MintConnect />
          ) : (
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
                You will be able to mint at most 3 Asset. Depending of your waitlist tier, you will have access to 1 or
                2 free NFTs. {!isConnected && <>Connect your wallet to check your WaitList tier.</>}
              </Text>

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

export default MintPageClient;
