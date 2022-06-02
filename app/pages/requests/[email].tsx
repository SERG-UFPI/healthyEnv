import { useRouter } from 'next/router'
import Header from '../../components/Header'
import styles from '../../styles/RequestsByEmail.module.css'

const RequestsByEmail = () => {
  const router = useRouter()

  return (
    <>
      <Header selectedIndex={2} />
      <div className={styles.requestByEmail}>
        <div className={styles.info}>
          <span className={styles.title}>
            Acompanhar solicitações de inclusão de repositório
          </span>
          <span className={styles.subtitle}>
            {router.query.email}
          </span>
        </div>
      </div>
    </>
  );
}

export default RequestsByEmail;