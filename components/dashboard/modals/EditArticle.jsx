import { ModalBody, ModalHeader, ModalFooter } from '@chakra-ui/modal'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'
import Modal from '@/components/Modal'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Spinner from '@/components/Spinner'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

const EditArticle = ({ isOpen, onClose, onSubmit, article }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)

    await onSubmit({ ...article, title, content })

    setSubmitting(false)
  }

  useEffect(() => {
    setTitle(article?.title || '')
    setContent(article?.content || '')
  }, [article])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Éditer un article</ModalHeader>
      <ModalBody>
        {loading && <Spinner />}
        <div hidden={loading}>
          <FormControl mb={4}>
            <FormLabel>Titre</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Rentrée, Reprise des cours..."
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contenu</FormLabel>
            <Editor
              value={content}
              onChange={setContent}
              onReady={() => setLoading(false)}
            />
          </FormControl>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={2} onClick={onClose}>
          Annuler
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit} isLoading={submitting}>
          Valider
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditArticle
