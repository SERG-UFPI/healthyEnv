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
  const [resultsInfo, setResultsInfo] = useState('')
  const [metricsInfo, setMetricsInfo] = useState([])
  const [requestUrl, setRequestUrl] = useState('')
  const [metricsCategories, setMetricsCategories] = useState({})

  useEffect(() => {
    if (!router.isReady) return
    loadRepo()
  }, [router.isReady])

  const loadRepo = async () => {
    const datasetId = router.asPath.split('/')[2].split('/')[0]
    const repoName = router.asPath.split('/')[4].split('?')[0]
    const nValue = router.asPath.split('?near=')[1]

    console.log(router.asPath)
    const urlResults = `https://healthyenv.herokuapp.com/datasets/${datasetId}/cluster/${repoName}?near_n=${nValue}`
    const urlMetrics = `https://healthyenv.herokuapp.com/metrics`
    const urlCategoriesMetrics = `https://healthyenv.herokuapp.com/metrics/categories`
    Promise.all([axios.get(urlResults), axios.get(urlMetrics), axios.get(urlCategoriesMetrics)]).then((values) => {
      setRepoInfo(values[0].data['selected'])
      setClusteringInfo(values[0].data['repos'])
      setResultsInfo(JSON.stringify(values[0].data, null, 2))
      const metricsInfoList = []
      Object.keys(values[1].data['metrics']).forEach(metricKey => {
        metricsInfoList.push({
          'id': metricKey,
          'name': values[1].data['metrics'][metricKey]['name'],
          'description': values[1].data['metrics'][metricKey]['description'],
          'is_upper': values[1].data['metrics'][metricKey]['is_upper'],
          'category_id': values[1].data['metrics'][metricKey]['category_id'],
        })
      })
      setMetricsInfo(metricsInfoList)
      setMetricsCategories(values[2].data['metric_categories'])
      setRequestUrl(urlResults)
      setIsLoading(false)
      console.log(resultsInfo)
    })
  }

  return (
    <>
      <Header selectedIndex={1} />
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
                  contributors={repoInfo['contributors']}
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
            <div className={styles['section-title']}>
              <span>Métricas aplicadas ao grupo</span>
            </div>
            {
              Object.keys(metricsCategories).map((key) => {
                return <PlotGrid
                  key={key}
                  repoInfo={repoInfo}
                  clusteringInfo={clusteringInfo}
                  metricsInfo={metricsInfo.filter(metric => {
                    return metric['category_id'] === key
                  })}
                  metricCategory={metricsCategories[key]}
                />
              })
            }
            {/* <PlotGrid repoInfo={repoInfo} clusteringInfo={clusteringInfo} metricsInfo={metricsInfo} />
            <PlotGrid repoInfo={repoInfo} clusteringInfo={clusteringInfo} metricsInfo={metricsInfo} /> */}
            <div className={styles['section-title']}>
              <span>Detalhes da requisição</span>
            </div>
            <div className={styles['request-details']}>
              <span className={styles['request-method']}>GET</span>
              <span className={styles['request-url']}>{requestUrl}</span>
            </div>
            <div className={styles['response-body-container']}>
              <span className={styles['body-title']}>Corpo da resposta</span>
              <textarea rows={20} value={resultsInfo} spellCheck={false} readOnly={true} />
            </div>
          </div>
      }
    </>
  )
}

export default Repo