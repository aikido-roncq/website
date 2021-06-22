import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import styles from '@/styles/components/Image.module.scss'
import Spinner from './Spinner'

const Image = ({ src, caption, onError, ...other }) => {
  const [loading, setLoading] = useState(true)
  const [opacity, setOpacity] = useState(0)
  const image = useRef()

  useEffect(() => {
    setOpacity(loading ? 0 : 1)
  }, [loading])

  useEffect(() => {
    if (image.current.complete) setLoading(false)
  }, [])

  return (
    <figure {...other} className={classNames(styles.figure, other.className)}>
      <img
        src={src}
        onLoad={() => setLoading(false)}
        style={{ opacity }}
        ref={image}
        onError={onError}
      />
      {caption && <figcaption>{caption}</figcaption>}
      {loading && <Spinner />}
    </figure>
  )
}

export default Image
