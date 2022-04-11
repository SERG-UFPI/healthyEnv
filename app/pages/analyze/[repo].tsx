import Header from "../../components/Header"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"
import dynamic from 'next/dynamic'
import RepoInfos from "../../components/RepoInfos"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchange } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/AnalyzeRepo.module.css'
import PlotGrid from "../../components/PlotGrid"

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
  const [clusteringInfo, setClusteringInfo] = useState([])
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
    setClusteringInfo(response.data['repos'])
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
                <span>
                  Este algoritmo faz o cálculo da distância euclidiana para
                  todos os atributos e pega os n mais próximos. A visualização
                  gerada ao lado utiliza o algoritmo PCA para transformar os
                  atributos em apenas 2, portanto pode não aparentar que o
                  repositório selecionado esteja exatamente ao centro dos seus
                  próximos.
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
                    x: clusteringInfo.map((repo) => { if (!repo['near']) return repo['pca_x'] }),
                    y: clusteringInfo.map((repo) => { if (!repo['near']) return repo['pca_y'] }),
                    text: clusteringInfo.map((repo) => { if (!repo['near']) return repo['name'] }),
                    name: 'distantes',
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: '#E66E6E' },
                  },
                  {
                    x: clusteringInfo.map((repo) => { if (repo['near']) return repo['pca_x'] }),
                    y: clusteringInfo.map((repo) => { if (repo['near']) return repo['pca_y'] }),
                    text: clusteringInfo.map((repo) => { if (repo['near']) return repo['name'] }),
                    name: 'próximos',
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: '#84ED66' },
                  },
                  {
                    x: [repoInfo['pca_x']],
                    y: [repoInfo['pca_y']],
                    text: [repoInfo['name']],
                    name: repoInfo['name'],
                    type: 'scatter',
                    mode: 'markers',
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
            <h1>Métricas</h1>
            <PlotGrid repoInfo={repoInfo} clusteringInfo={clusteringInfo} />
            {/* Continuação da página aqui */}
          </div>
      }
    </div >
  )
}