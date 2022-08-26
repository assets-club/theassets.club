import type { NextPage } from 'next';
import Image from 'next/future/image';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import bg from '../../public/background.jpg';
import mintImg from '../../public/images/mint.svg';
import title from '../../public/images/title3.png';
import Scene from '../components/Scene';
import Nav from '../components/layout/Nav';
import Princess from '../components/scene/Princess';
import useMint from '../web3/hooks/useMint';

const Home: NextPage = () => {
  const { mint } = useMint();

  return (
    <Box bgImage={bg.src} bgPos="top center" bgRepeat="no-repeat" bgSize="cover">
      <Scene />

      <Box>
        <Nav position="relative" zIndex={500} />

        <Box mt="calc(50vh - 300px)" position="relative" zIndex={500}>
          <Flex w="100%" direction="column" alignItems="center" justifyContent="center" textAlign="center">
            <Image src={title} alt="The Assets Club handwritten logo" />
            <Box as="button" type="button" onClick={mint}>
              <Image src={mintImg} width={200} alt="Mint button" />
            </Box>
          </Flex>
        </Box>

        <Princess margin="auto" maxW={{ md: 1000 }} />
      </Box>
    </Box>
  );
};

export default Home;
