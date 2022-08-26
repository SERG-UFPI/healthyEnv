import ChipSimple from "./ChipSimple"
import styles from '../styles/RepoListItemSimple.module.css'
import React, { useContext } from 'react';
import Link from 'next/link'
import Divider from "./Divider";

interface RepoListItemSimpleProps {
  repo: object
  datasetId: string | string[]
  n: number
  closeModal: Function
  refreshAnalysis: Function
}

const RepoListItemSimple = (props: RepoListItemSimpleProps) => {
  const convertedRepoName = props.repo['name'].split('/')[0] + '%2F' + props.repo['name'].split('/')[1]

  return (
    <div onClick={() => {
      props.closeModal()
      props.refreshAnalysis(props.datasetId, convertedRepoName, props.n)
    }}>
      <Link href={`/dashboard/datasets/${props.datasetId}/analyze/${convertedRepoName}?near=${props.n}`}>
        <a className={styles.link}>
          <div className={styles.container}>
            <span className={styles.title}>
              {props.repo['name']}
            </span>
            <div className={styles['chip-list']}>
              <ChipSimple label={props.repo['language']} />
              <ChipSimple label={props.repo['loc'] + ' LOC'} />
              <ChipSimple label={props.repo['stars'] + ' estrelas'} />
              <ChipSimple label={props.repo['forks'] + ' forks'} />
              <ChipSimple label={props.repo['open_issues'] + ' issues abertas'} />
              <ChipSimple label={props.repo['contributors'] + ' contribuidores'} />
              <ChipSimple label={props.repo['commits'] + ' commits'} />
            </div>
          </div>
        </a>
      </Link>
      <Divider />
    </div>
  )
}

export default RepoListItemSimple