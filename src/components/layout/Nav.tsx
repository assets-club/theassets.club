import NextLink from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { FC, useRef } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FlexProps,
  IconButton,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import useScrollToMint from '../../lib/hooks/useScrollToMint';
import shortAddress from '../../utils/shortAddress';
import ConnectModal from '../ConnectModal';
import Placeholder from '../Placeholder';

const sections = [
  // { text: 'team', href: '#team' },
  // { text: 'faq', href: '#faq' },
  { text: 'twitter', href: 'https://twitter.com/theassetsclub' },
  // { text: 'opensea', href: 'https://opensea.io/collection/theassetsclub' },
];

interface NavPropsProps extends FlexProps {}

const Nav: FC<NavPropsProps> = (props) => {
  // Menu base on Chakra Drawer
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const btnRef = useRef(null);
  const scroll = useScrollToMint();
  const handlers = useSwipeable({
    onSwipedRight: onMenuClose,
  });

  const { isOpen: isConnectOpen, onOpen: onConnectOpen, onClose: onConnectClose } = useDisclosure();
  const { account } = useWeb3React();

  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        justifyContent="end"
        py={{ base: 2, md: 8 }}
        px={{ base: 4, md: 32 }}
        {...props}
      >
        {/*<Placeholder width={250} height={80} text="logo" />*/}

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

              <DrawerHeader>{/*<Placeholder width={250} height={80} text="logo" />*/}</DrawerHeader>

              <DrawerBody>
                <Flex direction="column" mb={6}>
                  {sections.map(({ text, href }) => {
                    return (
                      <Text key={href} borderBottom="solid 1px" borderBottomColor="gray.200">
                        <NextLink href={href} passHref>
                          <Link isExternal={href.startsWith('http')} display="block" py={4}>
                            {text}
                          </Link>
                        </NextLink>
                      </Text>
                    );
                  })}
                </Flex>

                {!account ? <Button onClick={onConnectOpen}>connect</Button> : <Button>{shortAddress(account)}</Button>}
              </DrawerBody>
            </DrawerContent>
          </div>
        </Drawer>

        <Flex display={{ base: 'none', md: 'flex' }} as="nav" gap={16} alignItems="center">
          <Text cursor="pointer" onClick={scroll}>
            mint
          </Text>
          {sections.map(({ text, href }) => {
            return (
              <Text key={href}>
                <NextLink href={href} passHref>
                  <Link isExternal={href.startsWith('http')}>{text}</Link>
                </NextLink>
              </Text>
            );
          })}
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
