import Head from '@/components/layouts/Head'
import styles from '@/styles/Dashboard.module.scss'
import Articles from './Articles'
import { Grid, Heading } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Link from '@/components/Link'

const Dashboard = () => {
  return (
    <>
      <Head title="Tableau de bord" />
      <div className={styles.container}>
        <Grid
          templateColumns="1fr auto 1fr"
          alignItems="center"
          justifyItems="start"
          mb={4}
        >
          <Link href="/" className={styles.homeLink}>
            <ChevronLeftIcon /> Page d'accueil
          </Link>
          <Heading as="h1" size="xl" my={4}>
            Tableau de bord
          </Heading>
        </Grid>
        <div className={styles.sections}>
          <Articles />
        </div>
      </div>
    </>
  )
}

export default Dashboard
