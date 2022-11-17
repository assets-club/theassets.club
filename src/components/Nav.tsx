import NextLink from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { FC, useCallback, useRef } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FlexProps,
  IconButton,
  Link,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import shortAddress from '../utils/shortAddress';
import useMint from '../web3/hooks/useMint';
import ConnectModal from './ConnectModal';

const sections = [
  { text: 'home', href: '/' },
  { text: 'team', href: '/team' },
  { text: 'faq', href: '/faq' },
  { text: 'twitter', href: 'https://twitter.com/NonFungibleAss' },
  // { text: 'discord', href: 'https://discord.gg/RKaCGfQjdP' },
  // { text: 'opensea', href: 'https://opensea.io/collection/theassetsclub' },
];

interface NavPropsProps extends FlexProps {}

const Nav: FC<NavPropsProps> = (props) => {
  // Menu base on Chakra Drawer
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const btnRef = useRef(null);
  const handlers = useSwipeable({
    onSwipedRight: onMenuClose,
  });

  const { isOpen: isConnectOpen, onOpen: onConnectOpen, onClose: onConnectClose } = useDisclosure();
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

  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        justifyContent="end"
        py={{ base: 2, md: 4 }}
        px={{ base: 4, md: 32 }}
        gap={8}
        bgColor="rgba(0, 0, 0, 0.2)"
        color="black"
        {...props}
      >
        <Button colorScheme="gray" onClick={handleMint} isLoading={minting} opacity={0.6}>
          mint
        </Button>

        <IconButton
          variant="outline"
          display={{ md: 'none' }}
          icon={<HamburgerIcon />}
          onClick={onMenuOpen}
          aria-label="Open menu"
        />

        <Drawer placement="right" finalFocusRef={btnRef} isOpen={isMenuOpen} onClose={onMenuClose}>
          <div {...handlers}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerBody>
                <Flex direction="column" mb={6}>
                  {sections.map(({ text, href }) => (
                    <Text key={href} borderBottom="solid 1px" borderBottomColor="gray.200">
                      <NextLink href={href} passHref>
                        <Link isExternal={href.startsWith('http')} display="block" py={4}>
                          {text}
                        </Link>
                      </NextLink>
                    </Text>
                  ))}
                </Flex>

                {!account ? <Button onClick={onConnectOpen}>connect</Button> : <Button>{shortAddress(account)}</Button>}
              </DrawerBody>
            </DrawerContent>
          </div>
        </Drawer>

        <Flex display={{ base: 'none', md: 'flex' }} as="nav" gap={16} alignItems="center">
          {sections.map(({ text, href }) => (
            <Text key={href} color="white">
              <NextLink href={href} passHref>
                <Link isExternal={href.startsWith('http')}>{text}</Link>
              </NextLink>
            </Text>
          ))}
          {!account ? <Button onClick={onConnectOpen}>connect</Button> : <Button>{shortAddress(account)}</Button>}
        </Flex>
      </Flex>

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
