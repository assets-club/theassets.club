import { FC } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  Box,
} from '@chakra-ui/react';

interface MintBoxProps extends AccordionProps {
  title: string;
  defaultOpen?: boolean;
}

const MintBox: FC<MintBoxProps> = ({ title, children, defaultOpen, ...props }) => {
  return (
    <Accordion
      color="white"
      bgColor="whiteAlpha.200"
      borderRadius="md"
      allowToggle
      defaultIndex={defaultOpen ? 0 : undefined}
      {...props}
    >
      <AccordionItem border={0}>
        <AccordionButton fontSize="xl" fontWeight={800}>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MintBox;
