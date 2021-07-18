import Head from '@/components/layouts/Head'
import Articles from './Articles'
import Events from './Events'
import Header from './Header'
import { Tab, TabPanels, TabPanel, Tabs, TabList, Box } from '@chakra-ui/react'

const Dashboard = () => (
  <>
    <Head title="Tableau de bord" />

    <Box p={5}>
      <Header />
      <Tabs variant="soft-rounded" align="center">
        <TabList>
          <Tab>Articles</Tab>
          <Tab>Événements</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Articles />
          </TabPanel>
          <TabPanel>
            <Events />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </>
)

export default Dashboard
