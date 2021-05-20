import { useState } from 'react'
import Spinner from './Spinner'
import styles from '@/styles/components/Map.module.scss'

const MAP_URL = 'https://bit.ly/2C5NLLW'

const Map = () => {
  const [loading, setLoading] = useState(true)

  const handleLoad = () => setLoading(false)

  return (
    <div className={styles.container}>
      {loading && <Spinner />}
      <iframe src={MAP_URL} className={styles.map} onLoad={handleLoad}></iframe>
    </div>
  )
}

export default Map
