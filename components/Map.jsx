import Spinner from './Spinner';
import styles from '@/styles/components/Map.module.scss';
import { useBoolean } from '@chakra-ui/react';
import { MAP_URL } from '@/utils/constants';

const Map = () => {
  const [loading, setLoading] = useBoolean(true);

  return (
    <div className={styles.container}>
      {loading && <Spinner />}
      <iframe src={MAP_URL} className={styles.map} onLoad={setLoading.off} />
    </div>
  );
};

export default Map;
