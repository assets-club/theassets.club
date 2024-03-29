'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { FC } from 'react';
import collaborator from '@/public/team/contributor.png';
import leafLeft from '@/public/team/leaf-left.png';
import leafRight from '@/public/team/leaf-right.png';
import sign from '@/public/team/sign.png';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import HeadingMF from '../components/HeadingMF';
import TeamCard from './components/TeamCard';
import contributors from './constants/contributors';
import team from './constants/team';


const TeamPageClient: FC = () => {
  return (
    <Box
      position="relative"
      bg="linear-gradient(180deg, rgba(95,183,171,1) 0%, rgba(0,42,34,1) 100%)"
      minH="100vh"
      pb={{ base: 32 }}
    >
      {/* Decorations */}
      <Image
        src={leafLeft}
        alt=""
        style={{
          position: 'absolute',
          top: '20vh',
          left: 0,
          maxWidth: '30%',
          zIndex: 0,
        }}
      />
      <Image
        src={leafRight}
        alt=""
        style={{
          position: 'absolute',
          top: '20vh',
          right: 0,
          maxWidth: '30%',
          zIndex: 0,
        }}
      />

      <Box position="relative" zIndex={1}>
        <Container maxW={1200} pt={{ base: 24, md: 32 }} pb={{ base: 8, md: 32 }}>
          <Box mb={{ base: 8, md: 32 }}>
            <Image
              src={sign}
              alt="Team on a wooden sign"
              style={{
                width: '75%',
                margin: '0 auto',
                filter: 'drop-shadow(50px 50px 50px #222)',
              }}
            />
          </Box>

          <Container color="white" textAlign="center" my={16}>
            <HeadingMF textTransform="uppercase" mb={4}>
              We are
            </HeadingMF>

            <Text>
              A collective of artists and engineers from Switzerland. None of us comes from BigTech. We are independent
              story tellers loaded with creativity. We are excited to bring our unique skills and creative vision to
              blockchain and NFTs. The first chapter is The Asse(t)s Club. The book is called Inspirata.
            </Text>
          </Container>

          <Flex wrap="wrap" justify="center" gap={{ base: 8, md: 16 }}>
            {team.map((props, i) => (
              <TeamCard key={i} {...props} width={{ md: 'calc(100% / 3 - 64px)' }} />
            ))}
          </Flex>

          <Container color="white" textAlign="center" my={16}>
            <HeadingMF textTransform="uppercase" mb={4}>
              Contributors
            </HeadingMF>
          </Container>

          <Flex wrap="wrap" justify="center" gap={{ base: 4, md: 8 }}>
            {contributors.map((props, i) => (
              <TeamCard
                key={i}
                image={collaborator}
                size="sm"
                {...props}
                width={{ base: 'calc(100% / 2 - 16px)', md: 'calc(100% / 6 - 32px)' }}
              />
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default TeamPageClient;
