import Image from 'next/image';
import { BiMinus, BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { FC, MouseEventHandler, useCallback, useRef, useState } from 'react';
import { Box, BoxProps, Flex, IconButton, keyframes, Link, Text } from '@chakra-ui/react';
import album from '../../public/images/sound.png';
import music1 from '../../public/music/01 Jay Fase - Voices In My Head (Original Mix).mp3';
import music2 from '../../public/music/02 Jay Fase - Time (Inward Records).mp3';
import music3 from '../../public/music/03 Jay Fase - Nasta.mp3';
import music4 from '../../public/music/04 Cuemen, Jay Fase - Hyema (Original Mix)_Master.mp3';
import music5 from '../../public/music/05 The Doors - Riders on The Storm (Jay Fase Remix).mp3';

interface PlayerProps extends BoxProps {}

const musics = [
  {
    title: 'Voices In My Head (Original Mix)',
    artist: 'Jay Fase',
    src: music1,
  },
  {
    title: 'Time (Inward Records)',
    artist: 'Jay Fase',
    src: music2,
  },
  {
    title: 'Nasta',
    artist: 'Jay Fase',
    src: music3,
  },
  {
    title: 'Hyema (Original Mix)',
    artist: 'Cuemen, Jay Fase',
    src: music4,
  },
  {
    title: 'Riders on The Storm (Jay Fase Remix)',
    artist: 'The Doors',
    src: music5,
  },
];

const slide1 = keyframes`
  from { transform: translateX(0%); }
  to { transform: translateX(-80%); }
`;

const ratio = 3;

const Player: FC<PlayerProps> = (props) => {
  const player = useRef<HTMLAudioElement>(null);

  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState<boolean>(player.current?.paused ?? true);
  const [musicIndex, setMusicIndex] = useState(0);
  const music = musics[musicIndex];

  const handleOpen: MouseEventHandler = useCallback(
    async ($e) => {
      $e.preventDefault();
      setOpen((v) => !v);

      if (!open && player.current && player.current.paused) {
        await player.current.play();
        setPaused(player.current.paused);
      }
    },
    [open],
  );

  const handlePlay: MouseEventHandler = useCallback(async ($e) => {
    $e.preventDefault();
    if (!player.current) return;

    if (player.current.paused) {
      await player.current.play();
    } else {
      player.current.pause();
    }

    setPaused(player.current.paused);
  }, []);

  const handlePrev: MouseEventHandler = useCallback(
    async ($e) => {
      $e.preventDefault();
      if (!player.current) return;

      setMusicIndex((i) => (i - 1) % musics.length);
      player.current.load();
      if (!paused) {
        await player.current.play();
      }
    },
    [paused],
  );

  const handleNext: MouseEventHandler = useCallback(
    async ($e) => {
      $e.preventDefault();
      if (!player.current) return;

      setMusicIndex((i) => (i + 1) % musics.length);
      player.current.load();
      if (!paused) {
        await player.current.play();
      }
    },
    [paused],
  );

  return (
    <Box
      as={Link}
      href="https://soundcloud.com/jayfase"
      target="_blank"
      display="inline-block"
      mt={100}
      py="8px"
      pr="8px"
      pl="40px"
      sx={{
        '*:hover &': {
          textDecoration: 'none',
        },
      }}
      {...props}
    >
      <Flex bgColor="white" color="black" gap={2} borderRadius={8}>
        <audio ref={player}>
          <source src={music.src} type="audio/mpeg" />
        </audio>

        <Box my="-8px" ml="-40px">
          <Image
            src={album}
            alt={`${music.title} album icon`}
            width={70}
            height={70}
            style={{ borderRadius: '100%' }}
          />
        </Box>

        <Flex alignItems="end" py={1} width="20px">
          <Box w="5px" mr="3px" height="50%" bgColor="#abdef3" />
          <Box w="5px" mr="3px" height="70%" bgColor="#abdef3" />
          <Box w="5px" mr="3px" height="30%" bgColor="#abdef3" />
        </Flex>

        <Flex maxWidth={open ? 400 : 0} transition="all ease 0.5s" overflowX="hidden">
          <Flex w={200} direction="column" justifyContent="space-between" py={1}>
            <Box w="100%" overflow="hidden" whiteSpace="nowrap">
              <Flex w={`${ratio * 100}%`} animation={`${slide1} infinite ${ratio * 5}s linear`}>
                {Array.from(Array(ratio).keys()).map((i) => (
                  <Text key={i} flexGrow="1">
                    {music.title}
                  </Text>
                ))}
              </Flex>
            </Box>

            <Text fontSize="sm" color="#b7b7b7">
              {music.artist}
            </Text>
          </Flex>

          <Flex>
            <Flex color="#333333" fontSize="2xl">
              <Box as="button" onClick={handlePrev}>
                <BiSkipPrevious />
              </Box>
              <Box as="button" onClick={handlePlay}>
                {paused ? <BsPlayFill /> : <BsPauseFill />}
              </Box>
              <Box as="button" onClick={handleNext}>
                <BiSkipNext />
              </Box>
            </Flex>
          </Flex>
        </Flex>

        <IconButton
          colorScheme="player"
          color="white"
          size="sm"
          borderRadius={10000}
          aria-label="expand"
          mt="-16px"
          mr="-8px"
          onClick={handleOpen}
        >
          {!open ? <BsPlayFill /> : <BiMinus />}
        </IconButton>
      </Flex>
    </Box>
  );
};

export default Player;
