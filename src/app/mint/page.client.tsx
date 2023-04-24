'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import Countdown from '@/app/mint/components/Countdown';
import MintEligibility from '@/app/mint/components/MintEligibility';
import MintForm from '@/app/mint/components/MintForm';
import MintInfo from '@/app/mint/components/MintInfo';
import useMintStatus, { MintStatus } from '@/web3/hooks/useMintStatus';
import { Box, Flex } from '@chakra-ui/react';

const bgColor = '#121212';

enum Video {
  DARK = 'dark',
  END = 'end',
}

const MintPageClient: NextPage = () => {
  const [video, setVideo] = useState<Video>(Video.DARK);
  const { status } = useMintStatus();

  return (
    <Flex minH="100vh">
      <Flex minW="900px" bgColor={bgColor} alignItems="center" justifyContent="center">
        <Box w="600px" color="white">
          <MintInfo mb={6} />
          {status === MintStatus.CLOSED && <Countdown mb={4} />}
          <MintEligibility />
          {[MintStatus.PRIVATE_SALE, MintStatus.PUBLIC_SALE].includes(status!) && <MintForm />}
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
