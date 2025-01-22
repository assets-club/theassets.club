'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';
import { FC, useEffect, useRef } from 'react';
import MarkerFelt from '@/app/fonts/MarkerFelt';
import LogoWhite from '@/public/brand/logo.svg';
import shortAddress from '@/utils/shortAddress';
import useChain from '@/web3/hooks/useChain';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import {
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useConnectModal } from '../providers/ConnectWalletProvider';
import NavDrawer from './NavDrawer';
import TrailerModal from './TrailerModal';

const sections = [
  { children: 'home', href: '/' },
  { children: 'team', href: '/team' },
  { children: 'faq', href: '/faq' },
  { children: 'twitter', href: 'https://twitter.com/NonFungibleAss' },
  { children: 'discord', href: 'https://discord.gg/RKaCGfQjdP' },
  // { children: 'opensea', href: 'https://opensea.io/collection/theassetsclub' },
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
  const { disconnect } = useDisconnect();
  const { chain, expectedChain, shouldSwitch, switchNetwork } = useChain();

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
        justifyContent={{ base: 'space-between' }}
        py={{ base: 2, md: 4 }}
        px={{ base: 4, md: 32 }}
        gap={{ base: 8, md: 16 }}
        bgColor="blackAlpha.600"
        // position="relative"
        {...props}
      >
        <Image src={LogoWhite} height={40} alt="TheAssetsClub logo" />

        <Show below="lg">
          <HStack>
            <Button as={Link} href="/mint">
              Mint
            </Button>
            <IconButton icon={<HamburgerIcon />} onClick={onMenuOpen} aria-label="Open menu" />
            <NavDrawer
              finalFocusRef={btnRef}
              isOpen={isMenuOpen}
              onClose={onMenuClose}
              sections={sections}
              onConnect={onConnectOpen}
            />
          </HStack>
        </Show>

        <Show above="lg">
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

            {/* <Button as={Link} href="/mint">
              mint
            </Button> */}

            <Button as={Link} href="https://opensea.io/collection/theassetsclub">
              OpenSea
            </Button>

            {!address ? (
              <Button onClick={onConnectOpen}>connect</Button>
            ) : (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {shortAddress(address)}
                </MenuButton>
                <MenuList fontFamily={MarkerFelt.style.fontFamily}>
                  <MenuItem as={Link} href={`https://etherscan.io/address/${address}`} target="_blank">
                    Etherscan
                  </MenuItem>
                  <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Show>

        {shouldSwitch && (
          <Text
            position="absolute"
            inset="100% 0 auto"
            bgColor="whiteAlpha.800"
            m={0}
            py={1}
            px={{ base: 4, md: 32 }}
            textAlign="center"
          >
            TheAssetsClub is not available on {chain?.name}, please{' '}
            <Button variant="link" onClick={switchNetwork}>
              switch to {expectedChain.name}
            </Button>
          </Text>
        )}
      </Flex>

      {/* <TrailerModal isOpen={isTrailerOpen} onClose={onTrailerClose} /> */}
    </>
  );
};

export default Nav;
