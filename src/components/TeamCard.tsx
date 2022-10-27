import { StaticImageData } from 'next/dist/client/future/image';
import Image from 'next/future/image';
import { BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { FC } from 'react';
import { Box, BoxProps, Heading, Link } from '@chakra-ui/react';

export interface TeamCardProps extends BoxProps {
  image: StaticImageData;
  name: string;
  title: string;
  twitter?: string;
  instagram?: string;
  github?: string;
}

const TeamCard: FC<TeamCardProps> = ({ image, name, title, twitter, instagram, github, ...rest }) => {
  return (
    <Box color="gray2.400" bgColor="white" borderRadius={16} overflow="hidden" {...rest}>
      <Image src={image} alt={`${name}'s profile picture`} width={512} />

      <Box my={2} px={4}>
        <Heading fontSize="xl">{name}</Heading>
        <Heading fontSize="sm" fontWeight={300}>
          {title}
        </Heading>
      </Box>

      <Box my={2} px={4}>
        {twitter && (
          <Link
            href={`https://twitter.com/${twitter}`}
            isExternal
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
              ':hover': { textDecoration: 'none', color: 'twitter.400' },
            }}
          >
            <BsTwitter /> @{twitter}
          </Link>
        )}
        {instagram && (
          <Link
            href={`https://instagram.com/${instagram}`}
            isExternal
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
              ':hover': { textDecoration: 'none', color: '#833AB4' },
            }}
          >
            <BsInstagram /> @{instagram}
          </Link>
        )}
        {github && (
          <Link
            href={`https://github.com/${github}`}
            isExternal
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
              ':hover': { textDecoration: 'none', color: 'black' },
            }}
          >
            <BsGithub /> {github}
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default TeamCard;
