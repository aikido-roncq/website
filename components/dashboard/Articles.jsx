import {
  Tooltip,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DeleteArticle from './modals/DeleteArticle'

const Articles = () => {
  const [currentArticle, setCurrentArticle] = useState(null)
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [articles, setArticles] = useState([])
  const toast = useToast()

  useEffect(() => {
    axios.get('/articles').then((res) => setArticles(res.data))
  }, [])

  const deleteArticle = () => {
    axios
      .delete(`/articles/${currentArticle.slug}`, { admin: true })
      .then(() => {
        setArticles((oldArticles) =>
          oldArticles.filter((article) => article.slug != currentArticle.slug),
        )
        toast({
          title: 'Article supprimé',
          description: "L'article a été supprimé avec succès !",
          status: 'success',
          isClosable: true,
        })
      })
      .catch((e) => {
        toast({
          title: 'Article non supprimé',
          description: "Une erreur est survenue lors de la suppression de l'article.",
          status: 'error',
          isClosable: true,
        })
        console.error(e)
      })
    onClose()
  }

  return (
    <>
      <Heading as="h2" size="lg" mb={4}>
        📰 Articles
      </Heading>
      <Button>
        <AddIcon mr={3} /> Ajouter un article
      </Button>
      <Table>
        <Tbody>
          {articles.map((article) => (
            <Tr key={article.slug}>
              <Td>{article.title}</Td>
              <Td>
                <Tooltip hasArrow label="Éditer">
                  <Button mr={3}>
                    <EditIcon />
                  </Button>
                </Tooltip>
                <Tooltip hasArrow label="Supprimer">
                  <Button
                    onClick={() => {
                      setCurrentArticle(article)
                      onOpen()
                    }}
                    colorScheme="red"
                  >
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <DeleteArticle
        onConfirm={deleteArticle}
        isOpen={isOpen}
        onClose={onClose}
        article={currentArticle}
      />
    </>
  )
}

export default Articles
