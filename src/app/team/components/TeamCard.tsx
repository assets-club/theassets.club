'use client';

import Image, { StaticImageData } from 'next/image';
import { BsGithub, BsGlobe, BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaArtstation } from 'react-icons/fa';
import { FC } from 'react';
import { Box, BoxProps, Heading, Link, Text } from '@chakra-ui/react';

export interface TeamCardProps extends BoxProps {
  image: StaticImageData;
  size?: 'md' | 'sm';
  name: string;
  title: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  artstation?: string;
  website?: string;
}

const TeamCard: FC<TeamCardProps> = ({
  image,
  size = 'md',
  name,
  title,
  twitter,
  instagram,
  github,
  artstation,
  website,
  ...rest
}) => {
  return (
    <Box color="gray2.400" bgColor="white" borderRadius={16} overflow="hidden" {...rest}>
      <Image src={image} alt={`${name}'s profile picture`} width={512} />

      <Box my={2} px={4}>
        <Heading fontSize={size == 'sm' ? 'lg' : 'xl'}>{name}</Heading>
        <Heading fontSize={size == 'sm' ? 'xs' : 'sm'} fontWeight={300}>
          {title}
        </Heading>
      </Box>

      <Box my={2} px={4}>
        {twitter && (
          <Text fontSize={size == 'sm' ? 'xs' : 'sm'}>
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
          </Text>
        )}
        {instagram && (
          <Text fontSize={size == 'sm' ? 'xs' : 'sm'}>
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
          </Text>
        )}
        {github && (
          <Text fontSize={size == 'sm' ? 'xs' : 'sm'}>
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
          </Text>
        )}
        {artstation && (
          <Text fontSize={size == 'sm' ? 'xs' : 'sm'}>
            <Link
              href={`https://www.artstation.com/${artstation}`}
              isExternal
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                ':hover': { textDecoration: 'none', color: 'black' },
              }}
            >
              <FaArtstation /> {artstation}
            </Link>
          </Text>
        )}
        {website && (
          <Text fontSize={size == 'sm' ? 'xs' : 'sm'}>
            <Link
              href={website}
              isExternal
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                ':hover': { textDecoration: 'none', color: 'black' },
              }}
            >
              <BsGlobe /> Website
            </Link>
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default TeamCard;
