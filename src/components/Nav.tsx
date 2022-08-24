import NextLink from 'next/link';
import { FC } from 'react';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import useScrollToMint from '../lib/hooks/useScrollToMint';
import Placeholder from './Placeholder';

const sections = [
  { text: 'team', href: '#team' },
  { text: 'faq', href: '#faq' },
  { text: 'twitter', href: 'https://twitter.com/theassetsclub' },
  { text: 'opensea', href: 'https://opensea.io/collection/theassetsclub' },
];

const Nav: FC<{ display: boolean }> = ({ display }) => {
  const scroll = useScrollToMint();

  if (!display) {
    return <Box height={48}></Box>;
  }

  return (
    <Flex as="header" alignItems="center" justifyContent="space-between" py={8} px={32}>
      <Placeholder width={250} height={80} text="logo" />

      <Flex as="nav" gap={16} alignItems="center">
        <Text onClick={scroll}>mint</Text>
        {sections.map(({ text, href }) => {
          return (
            <Text key={href}>
              <NextLink href={href} passHref>
                <Link isExternal={href.startsWith('http')}>{text}</Link>
              </NextLink>
            </Text>
          );
        })}
        <Button>connect</Button>
      </Flex>
    </Flex>
  );
};

export default Nav;
