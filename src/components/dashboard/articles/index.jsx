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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import DeleteArticle from './modals/DeleteArticle';
import AddArticle from './modals/AddArticle';
import ViewArticle from './modals/ViewArticle';
import Actions from '../Actions';
import { relativeDateString } from '@/utils/date';
import ArticleService from '@/services/article.service';

const Articles = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [currentArticle, setCurrentArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  const addArticleModal = useDisclosure();
  const viewArticleModal = useDisclosure();
  const deleteArticleModal = useDisclosure();

  useEffect(() => {
    ArticleService.getArticles().then(setArticles);
  }, []);

  const handleClick = (article, modal) => {
    setCurrentArticle(article);
    modal.onOpen();
  };

  const addArticle = async article => {
    let newArticle;

    try {
      newArticle = await ArticleService.postArticle(article);
    } catch {
      return false;
    }

    setArticles(oldArticles => [newArticle, ...oldArticles]);
    return true;
  };

  const editArticle = async article => {
    let updatedArticle;

    try {
      updatedArticle = await ArticleService.editArticle(article);
    } catch {
      return false;
    }

    const articleIndex = articles.findIndex(a => a.id === updatedArticle.id);
    const newArticles = [...articles];
    newArticles[articleIndex] = updatedArticle;

    setArticles(newArticles);
    return true;
  };

  const deleteArticle = async article => {
    try {
      await ArticleService.deleteArticle(article);
    } catch {
      return false;
    }

    setArticles(oldArticles => oldArticles.filter(a => a.id !== article.id));
    return true;
  };

  return (
    <Box>
      <Flex alignItems="baseline" direction={isDesktop ? 'row' : 'column'}>
        <Heading as="h2" size="lg" mb={4} mr={4}>
          📰 Articles
        </Heading>
        <Button onClick={() => handleClick(null, addArticleModal)} mb={2}>
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
