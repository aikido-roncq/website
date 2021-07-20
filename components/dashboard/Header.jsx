import { Box, Button, Grid, Heading, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ArrowBackIcon, Icon } from '@chakra-ui/icons';
import Link from '@/components/Link';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import AuthContext from '@/contexts/auth-context';

const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { logout } = useContext(AuthContext);

  return (
    <Grid templateColumns="1fr auto 1fr" alignItems="center" mb={4} gap={4}>
      <Link href="/">
        {isDesktop ? (
          <Button variant="ghost">
            <ArrowBackIcon mr={2} /> Page d'accueil
          </Button>
        ) : (
          <IconButton icon={<FiHome />} rounded={5} aria-label="Accueil" />
        )}
      </Link>
      <Heading as="h1" size="xl" my={4} textAlign="center">
        Tableau de bord
      </Heading>
      <Box onClick={logout} justifySelf="end">
        {isDesktop ? (
          <Button variant="ghost">
            <Icon as={FiLogOut} mr={2} /> Déconnexion
          </Button>
        ) : (
          <IconButton icon={<FiLogOut />} rounded={5} aria-label="Déconnexion" />
        )}
      </Box>
    </Grid>
  );
};

export default Header;
