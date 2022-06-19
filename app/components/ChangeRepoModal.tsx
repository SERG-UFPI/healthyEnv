import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../styles/ChangeRepoModal.module.css'
import RepoListItemSimple from "./RepoListItemSimple";
import { Dots } from 'react-activity'
import "react-activity/dist/Dots.css";

interface ChangeRepoModalProps {
  closeModal: Function
  refreshAnalysis: Function
  datasetId: string | string[]
  n: number
}

const ChangeRepoModal = (props: ChangeRepoModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [displayingRepos, setDisplayingRepos] = useState([])
  const [datasetRepoCount, setDatasetRepoCount] = useState(0)
  const [nValue, setNValue] = useState(1)

  useEffect(() => {
    loadRepos(props.datasetId)
  }, [])

  const loadRepos = async (dataset_id: string | string[]) => {
    setIsLoading(true)
    const response = await axios.get(`https://healthyenv.herokuapp.com/datasets/${dataset_id}/repos`)
    const reposList = []
    Object.keys(response.data.repositories).forEach((repoKey: string) => {
      reposList.push({
        id: repoKey,
        name: response.data['repositories'][repoKey]['name'],
        language: response.data['repositories'][repoKey]['language'],
        loc: response.data['repositories'][repoKey]['loc'],
        stars: response.data['repositories'][repoKey]['stars'],
        forks: response.data['repositories'][repoKey]['forks'],
        open_issues: response.data['repositories'][repoKey]['open_issues'],
        contributors: response.data['repositories'][repoKey]['contributors'],
        commits: response.data['repositories'][repoKey]['commits'],
      })
    })
    setDatasetRepoCount(response.data['repository_count'])
    setNValue(Math.round(response.data['repository_count'] / 10))
    setRepos([...reposList])
    setDisplayingRepos([...reposList])
    setIsLoading(false)
  }

  const getNValue = () => {
    return 10
  }

  return (
    <div className={styles.changeRepoModal}>
      <div className={styles.popupContent}>
        <div className={styles.header}>
          <span className={styles.title}>Trocar repositório</span>
          <span>Selecione o repositório que deseja analisar:</span>
          <input className={styles.input} placeholder='Filtrar repositórios...'
            onChange={(e) => {
              setDisplayingRepos(
                repos.filter((repo) => repo['name'].toLowerCase().includes(e.target.value.toLowerCase()))
              )
            }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={() => props.closeModal()}>
            Cancelar
          </button>
        </div>
        {!isLoading ? (
          <div className={styles.reposList}>
            {displayingRepos.map((repo, index) => {
              return (<RepoListItemSimple
                key={repo['name']}
                repo={repo}
                datasetId={props.datasetId}
                n={props.n}
                closeModal={props.closeModal}
                refreshAnalysis={props.refreshAnalysis} />)
            })}
          </div>
        ) : (
          <div className={styles.loadingContainer}>
            <div className={styles.loading}>
              <Dots color='#000000' size={18} speed={1} animating={true} />
              <span style={{
                fontSize: 14
              }}>Carregando repositórios...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangeRepoModal;