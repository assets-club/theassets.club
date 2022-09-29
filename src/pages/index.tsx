import type { NextPage } from 'next';
import Image from 'next/future/image';
import { FullPage, Slide } from 'react-full-page';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Box, Flex } from '@chakra-ui/react';
import princess from '../../public/animations/princess.png';
import bg from '../../public/background.jpg';
import Player from '../components/Player';
import Nav from '../components/layout/Nav';
import useWindowSize from '../lib/hooks/useWindowSize';

const STEPS = 4;
const PRINCESS_RATIO = 0.6;

const Home: NextPage = () => {
  const { height } = useWindowSize();
  const totalHeight = STEPS * height;
  const princessH = totalHeight * PRINCESS_RATIO;
  const princessW = (princessH * princess.width) / princess.height;

  return (
    <ParallaxProvider>
      <Box
        bgImage={bg.src}
        bgPos="top center"
        bgRepeat="repeat-x"
        bgSize={`auto ${totalHeight}px`}
        height={totalHeight}
        position="relative"
        overflow="hidden"
      >
        {/* Fixed elements*/}
        <Nav position="fixed" top={0} left={0} right={0} />

        <Player position="fixed" bottom="5vh" left="5vh" />

        <Flex pt={height * 1.3} justifyContent="center">
          <Parallax speed={-60}>
            <Image src={princess} width={princessW} height={princessH} alt="The Assets Club princess" />
          </Parallax>
        </Flex>

        <FullPage>
          <Slide />
          <Slide />
          <Slide />
          <Slide />
        </FullPage>
      </Box>
    </ParallaxProvider>
  );
};

export default Home;
