import { useRouter } from "next/router"
import dynamic from 'next/dynamic'
import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../../../../components/Header"
import styles from '../../../../styles/AnalyzeRepo.module.css'
import PlotGrid from "../../../../components/PlotGrid"
import RepoInfos from "../../../../components/RepoInfos"
import PlotLoadingIndicator from "../../../../components/PlotLoadingIndicator"
import { Dots } from 'react-activity'
import "react-activity/dist/Dots.css";

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <PlotLoadingIndicator width={600} height={300} />,
})

const Repo = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [clusteringInfo, setClusteringInfo] = useState([])
  const [repoInfo, setRepoInfo] = useState({})

  useEffect(() => {
    if (!router.isReady) return
    loadRepo()
  }, [router.isReady])

  const loadRepo = async () => {
    const datasetId = router.asPath.split('/')[2].split('/')[0]
    const repoName = router.asPath.split('/')[4].split('?')[0]
    const nValue = router.asPath.split('?near=')[1]


    console.log(router.asPath)
    const response = await axios.get(
      `https://healthyenv.herokuapp.com//datasets/${datasetId}/cluster/${repoName}?near_n=${nValue}`
    )
    setRepoInfo(response.data['selected'])
    setClusteringInfo(response.data['repos'])
    setIsLoading(false)
  }

  return (
    <>
      <Header />
      {
        isLoading
          ? <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh'
          }}>
            <Dots color='#000000' size={18} speed={1} animating={true} />
            Obtendo resultados...
          </div>
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
                  loc={repoInfo['loc']}
                  stars={repoInfo['stars']}
                  forks={repoInfo['forks']}
                  openIssues={repoInfo['open_issues']}
                  devs={repoInfo['devs']}
                  commits={repoInfo['commits']} />
                <span className={styles['algorithm-hint']}>
                  Algoritmo utilizado:
                </span>
                <span className={styles['algorithm-title']}>
                  Distância Euclidiana com PCA
                </span>
                <span>
                  Este algoritmo utiliza o PCA para reduzir a dimensionalidade
                  dos dados e faz o cálculo da Distância Euclidiana do
                  repositório selecionado para os demais do dataset. Após
                  ordenar as distâncias obtidas em ordem crescente, obtém-se
                  os <i>n</i> mais próximos.
                </span>
                {/* <div className={styles['change-algorithm-button']}>
                  <FontAwesomeIcon icon={faGear} />
                  <span className={styles['button-label']}>
                    Modificar algoritmo
                  </span>
                </div> */}
              </div>
              <Plot
                data={[
                  {
                    x: clusteringInfo.map((repo) => { if (!repo['near']) return repo['x'] }),
                    y: clusteringInfo.map((repo) => { if (!repo['near']) return repo['y'] }),
                    text: clusteringInfo.map((repo) => { if (!repo['near']) return repo['name'] }),
                    name: 'distantes',
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: '#E66E6E' },
                  },
                  {
                    x: clusteringInfo.map((repo) => { if (repo['near']) return repo['x'] }),
                    y: clusteringInfo.map((repo) => { if (repo['near']) return repo['y'] }),
                    text: clusteringInfo.map((repo) => { if (repo['near']) return repo['name'] }),
                    name: 'próximos',
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: '#84ED66' },
                  },
                  {
                    x: [repoInfo['x']],
                    y: [repoInfo['y']],
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
                  },
                  font: {
                    family: 'Lato, sans-serif',
                    color: '#111111'
                  },
                  plot_bgcolor: '#fafafa',
                  paper_bgcolor: '#fafafa',
                }}
              />
            </div>
            <div className={styles['metrics-title']}>
              <span>Métricas aplicadas ao grupo</span>
            </div>
            <PlotGrid repoInfo={repoInfo} clusteringInfo={clusteringInfo} />
            {/* Continuação da página aqui */}
          </div>
      }
    </>
  )
}

export default Repo