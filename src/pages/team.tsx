import { NextPage } from 'next';
import Image from 'next/future/image';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import adrien from '../../public/team/adrien.png';
import johann from '../../public/team/johann.png';
import kali from '../../public/team/kali.png';
import leafLeft from '../../public/team/leaf-left.png';
import leafRight from '../../public/team/leaf-right.png';
import lymnah from '../../public/team/lymnah.png';
import marc from '../../public/team/marc.png';
import mathieu from '../../public/team/mathieu.png';
import mawuli from '../../public/team/mawuli.png';
import sign from '../../public/team/sign.png';
import HeadingMF from '../components/HeadingMF';
import Nav from '../components/Nav';
import TeamCard, { TeamCardProps } from '../components/TeamCard';

const members: TeamCardProps[] = [
  {
    name: 'Johann P. (Sélwat)',
    image: johann,
    title: 'Co-founder / CPO / Creative Director / Film director',
    twitter: 'selwatisback',
    instagram: 'selwat',
  },
  {
    name: 'Adrien P. (Apisler)',
    image: adrien,
    title: 'Co-founder / Lead Artist / Creative Director / Illustrator',
    twitter: 'apisler',
    instagram: 'adrien.pisler',
  },
  {
    name: 'Charly M. (Lymnah)',
    image: lymnah,
    title: 'Co-Founder / Software Engineer',
    twitter: 'Alstrice',
    github: 'Lymnah',
  },
  {
    name: 'Mathieu B. (Windyy)',
    image: mathieu,
    title: 'Blockchain Software Engineer',
    twitter: 'mathieu_bour_',
    github: 'mathieu-bour',
  },
  {
    name: 'Mawuli A.',
    image: mawuli,
    title: 'Artist / Illustrator',
    twitter: 'amuklumawuli',
    instagram: 'Mawulisan',
  },
  {
    name: 'Marc M.',
    image: marc,
    title: 'Artist / Illustrator / Professor / Art Historian',
    twitter: 'mandrilmarc',
    instagram: 'la_mandr',
  },
  {
    name: 'Kali A.',
    image: kali,
    title: 'Student / Apprentice',
    twitter: 'kaliataripsni',
  },
];

const TeamPage: NextPage = () => {
  return (
    <Box position="relative" bg="linear-gradient(180deg, rgba(95,183,171,1) 0%, rgba(0,42,34,1) 100%)" minH="100vh">
      <Nav position="fixed" top={0} left={0} right={0} zIndex={100} />

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
              blockchain and NFTs. The first chapter is The Assets Club. The book is called Inspirata.
            </Text>
          </Container>

          <Flex wrap="wrap" justify="center" gap={{ base: 8, md: 16 }}>
            {members.map((props, i) => (
              <TeamCard key={i} {...props} width={{ md: 'calc(100% / 3 - 64px)' }} />
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default TeamPage;
