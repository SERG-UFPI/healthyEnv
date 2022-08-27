import Chip from "./Chip"
import styles from '../styles/RepoListItem.module.css'
import React, { useContext } from 'react';
import Link from 'next/link'
import Divider from "./Divider";

const RepoListItem = ({ repo, datasetId, getNValue }) => {
  const convertedRepoName = repo['name'].split('/')[0] + '/' + repo['name'].split('/')[1]

  return (
    <>
      <Link href={`/dashboard/datasets/${datasetId}/analyze/${convertedRepoName}?near=${getNValue()}`}>
        <a className={styles.link}>
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
              <Chip label={repo['contributors'] + ' contribuidores'} />
              <Chip label={repo['commits'] + ' commits'} />
            </div>
          </div>
        </a >
      </Link>
      <Divider />
    </>
  )
}

export default RepoListItem