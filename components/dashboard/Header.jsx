import { Grid, Button, Heading, useBreakpointValue, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Link from '@/components/Link'
import { TiHome } from 'react-icons/ti'

const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true })

  return (
    <Grid
      templateColumns="1fr auto 1fr"
      alignItems="center"
      justifyItems="start"
      mb={4}
      gap={4}
    >
      <Link href="/">
        {isDesktop ? (
          <Button variant="ghost">
            <ChevronLeftIcon /> Page d'accueil
          </Button>
        ) : (
          <IconButton icon={<TiHome />} />
        )}
      </Link>
      <Heading as="h1" size="xl" my={4}>
        Tableau de bord
      </Heading>
    </Grid>
  )
}

export default Header
