import styles from '../styles/RequestListItem.module.css'
import Divider from './Divider';

interface RequestListItemProps {
  name: string
  email: string
  url: string
  status: string
}

const translateStatus = (status: string) => {
  switch (status) {
    case 'RECEIVED':
      return 'Recebida'
    case 'IN_PROGRESS':
      return 'Em andamento'
    case 'DONE':
      return 'Finalizada'
    default:
      return 'Status desconhecido'
  }
}

const RequestListItem = (props: RequestListItemProps) => {
  return (
    <>
      <div className={styles.requestListItem}>
        <div className={styles.info}>
          <div className={styles.nameAndEmail}>
            <span className={styles.name}>{props.name}</span>
            <span>•</span>
            <span className={styles.email}>{props.email}</span>
          </div>
          <span className={styles.url}>{props.url}</span>
        </div>
        <div className={styles.status}>{translateStatus(props.status)}</div>
      </div>
      {/* <Divider /> */}
    </>
  );
}

export default RequestListItem;