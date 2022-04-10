import Header from "../../components/Header"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"
import dynamic from 'next/dynamic'
import RepoInfos from "../../components/RepoInfos"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchange } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/AnalyzeRepo.module.css'

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div style={{
    width: '600px',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>Carregando gráfico...</div>
})

export default () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [clusteringInfo, setClusteringInfo] = useState({})
  const [repoInfo, setRepoInfo] = useState({})

  useEffect(() => {
    if (!router.isReady) return
    loadRepo()
  }, [router.isReady])

  const loadRepo = async () => {
    console.log(router.asPath)
    const response = await axios.get(
      'http://localhost:5000/cluster/' + router.asPath.split('/')[2] + '?near_n=100'
    )
    setRepoInfo(response.data['selected'])

    const near_x = []
    const near_y = []
    const near_labels = []
    const far_x = []
    const far_y = []
    const far_labels = []
    response.data['repos'].forEach((repo: any) => {
      if (repo['near'] == true) {
        near_x.push(repo['pca_x'])
        near_y.push(repo['pca_y'])
        near_labels.push(repo['name'])
      } else {
        far_x.push(repo['pca_x'])
        far_y.push(repo['pca_y'])
        far_labels.push(repo['name'])
      }
    })

    setClusteringInfo({
      'near': {
        'x': near_x,
        'y': near_y,
        'labels': near_labels,
      },
      'far': {
        'x': far_x,
        'y': far_y,
        'labels': far_labels,
      }
    })

    setIsLoading(false)
  }

  return (
    <div>
      <Header />
      {
        isLoading
          ? <span>Carregando...</span>
          : <div className={styles.container}>
            <div className={styles['clustering-summary']}>
              <div className={styles['selected-repo-info']}>
                <span className={styles['repo-type-badge']}>
                  Repositório do dataset
                </span>
                <span className={styles['repo-name']}>
                  {repoInfo['name']}
                </span>
                <RepoInfos
                  language={repoInfo['language']}
                  size={repoInfo['size']}
                  stars={repoInfo['stars']}
                  forks={repoInfo['forks']}
                  openIssues={repoInfo['open_issues']}
                  devs={repoInfo['devs']}
                  commits={repoInfo['commits']}
                  files={repoInfo['files']} />
                <span className={styles['algorithm-hint']}>
                  Algoritmo utilizado:
                </span>
                <span className={styles['algorithm-title']}>
                  Distância Euclidiana com PCA para visualização
                </span>
                <div className={styles['change-algorithm-button']}>
                  <FontAwesomeIcon icon={faExchange} />
                  <span className={styles['button-label']}>
                    Trocar algoritmo
                  </span>
                </div>
              </div>
              <Plot
                data={[
                  {
                    x: clusteringInfo['far']['x'],
                    y: clusteringInfo['far']['y'],
                    type: 'scatter',
                    mode: 'markers',
                    text: clusteringInfo['far']['labels'],
                    name: 'distantes',
                    marker: { color: '#E66E6E' },
                  },
                  {
                    x: clusteringInfo['near']['x'],
                    y: clusteringInfo['near']['y'],
                    type: 'scatter',
                    mode: 'markers',
                    text: clusteringInfo['near']['labels'],
                    name: 'próximos',
                    marker: { color: '#84ED66' },
                  },
                  {
                    x: [repoInfo['pca_x']],
                    y: [repoInfo['pca_y']],
                    type: 'scatter',
                    mode: 'markers',
                    text: [repoInfo['name']],
                    name: repoInfo['name'],
                    marker: { color: '#448A30' },
                  },
                ]}
                layout={{
                  width: 600,
                  height: 300,
                  title: 'Repositórios próximos ao selecionado',
                  xaxis: {
                    showticklabels: false,
                  },
                  yaxis: {
                    showticklabels: false,
                  }
                }}
              />

            </div>
            {/* Continuação da página aqui */}
            <span>Métricas</span>
          </div>
      }
    </div >
  )
}