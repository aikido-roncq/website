import Spinner from './Spinner'
import styles from '@/styles/components/Map.module.scss'
import { useBoolean } from '@chakra-ui/react'

const MAP_URL = 'https://bit.ly/2C5NLLW'

const Map = () => {
  const [loading, setLoading] = useBoolean(true)

  return (
    <div className={styles.container}>
      {loading && <Spinner />}
      <iframe src={MAP_URL} className={styles.map} onLoad={setLoading.off}></iframe>
    </div>
  )
}

export default Map
