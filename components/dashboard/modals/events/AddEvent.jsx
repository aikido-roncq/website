import { ModalBody, ModalHeader, ModalFooter } from '@chakra-ui/modal'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useBoolean,
} from '@chakra-ui/react'
import Modal from '@/components/Modal'
import strftime from 'strftime'
import { useState } from 'react'
import { useEffect } from 'react'

const DATE_FORMAT = '%Y-%m-%d'

const AddEvent = ({ isOpen, onClose, submitCallback, edit, event }) => {
  const [submitting, setSubmitting] = useBoolean(false)
  const [data, setData] = useState(edit ? event : {})

  const handleSubmit = async () => {
    setSubmitting.on()

    const posted = await submitCallback(data)

    if (posted) {
      setData({})
    }

    setSubmitting.off()
  }

  const handleInputChange = (input) => {
    return (e) => {
      setData((oldData) => ({ ...oldData, [input]: e.target.value }))
    }
  }

  useEffect(() => {
    setData(edit ? event : {})
  }, [edit, event])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{edit ? 'Éditer' : 'Ajouter'} un événement</ModalHeader>
      <ModalBody>
        <FormControl mb={4}>
          <FormLabel>Titre</FormLabel>
          <Input
            value={data.title || ''}
            onChange={handleInputChange('title')}
            placeholder="Stage à la mer, passage de grades..."
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Date de début</FormLabel>
          <Input
            value={data.start_date || ''}
            onChange={handleInputChange('start_date')}
            type="date"
            min={strftime(DATE_FORMAT)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Date de fin</FormLabel>
          <Input
            value={data.end_date || ''}
            onChange={handleInputChange('end_date')}
            type="date"
            min={strftime(DATE_FORMAT)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Informations</FormLabel>
          <Textarea
            value={data.info || ''}
            onChange={handleInputChange('info')}
            placeholder="Tarifs, lieu, horaires..."
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={2} onClick={onClose}>
          Annuler
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit} isLoading={submitting}>
          {edit ? 'Éditer' : 'Ajouter'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AddEvent
