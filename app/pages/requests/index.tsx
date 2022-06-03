import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import styles from '../../styles/Request.module.css'

const Requests = () => {

  const [isLoadingDatasets, setIsLoadingDatasets] = useState(true)
  const [datasetsOptions, setDatasetsOptions] = useState([])
  const [selectedDataset, setSelectedDataset] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailCheckSubmission, setEmailCheckSubmission] = useState('')
  const datasetsIdList = []
  let formData: object = {
    name: '',
    email: '',
    repo_url: ''
  }

  useEffect(() => {
    loadDatasets()
  }, [])

  const loadDatasets = async () => {
    setIsLoadingDatasets(true)
    const response = await axios.get('https://healthyenv.herokuapp.com/datasets')
    const optionList = []
    Object.keys(response.data['datasets']).forEach((key: string, index: number) => {
      datasetsIdList.push(key)
      optionList.push(
        <option value={key} key={key}>
          {Buffer.from(response.data['datasets'][key]['name'], 'utf-8').toString()}
        </option>
      )
    })
    setSelectedDataset(datasetsIdList[0])
    setDatasetsOptions([...optionList])
    setIsLoadingDatasets(false)
  }

  const submitRequest = async () => {
    setIsSubmitting(true)
    if (formData['name'].length == 0 || formData['email'].length == 0 || formData['repo_url'].length == 0) {
      alert('Preencha todas as informações para submeter um repositório.')
      setIsSubmitting(false)
      return
    }

    const response = await axios.post(
      `https://healthyenv.herokuapp.com/datasets/${selectedDataset}/request`,
      formData
    )
    if (response.status >= 200) {
      setIsSubmitted(true)
    } else {
      alert('Algo deu errado. Verifique os dados digitados e tente novamente.')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header selectedIndex={2} />
      <div className={styles.requests}>
        <div className={styles.submission}>
          <div className={styles.infoSubmit}>
            <span className={styles.title}>
              Submissão de repositório para análise
            </span>
            <span className={styles.subtitle}>
              Faça a submissão de um repositório que deseja analisar
            </span>
            <span className={styles.description}>
              Ao fazer a sumissão de um repositório GitHub para análise, você
              poderá fazer a análise dele e ainda contribui com a expansão do
              dataset do HealthyEnv, permitindo que as analises sejam ainda
              melhores.
            </span>
          </div>
          {isSubmitted ? (
            <span className={styles.successMessage}>Submissão enviada com sucesso.<br />Nós enviaremos um e-mail
              quando tudo estiver pronto.
            </span>
          ) : (
            <div className={styles.form}>
              <select
                className={styles.formInput}
                id='dataset'
                onChange={(e) => {
                  setSelectedDataset(datasetsIdList[Number(e.target.value)])
                }}
              >
                {datasetsOptions}
              </select>
              <input
                placeholder='Seu nome'
                className={styles.formInput}
                onChange={(e) => formData['name'] = e.target.value} />
              <input
                placeholder='E-mail para contato'
                type='email' className={styles.formInput}
                onChange={(e) => formData['email'] = e.target.value} />
              <input
                placeholder='URL do repositório'
                className={styles.formInput}
                onChange={(e) => formData['repo_url'] = e.target.value} />
              <div
                className={styles.button}
                onClick={() => {
                  submitRequest()
                }}
                style={{
                  cursor: !isSubmitting ? 'pointer' : 'wait',
                  backgroundColor: !isSubmitting ? '#111111' : '#333333'
                }}
              >
                <span>{!isSubmitting ? 'Submeter' : 'Submetendo...'}</span>
              </div>
            </div>
          )
          }
        </div>
        <div className={styles.checkSubmission}>
          <div className={styles.infoCheckSubmit}>
            <span className={styles.title}>
              Verificar andamento de solicitações
            </span>
            <span className={styles.subtitle}>
              Consulte o andamento de suas solicitações através do e-mail
              utilizado na submissão
            </span>
          </div>
          <div className={styles.formCheckSubmission}>
            <input placeholder='E-mail' type='email' className={styles.formInput}
              onChange={(e) => {
                setEmailCheckSubmission(e.target.value)
                console.log(emailCheckSubmission)
              }} />
            <div className={styles.button}>
              <Link href={`/requests/${emailCheckSubmission}`}>
                <a>Verificar solicitações</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Requests;