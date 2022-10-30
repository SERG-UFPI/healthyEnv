import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../../styles/Datasets.module.css'
import RepoListItem from '../../../components/RepoListItem'
import { Dots } from 'react-activity'
import Head from 'next/head'
import Constants from '../../../utils/constants'
import DashboardHeader from '../../../components/DashboardHeader'
import "react-activity/dist/Dots.css";
import Router, { useRouter } from 'next/router'

const Datasets = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(true)
  const [repos, setRepos] = useState([])
  const [displayingRepos, setDisplayingRepos] = useState([])
  const [datasetsOptions, setDatasetsOptions] = useState([])
  const [selectedDataset, setSelectedDataset] = useState()
  const [nValue, setNValue] = useState(1)
  // const [datasets, setDatasets] = useState({})
  // const [datasetRepoCount, setDatasetRepoCount] = useState(0)

  const datasetsIdList = []

  useEffect(() => {
    // verifyAuth()
    loadDatasets().then(() => loadRepos(datasetsIdList[0]))
  }, [])

  // function verifyAuth() {
  //   const data = JSON.parse(localStorage.getItem('userData'))

  //   if (data == undefined) {
  //     Router.push(`/auth?next=${router.asPath}`)
  //   } else {
  //     if ((Date.now() - data['timestamp']) > 86400000) {
  //       Router.push(`/auth?next=${router.asPath}`)
  //     }
  //   }
  // }

  async function loadDatasets() {
    setIsLoadingDatasets(true)
    const response = await axios.get(`${Constants.baseUrl}/datasets`)
    // setDatasets(response.data)
    const optionList = []

    response.data.items.forEach((dataset: object, index: number) => {
      datasetsIdList.push(dataset['id'])
      if (index == 0) {
        // setDatasetRepoCount(dataset['repo_count'])
      }
      optionList.push(
        <option value={dataset['id']} key={dataset['id']}>
          {Buffer.from(dataset['name'], 'utf-8').toString()}
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

  async function loadRepos(dataset_id: string) {
    setIsLoading(true)
    const response = await axios.get(`${Constants.baseUrl}/datasets/${dataset_id}/repos`)

    // setDatasetRepoCount(response.data['total_count'])
    setNValue(Math.round(response.data['total_count'] / 10))
    setRepos(response.data.items)
    setDisplayingRepos(response.data.items)
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>HealthyEnv - Datasets e análise</title>
      </Head>
      <DashboardHeader selectedIndex={1} />
      <div className={styles.container}>
        <div className={styles.infoTop}>
          <span className={styles.title}>
            Repository analysis
          </span>
          <span className={styles.subtitle}>
            Analyze the health of a repository based on similar repositories
          </span>
          <span className={styles.description}>
            Using a method similar to unsupervised Machine Learning algorithms, HealthyEnv obtains a
            group of repositories similar to the one selected for analysis and shows how their
            metrics are doing based on reference values formed by the metrics of these similar ones.
          </span>

          {!isLoadingDatasets
            ? <div className={styles['repo-list-top']}>
              <div className={styles['dataset-n']}>
                <div className={styles['datasetInput']}>
                  {/* <label htmlFor='dataset' className={styles.labels}>Dataset </label> */}
                  <select
                    className={styles.inputs}
                    id='dataset'
                    onChange={(e) => {
                      console.log(datasetsIdList[Number(e.target.value)])
                      setSelectedDataset(datasetsIdList[Number(e.target.value)])
                      loadRepos(datasetsIdList[Number(e.target.value)])
                    }}
                    style={{ padding: '7px 5px', width: '100%' }}
                  >
                    {datasetsOptions}
                  </select>
                </div>
              </div>
              <div className={styles['inputs-container']}>
                {/* <label htmlFor='search' className={styles.labels}>Filtrar </label> */}
                <input
                  type='text'
                  id='search'
                  placeholder='Filter repositories'
                  className={styles.inputs}
                  onChange={(e) => {
                    setDisplayingRepos(
                      repos.filter((repo) => repo['name'].toLowerCase().includes(e.target.value.toLowerCase()))
                    )
                  }} />
              </div>
            </div>
            : (
              <div className={styles.loading}>
                <Dots color='#000000' size={18} speed={1} animating={true} />
                <span style={{
                  fontSize: 14
                }}>Loading datasets...</span>
              </div>
            )
          }
        </div>
        {!isLoading
          ? <div className={styles['repo-list']}>
            {displayingRepos.map((repo, index) => {
              return (<RepoListItem key={repo['name']} repo={repo} datasetId={selectedDataset} getNValue={getNValue} />)
            })}
          </div>
          : (
            <div className={styles.loading}>
              <Dots color='#000000' size={18} speed={1} animating={true} />
              <span style={{
                fontSize: 14
              }}>Loading repositories...</span>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Datasets