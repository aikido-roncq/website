import { useCallback, useState } from 'react'
import strftime from 'strftime'
import Button from './inputs/Button'
import styles from 'styles/components/Event.module.scss'

const DATE_FORMAT = '%d %b'

const makeDateStr = (startStr, endStr) => {
  const start = new Date(startStr)
  const end = new Date(endStr)

  if (!endStr) return strftime(DATE_FORMAT, start)
  else if (start.getTime() == end.getTime()) return makeDateStr(start)
  else if (start.getMonth() == end.getMonth())
    return strftime('%d', start) + '-' + makeDateStr(endStr)

  return makeDateStr(start) + ' - ' + makeDateStr(endStr)
}

const Event = ({ title, info, start_date, end_date }) => {
  const makeDateMemo = useCallback(makeDateStr, [start_date, end_date])
  const [hidden, setHidden] = useState(true)

  const toggleHidden = () => setHidden((h) => !h)

  return (
    <div className={styles.container}>
      <Button onClick={toggleHidden} title="Plus d'infos">
        +
      </Button>
      <strong>{makeDateMemo(start_date, end_date)}</strong>
      <span>{title}</span>
      <div className={styles.info} hidden={hidden}>
        {info}
      </div>
    </div>
  )
}

export default Event
