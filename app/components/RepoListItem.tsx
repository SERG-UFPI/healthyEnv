import Chip from "./Chip"
import styles from '../styles/RepoListItem.module.css'
import React, { useContext } from 'react';

export default ({ repo, datasetId, nValue }) => {
  const convertedRepoName = repo['name'].split('/')[0] + '%2F' + repo['name'].split('/')[1]

  return (
    <a href={`datasets/${datasetId}/analyze/${convertedRepoName}?near=${nValue}`} className={styles.link}>
      <div className={styles.container}>
        <span className={styles.title}>
          {repo['name']}
        </span>
        <div className={styles['chip-list']}>
          <Chip label={repo['language']} />
          <Chip label={repo['loc'] + ' LOC'} />
          <Chip label={repo['stars'] + ' estrelas'} />
          <Chip label={repo['forks'] + ' forks'} />
          <Chip label={repo['open_issues'] + ' issues abertas'} />
          <Chip label={repo['devs'] + ' devs'} />
          <Chip label={repo['commits'] + ' commits'} />
        </div>
      </div>
    </a >
  )
}