import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteArticle from './modals/articles/DeleteArticle';
import AddArticle from './modals/articles/AddArticle';
import ViewArticle from './modals/articles/ViewArticle';
import Actions from './Actions';
import { relativeDateString } from '@/utils/date';

const Articles = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [currentArticle, setCurrentArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const toast = useToast();

  const addArticleModal = useDisclosure();
  const viewArticleModal = useDisclosure();
  const deleteArticleModal = useDisclosure();

  useEffect(() => {
    axios.get('/articles').then(res => setArticles(res.data));
  }, []);

  const handleClick = (article, modal) => {
    setCurrentArticle(article);
    modal.onOpen();
  };

  const addArticle = async ({ title, content }) => {
    try {
      const res = await axios.post('/articles', { title, content }, { admin: true });
      setArticles(oldArticles => [res.data, ...oldArticles]);
    } catch (e) {
      toast({
        title: 'Article non ajouté',
        description: "Une erreur est survenue lors de l'ajout de l'article.",
        status: 'error',
        isClosable: true,
      });

      return false;
    }

    addArticleModal.onClose();

    toast({
      title: 'Article ajouté',
      description: "L'article a été ajouté avec succès !",
      status: 'success',
      isClosable: true,
    });

    return true;
  };

  const editArticle = async article => {
    try {
      await axios.put(`/articles/${article.id}`, article, {
        admin: true,
      });
    } catch (e) {
      toast({
        title: 'Article non mis à jour',
        description: "Une erreur est survenue lors de la mise à jour de l'article.",
        status: 'error',
        isClosable: true,
      });

      return;
    }

    const articleIndex = articles.findIndex(a => a.id === article.id);
    const newArticles = [...articles];
    newArticles[articleIndex] = article;

    setArticles(newArticles);
    addArticleModal.onClose();

    toast({
      title: 'Article mis à jour',
      description: "L'article a été mis à jour avec succès !",
      status: 'success',
      isClosable: true,
    });
  };

  const deleteArticle = async article => {
    try {
      await axios.delete(`/articles/${article.id}`, { admin: true });
    } catch (e) {
      toast({
        title: 'Article non supprimé',
        description: "Une erreur est survenue lors de la suppression de l'article.",
        status: 'error',
        isClosable: true,
      });
      console.error(e);

      return;
    }

    setArticles(oldArticles => oldArticles.filter(a => a.id !== article.id));
    deleteArticleModal.onClose();

    toast({
      title: 'Article supprimé',
      description: "L'article a été supprimé avec succès !",
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex alignItems="baseline" direction={isDesktop ? 'row' : 'column'}>
        <Heading as="h2" size="lg" mb={4} mr={4}>
          📰 Articles
        </Heading>
        <Button onClick={addArticleModal.onOpen} mb={2}>
          <AddIcon mr={3} /> Ajouter un article
        </Button>
      </Flex>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Titre</Th>
            {isDesktop && <Th>Posté</Th>}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {articles.map(article => (
            <Tr key={article.id}>
              <Td>{article.title}</Td>
              {isDesktop && <Td>{relativeDateString(new Date(article.date))}</Td>}
              <Td>
                <Actions
                  element={article}
                  isDesktop={isDesktop}
                  callback={handleClick}
                  modals={{
                    show: viewArticleModal,
                    edit: addArticleModal,
                    delete: deleteArticleModal,
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AddArticle
        submitCallback={currentArticle ? editArticle : addArticle}
        onClose={addArticleModal.onClose}
        isOpen={addArticleModal.isOpen}
        article={currentArticle}
      />
      <ViewArticle
        isOpen={viewArticleModal.isOpen}
        onClose={viewArticleModal.onClose}
        article={currentArticle}
      />
      <DeleteArticle
        onConfirm={deleteArticle}
        isOpen={deleteArticleModal.isOpen}
        onClose={deleteArticleModal.onClose}
        article={currentArticle}
      />
    </Box>
  );
};

export default Articles;
