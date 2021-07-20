import { ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/modal';
import { Button, FormControl, FormLabel, Input, Textarea, useBoolean } from '@chakra-ui/react';
import Modal from '@/components/Modal';
import strftime from 'strftime';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const DATE_FORMAT = '%Y-%m-%d';

const AddEvent = ({ isOpen, onClose, submitCallback, event }) => {
  const [edit, setEdit] = useBoolean(event != null);
  const [submitting, setSubmitting] = useBoolean(false);
  const { register, reset, handleSubmit, watch, setValue } = useForm({ shouldUnregister: false });
  const startDate = watch('start_date', strftime(DATE_FORMAT));

  const onSubmit = async data => {
    setSubmitting.on();
    const posted = await submitCallback(data);
    if (posted) {
      reset();
    }
    setSubmitting.off();
  };

  useEffect(() => {
    if (event) {
      setEdit.on();
      Object.entries(event).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      setEdit.off();
    }
  }, [event]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{edit ? 'Éditer' : 'Ajouter'} un événement</ModalHeader>
      <ModalBody>
        <FormControl mb={4}>
          <FormLabel>Titre</FormLabel>
          <Input
            name="title"
            placeholder="Stage à la mer, passage de grades..."
            ref={register}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Date de début</FormLabel>
          <Input
            name="start_date"
            type="date"
            min={strftime(DATE_FORMAT)}
            ref={register}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Date de fin</FormLabel>
          <Input name="end_date" type="date" min={startDate} ref={register} required />
        </FormControl>
        <FormControl>
          <FormLabel>Informations</FormLabel>
          <Textarea name="info" placeholder="Tarifs, lieu, horaires..." ref={register} required />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={2} onClick={onClose}>
          Annuler
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit(onSubmit)} isLoading={submitting}>
          {edit ? 'Éditer' : 'Ajouter'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEvent;
