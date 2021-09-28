import { Button, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react';
import Modal from '@/components/Modal';
import { formatDateRange } from '@/utils/date';

const ViewArticle = ({ isOpen, onClose, event }) => {
  if (!event) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Voir l'événement</ModalHeader>
      <ModalBody>
        <h2>{event.title}</h2>
        <small>{formatDateRange(event.start_date, event.end_date)}</small>
        <p>{event.info}</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Fermer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewArticle;
