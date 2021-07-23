import Head from '@/components/layouts/Head';
import Articles from './Articles';
import Events from './Events';
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
];

const Dashboard = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const { tab } = router.query;
    const index = TABS.findIndex(t => t.key === tab);
    if (index !== -1) {
      setTabIndex(index);
    }
  }, []);

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
