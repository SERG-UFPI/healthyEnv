import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Datasets.module.css'
import RepoListItem from '../components/RepoListItem'
import Header from '../components/Header'

const Datasets = () => {
  const [isLoading, setIsLoading] = useState(false)
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
  }

  const getNValue = () => {
    return nValue
  }

  const loadRepos = async (dataset_id: string) => {
    setIsLoading(true)
    const response = await axios.get(`https://healthyenv.herokuapp.com/datasets/${dataset_id}/repos`)

    Object.keys(response.data)

    setDatasetRepoCount(response.data['repository_count'])
    setNValue(response.data['repository_count'] / 10)
    setRepos(response.data['repositories'])
    setIsLoading(false)
  }

  return (
    <>
      <Header selectedIndex={1} />
      <div className={styles.container}>
        <span className={styles.title}>
          Analisar Repositório
        </span>
        <span className={styles.subtitle}>
          Faça a análise da saúde de um repositório baseando-se em repositórios semelhantes
        </span>
        <div className={styles['repo-list-top']}>
          <div className={styles['dataset-n']}>
            <div className={styles['inputs-container']} style={{ paddingRight: '20px' }}>
              <label htmlFor='dataset' className={styles.labels}>Dataset </label>
              <select
                className={styles.inputs}
                id='dataset'
                onChange={(e) => {
                  console.log(datasetsIdList[Number(e.target.value)])
                  setSelectedDataset(datasetsIdList[Number(e.target.value)])
                  loadRepos(datasetsIdList[Number(e.target.value)])
                  // setDatasetRepoCount(datasetsIdList[Number(e.target.value)]['repository_count'])
                }}
                style={{ padding: '7px 5px' }}
              >
                {datasetsOptions}
              </select>
            </div>
            <div className={styles['inputs-container']}>
              <label htmlFor='nValue' className={styles.labels}>Quantidade de repositórios próximos </label>
              <input
                className={styles.inputs}
                type='number'
                id='nValue'
                name='nValue'
                min='1'
                max={datasetRepoCount - 2}
                defaultValue={nValue}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (value > (datasetRepoCount - 2)) {
                    e.target.value = Number(datasetRepoCount - 2).toString()
                  }
                  setNValue(value)
                }}
                style={{ width: '100px' }}
              />
            </div>
          </div>
          <div className={styles['inputs-container']}>
            <label htmlFor='search' className={styles.labels}>Filtrar </label>
            <input type='text' id='search' placeholder='Nome do repositório' className={styles.inputs} />
          </div>
        </div>{
          isLoading
            ? <span>Carregando repositórios do dataset...</span>
            : <div className={styles['repo-list']}>
              {Object.keys(repos).map((key, index) => {
                return (<RepoListItem key={repos[key]['name']} repo={repos[key]} datasetId={selectedDataset} getNValue={getNValue} />)
              })}


            </div>
        }
      </div>
    </>
  )
}

export default Datasets