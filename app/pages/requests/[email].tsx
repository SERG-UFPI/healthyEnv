import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import RequestListItem from '../../components/RequestListItem'
import styles from '../../styles/RequestsByEmail.module.css'
import { Dots } from 'react-activity'
import "react-activity/dist/Dots.css";

const RequestsByEmail = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState({})

  useEffect(() => {
    if (!router.isReady) return
    loadRequests()
  }, [router.isReady])

  const loadRequests = async () => {
    setIsLoading(true)
    const response = await axios.get(`https://healthyenv.herokuapp.com/requests/${router.query.email}`)
    if (response.status == 200) {
      setRequests(response.data['requests'])
    }
    setIsLoading(false)
  }

  const renderRequests = () => {
    const requestsList = []
    Object.keys(requests).forEach((key: string, index: number) => {
      requestsList.push(
        <RequestListItem key={key} name={requests[key]['name']} email={requests[key]['email']} url={requests[key]['repo_url']} status={requests[key]['status']} />
      )
    })

    return requestsList
  }

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
          <span className={styles.description}>
            Aqui você acompanha o status das suas solicitações. Não esqueça de verificar seu e-mail
            para maiores informações sobre sua submissão.
          </span>
        </div>
        {!isLoading
          ? Object.keys(requests).length > 0
            ? renderRequests()
            : <span>Não existem solicitações para o e-mail informado.</span>
          : (
            <div className={styles.loading}>
              <Dots color='#000000' size={18} speed={1} animating={true} />
              <span style={{
                fontSize: 14
              }}>Carregando submissões...</span>
            </div>
          )}
      </div>
    </>
  );
}

export default RequestsByEmail;