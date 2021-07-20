import { Button, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react';
import Modal from '@/components/Modal';

const DeleteArticle = ({ isOpen, onClose, onConfirm, article }) => {
  if (!article) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Supprimer cet article?</ModalHeader>
      <ModalBody>
        L'article "{article.title}" sera définitivement supprimé. Cette action est irréversible.
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={2} onClick={onClose}>
          Annuler
        </Button>
        <Button colorScheme="red" onClick={() => onConfirm(article)}>
          Supprimer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteArticle;
