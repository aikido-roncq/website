import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

const Modal = ({ isOpen, onClose, children }) => (
  <ChakraModal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      {children}
    </ModalContent>
  </ChakraModal>
);

export default Modal;
