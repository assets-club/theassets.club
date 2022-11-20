import NextLink from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { FC, ReactNode } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import shortAddress from '../utils/shortAddress';

interface NavDrawerProps extends Omit<DrawerProps, 'children'> {
  sections: { text: ReactNode; href: string }[];
  onConnect: () => void;
}

const NavDrawer: FC<NavDrawerProps> = ({ sections, onConnect, ...props }) => {
  const { account } = useWeb3React();
  const handlers = useSwipeable({
    onSwipedRight: props?.onClose,
  });

  return (
    <Drawer placement="right" {...props}>
      <div {...handlers}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Flex direction="column" mb={6}>
              {sections.map(({ text, href }) => (
                <Text key={href} borderBottom="solid 1px" borderBottomColor="gray.200">
                  <NextLink href={href} passHref>
                    <Link
                      isExternal={href.startsWith('http')}
                      display="block"
                      py={4}
                      fontFamily="Marker Felt, sans-serif"
                    >
                      {text}
                    </Link>
                  </NextLink>
                </Text>
              ))}
            </Flex>

            {!account ? (
              <Button variant="nav" onClick={onConnect}>
                connect
              </Button>
            ) : (
              <Button variant="nav">{shortAddress(account)}</Button>
            )}
          </DrawerBody>
        </DrawerContent>
      </div>
    </Drawer>
  );
};

export default NavDrawer;
