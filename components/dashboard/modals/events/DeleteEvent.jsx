import { ModalBody, ModalHeader, ModalFooter } from '@chakra-ui/modal'
import { Button } from '@chakra-ui/button'
import Modal from '@/components/Modal'

const DeleteEvent = ({ isOpen, onClose, onConfirm, event }) => {
  if (!event) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Supprimer cet événement?</ModalHeader>
      <ModalBody>
        L'événement "{event.title}" sera définitivement supprimé. Cette action est
        irréversible.
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={2} onClick={onClose}>
          Annuler
        </Button>
        <Button colorScheme="red" onClick={() => onConfirm(event)}>
          Supprimer
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteEvent
