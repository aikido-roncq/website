import { ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/modal';
import { Button, FormControl, FormLabel, Input, useBoolean } from '@chakra-ui/react';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

const AddArticle = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useBoolean(true);

  const handleSubmit = async () => {
    setSubmitting(true);

    const posted = await onSubmit({ title, content });

    if (posted) {
      setTitle('');
      setContent('');
    }

    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Ajouter un article</ModalHeader>
      <ModalBody>
        {isLoading && <Spinner />}
        <div hidden={isLoading}>
          <FormControl mb={4}>
            <FormLabel>Titre</FormLabel>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Rentrée, Reprise des cours..."
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contenu</FormLabel>
            <Editor value={content} onChange={setContent} onReady={setIsLoading.off} />
          </FormControl>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={2} onClick={onClose}>
          Annuler
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit} isLoading={submitting}>
          Ajouter
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddArticle;
