import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/SelectRepo.module.css'
import RepoListItem from './RepoListItem'

export default () => {

  const [isLoading, setIsLoading] = useState(true)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    loadRepos()
  }, [])

  const loadRepos = async () => {
    const response = await axios.get('http://localhost:5000/repos')

    const reposItems = []
    response.data.forEach((element) => {
      reposItems.push(<RepoListItem repo={element} />)
    });

    setIsLoading(false)
    setRepos([...reposItems])
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        Analisar Repositório
      </span>
      <span className={styles.subtitle}>
        Faça a análise da saúde de um repositório baseando-se em repositórios semelhantes
      </span>
      <div className={styles['repo-list-top']}>
        <span className={styles['repo-list-top-title']}>
          Selecione um repositório para continuar:
        </span>
        <input type="text" placeholder="Filtrar" className={styles['repo-list-top-search']} />
      </div>{
        isLoading
          ? <span>Carregando repositórios do dataset...</span>
          : <div className={styles['repo-list']}>
            {repos}
          </div>
      }
    </div>
  )
}
