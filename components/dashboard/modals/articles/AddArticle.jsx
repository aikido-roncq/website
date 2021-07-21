import { ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/modal';
import { Button, FormControl, FormLabel, Input, useBoolean } from '@chakra-ui/react';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';
import { hydrateForm } from '@/utils/form';

const HTML_CHARS = /(<[^>]+>|&\w+;)/g;

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

const AddArticle = ({ isOpen, onClose, submitCallback, article }) => {
  const [edit, setEdit] = useState(false);
  const form = useForm({ shouldUnregister: false, shouldFocusError: false });
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useBoolean(true);
  const content = form.watch('content');

  const validateContent = value => {
    const filtered = value.replaceAll(HTML_CHARS, '').trim();
    if (filtered.length < 10) {
      return 'Le contenu doit faire au moins 10 caractères';
    }
  };

  const onSubmit = async data => {
    setSubmitting(true);
    const posted = await submitCallback(data);
    if (posted) {
      form.reset();
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (article) {
      hydrateForm(form, article);
      form.setValue('title', article.title);
      setEdit(true);
    } else {
      form.reset();
      setEdit(false);
    }
  }, [article]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{edit ? 'Éditer' : 'Ajouter'} un article</ModalHeader>
      <ModalBody>
        {isLoading && <Spinner />}
        <div hidden={isLoading}>
          <FormControl mb={4}>
            <FormLabel>Titre</FormLabel>
            <Input
              name="title"
              placeholder="Rentrée, Reprise des cours..."
              isInvalid={'title' in form.errors}
              ref={form.register({
                required: { value: true, message: 'Ce champ est obligatoire' },
                minLength: { value: 5, message: 'Le titre doit faire au moins 5 caractères' },
                maxLength: { value: 50, message: 'Le titre doit faire au plus 50 caractères' },
              })}
            />
            <ErrorMessage error={form.errors.title} />
          </FormControl>
          <FormControl>
            <FormLabel>Contenu</FormLabel>
            <Editor
              data={content}
              onChange={data => form.setValue('content', data)}
              ref={form.register('content', {
                required: { value: true, message: 'Ce champ est obligatoire' },
                validate: validateContent,
              })}
              isInvalid={'content' in form.errors}
              onReady={setIsLoading.off}
            />
            <ErrorMessage error={form.errors.content} />
          </FormControl>
        </div>
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

export default AddArticle;
