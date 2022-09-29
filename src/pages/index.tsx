import type { NextPage } from 'next';
import Image, { StaticImageData } from 'next/future/image';
import { FullPage, Slide } from 'react-full-page';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { ComponentProps, useMemo } from 'react';
import { Box, BoxProps, Flex } from '@chakra-ui/react';
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
import bg from '../../public/background.jpg';
import Nav from '../components/Nav';
import Player from '../components/Player';
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
        z: 11,
        parallax: { translateX: ['-50%', '0'], translateY: ['-100%', '100%'] },
      },
      { img: cloud1, position: `${height * 0.3}px auto auto 0`, z: 11, parallax: { translateX: ['100%', '-100%'] } },
      {
        img: cloud2,
        scale: 0.8,
        position: `${height * 0.1}px 0 auto auto`,
        z: 11,
        parallax: { translateX: ['-100%', '100%'] },
      },

      { img: palmLeft1, position: `${height * 0.7}px auto auto 0`, z: 11, parallax: { translateX: ['-20%', '0'] } },
      { img: palmLeft2, position: `${height * 0.8}px auto auto 0`, z: 10, parallax: { translateX: ['-20%', '0'] } },
      { img: palmRight1, position: `${height * 0.7}px 0 auto auto`, z: 12, parallax: { translateX: ['20%', '0'] } },
      { img: palmRight2, position: `${height * 0.8}px 0 auto auto`, z: 11, parallax: { translateX: ['20%', '0'] } },
      { img: palmRight3, position: `${height * 0.9}px 0 auto auto`, z: 10, parallax: { translateX: ['20%', '0'] } },
      {
        img: plant1,
        scale: 0.7,
        position: `auto auto 0 0`,
        z: 11,
        parallax: { translateX: ['-20%', '0'], translateY: ['20%', '0'] },
      },
      {
        img: plant2,
        scale: 0.7,
        position: `auto auto 0 0`,
        z: 11,
        parallax: { translateX: ['-70%', '0'], translateY: ['20%', '0'] },
      },
      {
        img: plant3,
        scale: 0.7,
        position: `auto auto 0 30vh`,
        z: 11,
        parallax: { translateX: ['-70%', '200%'], translateY: ['20%', '0'] },
      },
      {
        img: plant4,
        scale: 0.7,
        position: `auto auto 0 50vh`,
        z: 11,
        parallax: { translateX: ['-20%', '0'], translateY: ['20%', '0'] },
      },
      {
        img: plant5,
        scale: 0.7,
        position: `auto 0 0 auto`,
        z: 11,
        parallax: { translateX: ['90%', '0'], translateY: ['-20%', '0'] },
      },
    ],
    [height],
  );

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
        <Nav position="fixed" top={0} left={0} right={0} zIndex={100} />
        <Player position="fixed" bottom="5vh" left="5vh" zIndex={100} />

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

        <Flex pt={height * 1.3} justifyContent="center" position="relative" zIndex={10}>
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
