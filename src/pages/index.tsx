import type { NextPage } from 'next';
import Image, { StaticImageData } from 'next/future/image';
import { FullPage, Slide } from 'react-full-page';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { ComponentProps, useMemo } from 'react';
import { Box, BoxProps, Flex, useBreakpointValue } from '@chakra-ui/react';
import cloud1 from '../../public/animations/cloud1.png';
import cloud2 from '../../public/animations/cloud2.png';
import palmLeft1 from '../../public/animations/palm-left1.png';
import palmLeft2 from '../../public/animations/palm-left2.png';
import palmRight1 from '../../public/animations/palm-right1.png';
import palmRight2 from '../../public/animations/palm-right2.png';
import palmRight3 from '../../public/animations/palm-right3.png';
import plant1 from '../../public/animations/plant1.png';
import plant2 from '../../public/animations/plant2.png';
import plant3 from '../../public/animations/plant3.png';
import plant4 from '../../public/animations/plant4.png';
import plant5 from '../../public/animations/plant5.png';
import princess from '../../public/animations/princess.png';
import sun from '../../public/animations/sun.png';
import bgSea from '../../public/background-sea.png';
import bgSky from '../../public/background-sky.png';
import Nav from '../components/Nav';
import useWindowSize from '../lib/hooks/useWindowSize';

const STEPS = 4;
const PRINCESS_RATIO = 0.6;

interface Layer extends Pick<BoxProps, 'top'> {
  img: StaticImageData;
  scale?: number;
  position: BoxProps['inset'];
  z: number;
  parallax: Omit<ComponentProps<typeof Parallax>, 'children'>;
}

// Four layers
// 0. Background + sun

const Home: NextPage = () => {
  const { height } = useWindowSize();
  const totalHeight = STEPS * height;
  const princessH = totalHeight * PRINCESS_RATIO;
  const princessW = (princessH * princess.width) / princess.height;

  const layers = useMemo(
    (): Layer[] => [
      {
        img: sun,
        position: `${height * 0.2}px auto auto 20%`,
        z: 9,
        parallax: { translateX: ['-50%', '0'], translateY: ['-100%', '100%'] },
      },
      { img: cloud1, position: `${height * 0.3}px auto auto 0`, z: 11, parallax: { translateX: ['50%', '-100%'] } },
      {
        img: cloud2,
        scale: 0.7,
        position: `${height * 0.1}px 0 auto auto`,
        z: 120,
        parallax: { translateX: ['-50%', '100%'] },
      },

      {
        img: palmLeft1,
        scale: 0.7,
        position: `${height * 0.7}px auto auto 0`,
        z: 120,
        parallax: { translateX: ['-20%', '0'] },
      },
      {
        img: palmLeft2,
        scale: 0.7,
        position: `${height * 0.8}px auto auto 0`,
        z: 110,
        parallax: { translateX: ['-20%', '0'] },
      },
      {
        img: palmRight1,
        scale: 0.7,
        position: `${height * 0.7}px 0 auto auto`,
        z: 130,
        parallax: { translateX: ['20%', '0'] },
      },
      {
        img: palmRight2,
        scale: 0.7,
        position: `${height * 0.8}px 0 auto auto`,
        z: 120,
        parallax: { translateX: ['20%', '0'] },
      },
      {
        img: palmRight3,
        scale: 0.7,
        position: `${height * 0.9}px 0 auto auto`,
        z: 110,
        parallax: { translateX: ['20%', '0'] },
      },
      {
        img: plant1,
        scale: 0.7,
        position: `auto auto 0 0`,
        z: 120,
        parallax: { translateX: ['-20%', '0'], translateY: ['20%', '0'] },
      },
      {
        img: plant2,
        scale: 0.7,
        position: `auto auto 0 0`,
        z: 120,
        parallax: { translateX: ['-70%', '0'], translateY: ['20%', '0'] },
      },
      {
        img: plant3,
        scale: 0.7,
        position: `auto auto 0 30vh`,
        z: 120,
        parallax: { translateX: ['-70%', '200%'], translateY: ['20%', '0'] },
      },
      {
        img: plant4,
        scale: 0.7,
        position: `auto auto 0 50vh`,
        z: 120,
        parallax: { translateX: ['-20%', '0'], translateY: ['20%', '0'] },
      },
      {
        img: plant5,
        scale: 0.7,
        position: `auto 0 0 auto`,
        z: 120,
        parallax: { translateX: ['90%', '0'], translateY: ['-20%', '0'] },
      },
    ],
    [height],
  );

  const princessParallax = useBreakpointValue({
    base: -200,
    sm: -60,
  });

  return (
    <ParallaxProvider>
      <Box height={totalHeight} position="relative" overflow="hidden">
        <Box
          position="absolute"
          inset={0}
          bgImage={bgSky.src}
          bgPos="top center"
          bgRepeat="repeat-x"
          bgSize={`auto ${totalHeight}px`}
          height={totalHeight}
          zIndex={8}
        />
        <Box
          position="absolute"
          inset={0}
          bgImage={bgSea.src}
          bgPos="top center"
          bgRepeat="repeat-x"
          bgSize={`auto ${totalHeight}px`}
          height={totalHeight}
          zIndex={10}
        />

        {/* Fixed elements*/}
        <Nav position="fixed" top={0} left={0} right={0} zIndex={1000} />

        {/* Absolute elements */}
        {layers.map((layer) => (
          <Box key={layer.img.src} position="absolute" inset={layer.position} zIndex={layer.z}>
            <Parallax {...layer.parallax}>
              <Image
                src={layer.img}
                width={layer.img.width * (layer.scale ?? 1)}
                height={layer.img.height * (layer.scale ?? 1)}
                alt=""
              />
            </Parallax>
          </Box>
        ))}

        <Flex pt={{ base: height * 2.5, md: height * 1.3 }} justifyContent="center" position="relative" zIndex={100}>
          <Parallax speed={princessParallax}>
            <Image src={princess} width={princessW} height={princessH} alt="The Asse(t)s Club princess" />
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
