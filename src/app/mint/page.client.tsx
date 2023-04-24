'use client';

import { NextPage } from 'next';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import Eligibility from '@/app/mint/components/Eligibility';
import MintConnect from '@/app/mint/components/MintConnect';
import MintInfo from '@/app/mint/components/MintInfo';
import useMint from '@/web3/hooks/useMint';
import { Box, Flex, useToken } from '@chakra-ui/react';
import { price } from '../constants/mint';

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
        <Box w="600px" color="white">
          <MintInfo mb={6} />

          {isConnected ? <Eligibility /> : <MintConnect />}
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
