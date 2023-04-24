'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import MintCountdown from '@/app/mint/components/MintCountdown';
import MintEligibility from '@/app/mint/components/MintEligibility';
import MintForm from '@/app/mint/components/MintForm';
import MintInfo from '@/app/mint/components/MintInfo';
import useMintStatus, { MintStatus } from '@/web3/hooks/useMintStatus';
import { Box, Flex, Show, Stack } from '@chakra-ui/react';

const bgColor = '#121212';

enum Video {
  DARK = 'dark',
  END = 'end',
}

const MintPageClient: NextPage = () => {
  const [video, setVideo] = useState<Video>(Video.DARK);
  const { status } = useMintStatus();

  const videoElement = (
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
  );

  return (
    <Flex minH="100vh">
      <Flex
        minW={{ base: '100%', md: '900px' }}
        bgColor={{ lg: bgColor }}
        alignItems={{ lg: 'center' }}
        justifyContent="center"
      >
        {videoElement}

        <Stack
          color="white"
          gap={4}
          pt={{ base: '120px', lg: 0 }}
          pb={{ base: '120px', lg: 0 }}
          px={{ base: 4 }}
          mx="auto"
          width={{ base: '100%', lg: '600px' }}
          bgColor={{ base: 'blackAlpha.500', lg: 'transparent' }}
        >
          <MintInfo />
          {status === MintStatus.CLOSED && <MintCountdown mb={4} />}
          <MintEligibility />
          {[MintStatus.PRIVATE_SALE, MintStatus.PUBLIC_SALE].includes(status!) && <MintForm />}
        </Stack>
      </Flex>

      <Show above="lg">
        <Box flexGrow={1} position="relative">
          <Box width="40%" h="100%" bg={`linear-gradient(90deg, ${bgColor} 0%, transparent 100%)`} />
          {videoElement}
        </Box>
      </Show>
    </Flex>
  );
};

export default MintPageClient;
