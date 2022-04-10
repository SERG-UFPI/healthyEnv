import Chip from "./Chip"
import styles from '../styles/RepoListItem.module.css'

export default ({ repo }) => {
  return (
    <a href={'/analyze/' + repo['name'].split('/')[0] + '%2F' + repo['name'].split('/')[1]} className={styles.link}>
      <div className={styles.container}>
        <span className={styles.title}>
          {repo['name']}
        </span>
        <div className={styles['chip-list']}>
          <Chip label={repo['language']} />
          <Chip label={repo['size'] + ' de tamanho'} />
          <Chip label={repo['stars'] + ' estrelas'} />
          <Chip label={repo['forks'] + ' forks'} />
          <Chip label={repo['open_issues'] + ' issues abertas'} />
          <Chip label={repo['devs'] + ' devs'} />
          <Chip label={repo['commits'] + ' commits'} />
          <Chip label={repo['files'] + ' arquivos'} />
        </div>
      </div>
    </a >
  )
}