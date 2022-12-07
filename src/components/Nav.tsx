import Image from 'next/future/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useRef } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Button, Flex, FlexProps, IconButton, Link, Show, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import LogoWhite from '../../public/brand/logo.svg';
import shortAddress from '../utils/shortAddress';
import useMint from '../web3/hooks/useMint';
import ConnectModal from './ConnectModal';
import NavDrawer from './NavDrawer';
import TrailerModal from './TrailerModal';

const sections = [
  { text: 'home', href: '/' },
  { text: 'team', href: '/team' },
  { text: 'faq', href: '/faq' },
  { text: 'twitter', href: 'https://twitter.com/NonFungibleAss' },
  { text: 'discord', href: 'https://discord.gg/RKaCGfQjdP' },
  // { text: 'opensea', href: 'https://opensea.io/collection/theassetsclub' },
];

interface NavPropsProps extends FlexProps {}

const Nav: FC<NavPropsProps> = (props) => {
  const router = useRouter();
  // Menu base on Chakra Drawer
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const btnRef = useRef(null);
  const { isOpen: isConnectOpen, onOpen: onConnectOpen, onClose: onConnectClose } = useDisclosure();
  const { isOpen: isTrailerOpen, onOpen: onTrailerOpen, onClose: onTrailerClose } = useDisclosure();

  const { account } = useWeb3React();
  const toast = useToast({
    title: 'Mint coming soon!',
    status: 'info',
    duration: 3000,
  });
  const { loading: minting } = useMint();

  const handleMint = useCallback(() => {
    toast();
  }, [toast]);

  useEffect(() => {
    if (router.pathname === '/') {
      onTrailerOpen();
    }
  }, [router.pathname, onTrailerOpen]);

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
          <IconButton variant="nav" icon={<HamburgerIcon />} onClick={onMenuOpen} aria-label="Open menu" />
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
            {sections.map(({ text, href }) => (
              <Text key={href} color="white">
                <NextLink href={href} passHref>
                  <Link
                    isExternal={href.startsWith('http')}
                    fontFamily="Marker Felt, sans-serif"
                    textDecoration={router.pathname === href ? 'underline 2px' : 'none'}
                  >
                    {text}
                  </Link>
                </NextLink>
              </Text>
            ))}

            {/*<Button variant="link" fontFamily="Marker Felt, sans-serif" colorScheme="white" onClick={onTrailerOpen}>*/}
            {/*  trailer*/}
            {/*</Button>*/}

            <Button variant="nav" opacity={0.6} isLoading={minting} onClick={handleMint}>
              mint
            </Button>

            {!account ? (
              <Button variant="nav" onClick={onConnectOpen}>
                connect
              </Button>
            ) : (
              <Button variant="nav">{shortAddress(account)}</Button>
            )}
          </Flex>
        </Show>
      </Flex>

      <TrailerModal isOpen={isTrailerOpen} onClose={onTrailerClose} />
      <ConnectModal
        /** @see https://github.com/chakra-ui/chakra-ui/issues/6213#issuecomment-1216003840 */
        blockScrollOnMount={false}
        isOpen={isConnectOpen}
        onClose={onConnectClose}
      />
    </>
  );
};

export default Nav;
