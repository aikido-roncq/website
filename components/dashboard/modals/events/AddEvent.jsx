import { ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/modal';
import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import Modal from '@/components/Modal';
import strftime from 'strftime';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage';
import { useState } from 'react';
import { hydrateForm } from '@/utils/form';

const DATE_FORMAT = '%Y-%m-%d';

const AddEvent = ({ isOpen, onClose, submitCallback, event }) => {
  const [edit, setEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({ shouldUnregister: false, shouldFocusError: false });
  const startDate = form.watch('start_date', strftime(DATE_FORMAT));

  const onSubmit = async data => {
    setSubmitting(true);
    const posted = await submitCallback(data);
    if (posted) {
      form.reset();
    }
    setSubmitting(false);
  };

  const validateInfo = info => {
    const trimmed = info.trim();

    if (trimmed.length < 5) {
      return 'Le champ doit contenir au moins 5 caractères';
    } else if (trimmed.length > 250) {
      return 'Le champ ne peut pas dépasser 250 caractères';
    }
  };

  // Update form fields when event is updated
  useEffect(() => {
    if (event) {
      form.clearErrors();
      hydrateForm(form, event);
      setEdit(true);
    } else {
      form.reset();
      setEdit(false);
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
            isInvalid={'title' in form.errors}
            ref={form.register({
              required: { value: true, message: 'Ce champ est obligatoire' },
              minLength: { value: 3, message: 'Le titre doit être faire au moins 3 caractères' },
              maxLength: { value: 50, message: 'Le titre doit faire au plus 50 caractères' },
            })}
          />
          <ErrorMessage error={form.errors.title} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Date de début</FormLabel>
          <Input
            name="start_date"
            type="date"
            min={strftime(DATE_FORMAT)}
            ref={form.register({
              required: { value: true, message: 'Ce champ est obligatoire' },
              min: {
                value: strftime(DATE_FORMAT),
                message: 'La date de début doit être postérieure à la date actuelle',
              },
            })}
            isInvalid={'start_date' in form.errors}
          />
          <ErrorMessage error={form.errors.start_date} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Date de fin</FormLabel>
          <Input
            name="end_date"
            type="date"
            min={startDate}
            ref={form.register({
              required: { value: true, message: 'Ce champ est obligatoire' },
              min: {
                value: startDate,
                message: 'La date de fin doit être postérieure à la date de début',
              },
            })}
            isInvalid={'end_date' in form.errors}
          />
          <ErrorMessage error={form.errors.end_date} />
        </FormControl>

        <FormControl>
          <FormLabel>Informations</FormLabel>
          <Textarea
            name="info"
            placeholder="Tarifs, lieu, horaires..."
            ref={form.register({
              required: { value: true, message: 'Ce champ est obligatoire' },
              validate: validateInfo,
            })}
            isInvalid={'info' in form.errors}
          />
          <ErrorMessage error={form.errors.info} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={2} onClick={onClose}>
          Annuler
        </Button>
        <Button colorScheme="blue" onClick={form.handleSubmit(onSubmit)} isLoading={submitting}>
          {edit ? 'Éditer' : 'Ajouter'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEvent;
