import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../styles/ChangeRepoModal.module.css'
import RepoListItemSimple from "./RepoListItemSimple";
import { Dots } from 'react-activity'
import "react-activity/dist/Dots.css";
import Constants from "../utils/constants";

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
    const response = await axios.get(`${Constants.baseUrl}/datasets/${dataset_id}/repos`)
    const reposList = []

    // Object.keys(response.data.repositories).forEach((repoKey: string) => {
    response.data.items.forEach((repo) => {
      reposList.push({
        id: repo['id'],
        name: repo['name'],
        language: repo['language'],
        loc: repo['loc'],
        stars: repo['stars'],
        forks: repo['forks'],
        open_issues: repo['open_issues'],
        contributors: repo['contributors'],
        commits: repo['commits'],
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
          <span className={styles.title}>Change repository</span>
          <span>Select a repository to analyze:</span>
          <input className={styles.input} placeholder='Filter repositories'
            onChange={(e) => {
              setDisplayingRepos(
                repos.filter((repo) => repo['name'].toLowerCase().includes(e.target.value.toLowerCase()))
              )
            }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={() => props.closeModal()}>
            Cancel
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
              }}>Loading repositories...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangeRepoModal;