import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/modal'
import { Button } from '@chakra-ui/button'

const DeleteArticle = ({ isOpen, onClose, onConfirm, article }) => {
  if (!article) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Supprimer cet article?</ModalHeader>
        <ModalBody>
          L'article "{article.title}" sera définitivement supprimé. Cette action est
          irréversible.
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={2} onClick={onClose}>
            Annuler
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            Supprimer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteArticle
