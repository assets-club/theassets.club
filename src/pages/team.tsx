import { NextPage } from 'next';
import Image from 'next/future/image';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import adrien from '../../public/team/adrien.png';
import johann from '../../public/team/johann.png';
import kali from '../../public/team/kali.png';
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
    name: 'Johann Pélichet (Sélwat)',
    image: johann,
    title: 'Co-founder / COO / Creative Director / Film director',
    twitter: 'selwatisback',
    instagram: 'selwat',
  },
  {
    name: 'Adrien Pisler',
    image: adrien,
    title: 'Co-founder / Lead Artist / Creative Director / Illustrator',
    twitter: 'apisler',
    instagram: 'adrien.pisler',
  },
  {
    name: 'Lymnah',
    image: lymnah,
    title: 'Co-Founder / Software Engineer',
    twitter: 'Alstrice',
    github: 'Lymnah',
  },
  {
    name: 'Mathieu Bour',
    image: mathieu,
    title: 'Blockchain Software Engineer',
    twitter: 'mathieu_bour_',
    github: 'mathieu-bour',
  },
  {
    name: 'Mawuli Amuklu',
    image: mawuli,
    title: 'Artist / Illustrator',
    twitter: 'amuklumawuli',
    instagram: 'Mawulisan',
  },
  {
    name: 'Marc Mandril',
    image: marc,
    title: 'Artist / Illustrator / Professor / Art Historian',
    twitter: 'marcmandril',
    instagram: 'la_mandr',
  },
  {
    name: 'Kali Ataripsni',
    image: kali,
    title: 'Student / Apprentice',
    twitter: 'kaliataripsni',
  },
];

const TeamPage: NextPage = () => {
  return (
    <Box bg="linear-gradient(180deg, rgba(95,183,171,1) 0%, rgba(0,42,34,1) 100%)" minH="100vh">
      <Nav position="fixed" top={0} left={0} right={0} zIndex={100} />

      <Container maxW={1200} py={32}>
        <Box mb={32}>
          <Image
            src={sign}
            alt="Team on a wooden sign"
            style={{
              filter: 'drop-shadow(50px 50px 50px #222)',
            }}
          />
        </Box>

        <Container color="white" textAlign="center" my={16}>
          <HeadingMF>We are</HeadingMF>

          <Text>
            A collective of artists and engineers from Switzerland. None of us comes from BigTech. We are independent
            story tellers loaded with creativity. We are excited to bring our unique skills and creative vision to
            blockchain and NFTs. The first chapter is The Assets Club. The book is called Inspirata.
          </Text>
        </Container>

        <Flex wrap="wrap" justify="center" gap={16}>
          {members.map((props, i) => (
            <TeamCard key={i} {...props} width="calc(100% / 3 - 64px)" />
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default TeamPage;
