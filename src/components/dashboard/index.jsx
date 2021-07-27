import Head from '@/components/layouts/Head';
import Articles from './articles';
import Events from './events';
import Gallery from './gallery';
import Header from './Header';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TABS = [
  {
    key: 'articles',
    label: 'Articles',
    component: <Articles />,
  },
  {
    key: 'events',
    label: 'Événements',
    component: <Events />,
  },
  {
    key: 'gallery',
    label: 'Galerie',
    component: <Gallery />,
  },
];

const getTabIndex = router => {
  const { tab } = router.query;
  const index = TABS.findIndex(t => t.key === tab);
  return index === -1 ? 0 : index;
};

const Dashboard = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(getTabIndex(router));

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { tab: TABS[tabIndex].key },
    });
  }, [tabIndex]);

  return (
    <>
      <Head title="Tableau de bord" />

      <Box p={5}>
        <Header />
        <Tabs variant="soft-rounded" align="center" index={tabIndex} onChange={setTabIndex}>
          <TabList>
            {TABS.map(tab => (
              <Tab key={tab.key}>{tab.label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {TABS.map(tab => (
              <TabPanel key={tab.key}>{tab.component}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Dashboard;
