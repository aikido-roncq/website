import { useForm } from 'react-hook-form';
import styles from '@/styles/components/ContactForm.module.scss';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useBoolean,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

const ContactForm = () => {
  const { register, handleSubmit, reset, errors } = useForm({ shouldFocusError: false });
  const [loading, setLoading] = useBoolean(false);

  const isInvalid = field => field in errors;

  const handleSuccess = () => {
    reset();
    Swal.fire({
      title: 'Message envoyé',
      text: 'Nous avons bien reçu votre message !',
      icon: 'success',
      confirmButtonColor: 'green',
    });
  };

  const handleError = () => {
    Swal.fire({
      title: 'Une erreur est survenue',
      icon: 'error',
      confirmButtonColor: 'red',
      text: `Veuillez réessayer plus tard. Si l'erreur persiste, contactez-nous par mail.`,
    });
  };

  const onSubmit = data => {
    setLoading.on();
    axios.post('/contact', data).then(handleSuccess).catch(handleError).finally(setLoading.off);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel mb={1}>Prénom</FormLabel>
        <Input
          name="name"
          placeholder="John"
          isInvalid={isInvalid('name')}
          ref={register({
            required: { value: true, message: 'Ce champ est obligatoire' },
            minLength: { value: 3, message: 'Votre prénom doit contenir au moins 3 caractères' },
            maxLength: { value: 50, message: 'Votre prénom ne peut pas dépasser 50 caractères' },
          })}
        />
        <ErrorMessage error={errors.name} />
      </FormControl>
      <FormControl>
        <FormLabel mb={0}>Adresse mail</FormLabel>
        <FormHelperText my={1}>Nécessaire pour votre recontacter</FormHelperText>
        <Input
          name="email"
          type="email"
          placeholder="john.doe@gmail.com"
          spellCheck={false}
          isInvalid={isInvalid('email')}
          ref={register({
            required: { value: true, message: 'Ce champ est obligatoire' },
            maxLength: { value: 50, message: '50 caractères maximum' },
          })}
        />
        <ErrorMessage error={errors.email} />
      </FormControl>
      <FormControl>
        <FormLabel mb={0}>Message</FormLabel>
        <FormHelperText my={1}>20 à 500 caractères</FormHelperText>
        <Textarea
          name="content"
          label="Message"
          minHeight={150}
          isInvalid={isInvalid('content')}
          ref={register({
            required: { value: true, message: 'Ce champ est obligatoire' },
            minLength: { value: 20, message: 'Le message doit contenir au moins 20 caractères' },
            maxLength: { value: 500, message: 'Le message doit contenir au plus 500 caractères' },
          })}
        />
        <ErrorMessage error={errors.content} />
      </FormControl>
      <Button type="submit" isLoading={loading} leftIcon={<CheckCircleIcon />} colorScheme="red">
        Envoyer
      </Button>
    </form>
  );
};

export default ContactForm;
