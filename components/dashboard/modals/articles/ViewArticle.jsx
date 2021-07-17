import { ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import Modal from '@/components/Modal'
import Article from '@/components/Article'

const ViewArticle = ({ isOpen, onClose, article }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalHeader>Voir l'article</ModalHeader>
    <ModalBody>
      <Article {...article} />
    </ModalBody>
    <ModalFooter>
      <Button variant="ghost" onClick={onClose}>
        Fermer
      </Button>
    </ModalFooter>
  </Modal>
)

export default ViewArticle
