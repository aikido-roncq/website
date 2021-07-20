import { formatDateRange } from '@/utils/date';
import styles from '@/styles/components/Event.module.scss';
import { useBoolean } from '@chakra-ui/react';

const Event = ({ title, info, start_date, end_date }) => {
  const [hidden, setHidden] = useBoolean(true);
  const dateRangeStr = formatDateRange(start_date, end_date);

  return (
    <div className={styles.main} onClick={setHidden.toggle}>
      <span title="Plus d'infos" className={styles.button}>
        {hidden ? '+' : '-'}
      </span>
      <span className={styles.title}>{title}</span>
      <span className={styles.date}>{dateRangeStr}</span>
      <div className={styles.info} hidden={hidden}>
        {info}
      </div>
    </div>
  );
};

export default Event;
