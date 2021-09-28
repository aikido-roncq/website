import ErrorMessage from '@/components/ErrorMessage';
import FileInput from '@/components/FileInput';
import Modal from '@/components/Modal';
import {
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddImage = ({ isOpen, onClose, submitCallback }) => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({ shouldFocusError: false });
  const toast = useToast();

  const onSubmit = async data => {
    setSubmitting(true);
    const posted = await submitCallback(data);
    if (posted) {
      form.reset();
      onClose();
      toast({
        status: 'success',
        title: 'Image ajoutée avec succès',
        isClosable: true,
      });
    } else {
      toast({
        status: 'error',
        title: 'Image non ajoutée',
        message: `Une erreur est survenue. Veuillez réessayer plus tard.`,
        isClosable: true,
      });
    }
    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Ajouter une image</ModalHeader>
      <ModalBody>
        <FormControl mb={4}>
          <FileInput
            name="image"
            label="Choisir une image"
            accept="image/*"
            ref={form.register({
              required: { value: true, message: 'Veuillez sélectionner une image' },
            })}
          />
          <ErrorMessage error={form.errors.image} />
        </FormControl>
        <FormControl>
          <FormLabel>Légende (facultative)</FormLabel>
          <Input
            name="caption"
            ref={form.register({
              minLength: { value: 5, message: 'La légende doit contenir au moins 5 caractères' },
              maxLength: { value: 150, message: 'La légende doit contenir au plus 250 caractères' },
            })}
            isInvalid={'caption' in form.errors}
          />
          <ErrorMessage error={form.errors.caption} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={2} onClick={onClose}>
          Annuler
        </Button>
        <Button colorScheme="blue" onClick={form.handleSubmit(onSubmit)} isLoading={submitting}>
          Ajouter
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddImage;
