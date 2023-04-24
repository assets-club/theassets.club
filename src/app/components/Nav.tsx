'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import { FC, useEffect, useRef } from 'react';
import LogoWhite from '@/public/brand/logo.svg';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import { Button, Flex, FlexProps, IconButton, Show, Text, useDisclosure } from '@chakra-ui/react';
import TrailerModal from './TrailerModal';
import shortAddress from '../../utils/shortAddress';
import { useConnectModal } from '../providers/ConnectWalletProvider';
import NavDrawer from './NavDrawer';

const sections = [
  { children: 'home', href: '/' },
  { children: 'team', href: '/team' },
  { children: 'faq', href: '/faq' },
  { children: 'twitter', href: 'https://twitter.com/NonFungibleAss' },
  { children: 'discord', href: 'https://discord.gg/RKaCGfQjdP' },
  // { text: 'opensea', href: 'https://opensea.io/collection/theassetsclub' },
];

interface NavPropsProps extends FlexProps {}

const Nav: FC<NavPropsProps> = (props) => {
  const pathname = usePathname();
  // Menu base on Chakra Drawer
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const btnRef = useRef(null);
  const { onOpen: onConnectOpen } = useConnectModal();
  const { isOpen: isTrailerOpen, onOpen: onTrailerOpen, onClose: onTrailerClose } = useDisclosure();

  const { address } = useAccount();

  useEffect(() => {
    if (pathname === '/') {
      onTrailerOpen();
    }
  }, [pathname, onTrailerOpen]);

  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        justifyContent={{ base: 'space-between', md: 'end' }}
        py={{ base: 2, md: 4 }}
        px={{ base: 4, md: 32 }}
        gap={{ base: 8, md: 16 }}
        bgColor="rgba(0, 0, 0, 0.4)"
        {...props}
      >
        <Image src={LogoWhite} height={40} alt="TheAssetsClub logo" />

        <Show below="md">
          <IconButton icon={<HamburgerIcon />} onClick={onMenuOpen} aria-label="Open menu" />
          <NavDrawer
            finalFocusRef={btnRef}
            isOpen={isMenuOpen}
            onClose={onMenuClose}
            sections={sections}
            onConnect={onConnectOpen}
          />
        </Show>

        <Show above="md">
          <Flex as="nav" gap={16} alignItems="center">
            {sections.map(({ children, href }) => (
              <Text key={href} color="white">
                <Link
                  href={href}
                  fontFamily="Marker Felt, sans-serif"
                  textDecoration={pathname === href ? 'underline 2px' : 'none'}
                >
                  {children}
                </Link>
              </Text>
            ))}

            {/*<Button variant="link" fontFamily="Marker Felt, sans-serif" colorScheme="white" onClick={onTrailerOpen}>*/}
            {/*  trailer*/}
            {/*</Button>*/}

            <Button as={Link} href="/mint">
              mint
            </Button>

            {!address ? <Button onClick={onConnectOpen}>connect</Button> : <Button>{shortAddress(address)}</Button>}
          </Flex>
        </Show>
      </Flex>

      <TrailerModal isOpen={isTrailerOpen} onClose={onTrailerClose} />
    </>
  );
};

export default Nav;
