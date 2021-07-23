import Head from '@/components/layouts/Head';
import Link from 'next/link';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <>
      <Head
        title="Page non trouvée"
        description="Désolé, la page que vous recherchez n'existe pas."
      />

      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Heading m={0}>Erreur 404</Heading>
          <Text>La page que vous recherchez n'existe pas. ☹️</Text>
          <Link href="/">
            <Button colorScheme="red">Retour à la page d'accueil</Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default NotFound;
