import { Button, ModalBody, ModalFooter, ModalHeader, useToast } from '@chakra-ui/react';
import Modal from '@/components/Modal';

const DeleteEvent = ({ isOpen, onClose, onConfirm, event }) => {
  const toast = useToast();

  if (!event) {
    return null;
  }

  const handleDelete = async () => {
    const deleted = await onConfirm(event);
    if (deleted) {
      onClose();
      toast({
        title: 'Événement supprimé',
        description: `L'événement a été supprimé avec succès !`,
        status: 'success',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Événement non supprimé',
        description: `Une erreur est survenue lors de la suppression de l'événément.`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Supprimer cet événement?</ModalHeader>
      <ModalBody>
        L'événement "{event.title}" sera définitivement supprimé. Cette action est irréversible.
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

export default DeleteEvent;
