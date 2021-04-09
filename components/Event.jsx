import { useState } from 'react'
import { dateRangeToStr } from 'utils/date'
import styles from 'styles/components/Event.module.scss'

const Event = ({ title, info, start_date, end_date }) => {
  const [hidden, setHidden] = useState(true)
  const toggleHidden = () => setHidden((h) => !h)
  const dateRangeStr = dateRangeToStr(start_date, end_date)

  return (
    <div className={styles.container}>
      <div className={styles.main} onClick={toggleHidden}>
        <span title="Plus d'infos" className={styles.button}>
          {hidden ? '+' : '-'}
        </span>
        <span className={styles.title}>{title}</span>•<strong>{dateRangeStr}</strong>
      </div>
      <div className={styles.info} hidden={hidden}>
        {info}
      </div>
    </div>
  )
}

export default Event
