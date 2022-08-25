import type { NextPage } from 'next';
import { Box, Flex, Heading } from '@chakra-ui/react';
import bg from '../../public/background.jpg';
import Scene from '../components/Scene';
import Nav from '../components/layout/Nav';
import Princess from '../components/scene/Princess';

const Home: NextPage = () => (
  <Box bgImage={bg.src} bgPos="top center" bgRepeat="no-repeat" bgSize="cover">
    <Scene />

    <Box>
      <Nav position="relative" zIndex={500} />

      <Box mt="calc(50vh - 100px)" position="relative" zIndex={500}>
        <Flex w="100%" direction="column" alignItems="center" justifyContent="center" textAlign="center">
          <Heading as="h1" color="primary.400" textTransform="uppercase" fontSize={{ base: '4xl', md: '8xl' }}>
            The Assets Club
          </Heading>
          <Heading as="h1" color="primary.400" textTransform="uppercase" fontSize={{ base: '2xl', md: '6xl' }}>
            coming soon!
          </Heading>
        </Flex>
      </Box>

      <Princess margin="auto" maxW={{ md: 1000 }} />
    </Box>
  </Box>
);

export default Home;
