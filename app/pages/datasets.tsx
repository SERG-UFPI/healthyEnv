import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Datasets.module.css'
import RepoListItem from '../components/RepoListItem'
import Header from '../components/Header'
import { Dots } from 'react-activity'
import "react-activity/dist/Dots.css";
import Head from 'next/head'

const Datasets = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(true)
  const [repos, setRepos] = useState({})
  const [datasets, setDatasets] = useState({})
  const [datasetsOptions, setDatasetsOptions] = useState([])
  const [datasetRepoCount, setDatasetRepoCount] = useState(0)
  const [selectedDataset, setSelectedDataset] = useState()
  const [nValue, setNValue] = useState(1)
  const datasetsIdList = []

  useEffect(() => {
    loadDatasets().then(() => loadRepos(datasetsIdList[0]))
  }, [])

  const loadDatasets = async () => {
    setIsLoadingDatasets(true)
    const response = await axios.get('https://healthyenv.herokuapp.com/datasets')
    setDatasets(response.data)
    const optionList = []
    Object.keys(response.data['datasets']).forEach((key: string, index: number) => {
      datasetsIdList.push(key)
      if (index == 0) {
        setDatasetRepoCount(response.data['datasets'][key]['repo_count'])
      }
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

  const getNValue = () => {
    return nValue
  }

  const loadRepos = async (dataset_id: string) => {
    setIsLoading(true)
    const response = await axios.get(`https://healthyenv.herokuapp.com/datasets/${dataset_id}/repos`)

    Object.keys(response.data)

    setDatasetRepoCount(response.data['repository_count'])
    setNValue(Math.round(response.data['repository_count'] / 10))
    setRepos(response.data['repositories'])
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>HealthyEnv - Datasets e análise</title>
      </Head>
      <Header selectedIndex={1} />
      <div className={styles.container}>
        <span className={styles.title}>
          Datasets e análise
        </span>
        <span className={styles.subtitle}>
          Faça a análise da saúde de um repositório baseando-se em repositórios semelhantes
        </span>
        <span className={styles.description}>
          Utilizando um método semelhante a algoritmos de Aprendizado de Máquina não supervisionado,
          o HealthyEnv obtém um grupo de repositórios semelhantes ao selecionado para análise
          e mostra como estão suas métricas baseando-se em valores de referência formados pelas
          métricas de tais semelhantes.
        </span>
        {!isLoadingDatasets
          ? <div className={styles['repo-list-top']}>
            <div className={styles['dataset-n']}>
              <div className={styles['inputs-container']} style={{ paddingRight: '20px' }}>
                {/* <label htmlFor='dataset' className={styles.labels}>Dataset </label> */}
                <select
                  className={styles.inputs}
                  id='dataset'
                  onChange={(e) => {
                    console.log(datasetsIdList[Number(e.target.value)])
                    setSelectedDataset(datasetsIdList[Number(e.target.value)])
                    loadRepos(datasetsIdList[Number(e.target.value)])
                  }}
                  style={{ padding: '7px 5px', width: 450 }}
                >
                  {datasetsOptions}
                </select>
              </div>
            </div>
            <div className={styles['inputs-container']}>
              {/* <label htmlFor='search' className={styles.labels}>Filtrar </label> */}
              <input type='text' id='search' placeholder='Filtrar repositórios deste dataset...' className={styles.inputs} style={{ width: 300 }} />
            </div>
          </div>
          : (
            <div className={styles.loading}>
              <Dots color='#000000' size={18} speed={1} animating={true} />
              <span style={{
                fontSize: 14
              }}>Carregando datasets...</span>
            </div>
          )
        }
        {!isLoading
          ? <div className={styles['repo-list']}>
            {Object.keys(repos).map((key, index) => {
              return (<RepoListItem key={repos[key]['name']} repo={repos[key]} datasetId={selectedDataset} getNValue={getNValue} />)
            })}
          </div>
          : (
            <div className={styles.loading}>
              <Dots color='#000000' size={18} speed={1} animating={true} />
              <span style={{
                fontSize: 14
              }}>Carregando repositórios...</span>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Datasets