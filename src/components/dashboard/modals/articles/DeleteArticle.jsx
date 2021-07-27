import { Button, ModalBody, ModalFooter, ModalHeader, useToast } from '@chakra-ui/react';
import Modal from '@/components/Modal';

const DeleteArticle = ({ isOpen, onClose, onConfirm, article }) => {
  const toast = useToast();

  if (!article) {
    return null;
  }

  const handleDelete = async () => {
    const deleted = await onConfirm(article);
    if (deleted) {
      onClose();
      toast({
        title: 'Article supprimé',
        description: `L'article a été supprimé avec succès !`,
        status: 'success',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Article non supprimé',
        description: "Une erreur est survenue lors de la suppression de l'article.",
        status: 'error',
        isClosable: true,
      });
    }
  };

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
        <Button colorScheme="red" onClick={handleDelete}>
          Supprimer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteArticle;
