import type { NextPage } from 'next';
import { Box, Flex, Heading } from '@chakra-ui/react';
import bg from '../../public/background.jpg';
import Nav from '../components/Nav';
import Scene from '../components/Scene';

const maxHeight = `${(bg.height / bg.width) * 100}vh`;

const Home: NextPage = () => (
  <Box bgImage={bg.src} bgPos="top center" bgRepeat="no-repeat" bgSize="cover" minH={maxHeight}>
    <Scene />

    <Box>
      <Nav display={false} />

      <Box mt={500} position="relative" zIndex={500}>
        <Flex w="100%" direction="column" alignItems="center" justifyContent="center">
          <Heading as="h1" color="primary.400" textTransform="uppercase" fontSize="8xl">
            The Assets Club
          </Heading>
          <Heading as="h1" color="primary.400" textTransform="uppercase" fontSize="6xl">
            coming soon!
          </Heading>
        </Flex>
      </Box>
    </Box>
  </Box>
);

export default Home;
