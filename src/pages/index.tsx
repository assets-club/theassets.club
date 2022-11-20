import type { NextPage } from 'next';
import Image, { StaticImageData } from 'next/future/image';
import { FullPage, Slide } from 'react-full-page';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { ComponentProps } from 'react';
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
import LogoWhite from '../../public/logo-white.png';
import Nav from '../components/Nav';
import useWindowSize from '../lib/hooks/useWindowSize';
import useLayer from '../lib/layers/useLayer';

const STEPS = 4;
const PRINCESS_RATIO = 0.6;

interface Layer extends Pick<BoxProps, 'top'> {
  img: StaticImageData;
  scale?: number;
  position: BoxProps['inset'];
  z: number;
  parallax: Omit<ComponentProps<typeof Parallax>, 'children'>;
}

const Home: NextPage = () => {
  const { height } = useWindowSize();
  const totalHeight = STEPS * height;
  const princessH = totalHeight * PRINCESS_RATIO;
  const princessW = (princessH * princess.width) / princess.height;

  const princessParallax = useBreakpointValue({
    base: -200,
    sm: -60,
  });
  const sunLayer = useLayer(sun, 9, {
    base: {
      scale: 0.5,
      position: '-20vh auto auto 20%',
      parallax: { translateX: ['-50%', '0'], translateY: ['-100%', '100%'] },
    },
    md: {
      scale: 1,
      position: '-20vh auto auto 15%',
      parallax: { translateX: ['-50%', '0'], translateY: ['-100%', '100%'] },
    },
  });
  const logoLayer = useLayer(LogoWhite, 9, {
    base: {
      scale: 0.8,
      position: `50vh 50% auto auto`,
      parallax: { translateX: ['50%', '50%'], translateY: ['-80%', '80%'] },
    },
    md: {
      scale: 0.6,
      position: `30vh 50% auto auto`,
    },
  });
  const cloudLeftLayer = useLayer(cloud1, 120, {
    base: {
      position: `30vh auto auto 0`,
      parallax: { translateX: ['30%', '-100%'] },
    },
    md: {
      parallax: { translateX: ['00%', '-100%'] },
    },
  });
  const cloudRightLayer = useLayer(cloud2, 120, {
    base: {
      scale: 0.7,
      position: `${height * 0.1}px 0 auto auto`,
      parallax: { translateX: ['-50%', '100%'] },
    },
    md: {
      parallax: { translateX: ['0%', '100%'] },
    },
  });
  const palmLeft1Layer = useLayer(palmLeft1, 120, {
    base: {
      scale: 0.7,
      position: `70vh auto auto 0`,
      parallax: { translateX: ['-20%', '0'] },
    },
  });
  const palmLeft2Layer = useLayer(palmLeft2, 110, {
    base: {
      scale: 0.7,
      position: `${height * 0.8}px auto auto 0`,
      parallax: { translateX: ['-20%', '0'] },
    },
  });
  const palmRight1Layer = useLayer(palmRight1, 130, {
    base: {
      scale: 0.7,
      position: `70vh 0 auto auto`,
      parallax: { translateX: ['20%', '0'] },
    },
  });
  const palmRight2Layer = useLayer(palmRight2, 120, {
    base: {
      scale: 0.7,
      position: `80vh 0 auto auto`,
      parallax: { translateX: ['20%', '0'] },
    },
  });
  const palmRight3Layer = useLayer(palmRight3, 110, {
    base: {
      scale: 0.7,
      position: `90vh 0 auto auto`,
      parallax: { translateX: ['20%', '0'] },
    },
  });
  const plant1Layer = useLayer(plant1, 120, {
    base: {
      scale: 0.7,
      position: `auto auto 0 0`,
      parallax: { translateX: ['-20%', '0'], translateY: ['20%', '0'] },
    },
  });
  const plant2Layer = useLayer(plant2, 120, {
    base: {
      scale: 0.7,
      position: `auto auto 0 0`,
      parallax: { translateX: ['-70%', '0'], translateY: ['20%', '0'] },
    },
  });
  const plant3Layer = useLayer(plant3, 120, {
    base: {
      scale: 0.7,
      position: `auto auto 0 30vh`,
      parallax: { translateX: ['-70%', '200%'], translateY: ['20%', '0'] },
    },
  });
  const plant4Layer = useLayer(plant4, 120, {
    base: {
      scale: 0.7,
      position: `auto auto 0 50vh`,
      parallax: { translateX: ['-20%', '0'], translateY: ['20%', '0'] },
    },
  });
  const plant5Layer = useLayer(plant5, 120, {
    base: {
      scale: 0.7,
      position: `auto 0 0 auto`,
      parallax: { translateX: ['90%', '0'], translateY: ['-20%', '0'] },
    },
  });

  const layers: Layer[] = [
    sunLayer,
    cloudLeftLayer,
    cloudRightLayer,
    logoLayer,

    palmLeft1Layer,
    palmLeft2Layer,
    palmRight1Layer,
    palmRight2Layer,
    palmRight3Layer,

    plant1Layer,
    plant2Layer,
    plant3Layer,
    plant4Layer,
    plant5Layer,
  ];

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
