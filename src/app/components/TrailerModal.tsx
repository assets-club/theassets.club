import { FC } from 'react';
import {
  AspectRatio,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from '@chakra-ui/react';

interface TrailerModalProps extends Omit<ModalProps, 'children'> {}

const TrailerModal: FC<TrailerModalProps> = (props) => {
  return (
    <Modal size={{ base: '2xl', md: '3xl', lg: '4xl', xl: '5xl' }} isCentered {...props}>
      <ModalOverlay />

      <ModalContent bg="transparent" p={0}>
        <ModalBody position="relative" p={2}>
          <Flex justify="end" mb={2}>
            <ModalCloseButton position="static" color="white" fontSize={{ base: '16px', md: '24px' }} />
          </Flex>
          <AspectRatio ratio={16 / 9}>
            <iframe
              title="Trailer"
              src="https://www.youtube.com/embed/gsr3tseFAMI?autoplay=1&modestbranding=1"
              allowFullScreen
            />
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TrailerModal;
