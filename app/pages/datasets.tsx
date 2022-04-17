import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Analyze.module.css'
import RepoListItem from '../components/RepoListItem'
import Header from '../components/Header'

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [datasets, setDatasets] = useState({})
  const [datasetsOptions, setDatasetsOptions] = useState([])
  const [selectedDataset, setSelectedDataset] = useState(1)
  const [datasetRepoCount, setDatasetRepoCount] = useState(0)
  const [nValue, setNValue] = useState<number>(1)

  useEffect(() => {
    loadDatasets().then(() => loadRepos(selectedDataset))
  }, [])

  const loadDatasets = async () => {
    const response = await axios.get('http://localhost:5000/datasets')

    setDatasets(response.data)

    const optionList = []
    Object.keys(response.data).forEach((key: string, index: number) => {
      if (index == 0) {
        setDatasetRepoCount(response.data[key]['repo_count'])
      }
      optionList.push(
        <option value={key} key={key}>
          {Buffer.from(response.data[key]['name'], 'utf-8').toString()}
        </option>
      )
    })

    setDatasetsOptions([...optionList])
  }

  const loadRepos = async (dataset_id: number) => {
    setIsLoading(true)
    const response = await axios.get(`http://localhost:5000/datasets/${dataset_id}/repos`)

    const reposItems = []
    response.data.forEach((element: any) => {
      reposItems.push(
        <RepoListItem key={element['name']} repo={element} datasetId={selectedDataset} nValue={nValue} />
      )
    });

    setIsLoading(false)
    setRepos([...reposItems])
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <span className={styles.title}>
          Analisar Repositório
        </span>
        <span className={styles.subtitle}>
          Faça a análise da saúde de um repositório baseando-se em repositórios semelhantes
        </span>

        { /* Seletor de dataset e definidor do valor de n */}
        <div className={styles['repo-list-top']}>
          <div className={styles['dataset-n']}>
            <div className={styles['inputs-container']} style={{ paddingRight: '20px' }}>
              <label htmlFor='dataset' className={styles.labels}>Dataset </label>
              <select
                className={styles.inputs}
                id='dataset'
                onChange={(e) => {
                  loadRepos(Number(e.target.value));
                  setDatasetRepoCount(datasets[e.target.value]['repo_count'])
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
                defaultValue={datasetRepoCount / 10}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (value > (datasetRepoCount - 2)) {
                    e.target.value = Number(datasetRepoCount - 2).toString()
                  }
                  console.log(value)
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
              {repos}
            </div>
        }
      </div>
    </>
  )
}