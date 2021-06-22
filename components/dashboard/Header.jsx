import { Grid, Button, Heading } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Link from '@/components/Link'

const Header = () => (
  <Grid templateColumns="1fr auto 1fr" alignItems="center" justifyItems="start" mb={4}>
    <Link href="/">
      <Button variant="ghost">
        <ChevronLeftIcon /> Page d'accueil
      </Button>
    </Link>
    <Heading as="h1" size="xl" my={4}>
      Tableau de bord
    </Heading>
  </Grid>
)

export default Header
