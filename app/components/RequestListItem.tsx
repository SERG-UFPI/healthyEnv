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
      return 'Received'
    case 'IN_PROGRESS':
      return 'In progress'
    case 'DONE':
      return 'Done'
    default:
      return 'Unknown status'
  }
}

const RequestListItem = (props: RequestListItemProps) => {
  return (
    <>
      <div className={styles.requestListItem}>
        <div className={styles.info}>
          {/* <div className={styles.nameAndEmail}>
            <span className={styles.name}>{props.name}</span>
            <span>•</span>
            <span className={styles.email}>{props.email}</span>
          </div> */}
          <span className={styles.url}>{props.url.split('/')[props.url.split('/').length - 1]}</span>
        </div>
        <div className={styles.status}>{translateStatus(props.status)}</div>
      </div>
      {/* <Divider /> */}
    </>
  );
}

export default RequestListItem;