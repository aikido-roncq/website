import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/components/Image.module.scss';
import Spinner from './Spinner';
import { useBoolean } from '@chakra-ui/react';

const Image = ({ src, caption, onError, ...other }) => {
  const [loading, setLoading] = useBoolean(true);
  const [opacity, setOpacity] = useState(0);
  const image = useRef();

  useEffect(() => {
    setOpacity(loading ? 0 : 1);
  }, [loading]);

  useEffect(() => {
    if (image.current.complete) {
      setLoading.off();
    }
  }, []);

  return (
    <figure {...other} className={classNames(styles.figure, other.className)}>
      <img
        src={src}
        onLoad={setLoading.off}
        style={{ opacity }}
        ref={image}
        alt={caption || ''}
        onError={onError}
      />
      {caption && <figcaption style={{ opacity }}>{caption}</figcaption>}
      {loading && <Spinner />}
    </figure>
  );
};

export default Image;
