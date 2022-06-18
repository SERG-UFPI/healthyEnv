import axios from "axios"
import Header from "../../../../components/Header"
import styles from '../../../../styles/AnalyzeRepo.module.css'
import PlotGrid from "../../../../components/PlotGrid"
import RepoInfos from "../../../../components/RepoInfos"
import NearReposPlot from '../../../../components/NearReposPlot'
import { Dots } from 'react-activity'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getFirstQuartile, getMedian, getThirdQuartile } from "../../../../functions/stats"
import "react-activity/dist/Dots.css";
import MetricsHint from "../../../../components/MetricsHint"
import AnalysisSummarySection from "../../../../components/AnalysisSummarySection"

enum MetricSituation {
  Ok = 'OK',
  Reasonable = 'REASONABLE',
  Bad = 'BAD',
}

const Repo = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [selectedRepoInfo, setSelectedRepoInfo] = useState({})
  const [referenceReposInfo, setReferenceReposInfo] = useState([])
  const [metricsData, setMetricsData] = useState([])
  const [requestPayloads, setRequestPayloads] = useState([])
  const [analysisSummary, setAnalysisSummary] = useState({})

  useEffect(() => {
    if (!router.isReady) return
    loadRepo()
  }, [router.isReady])

  // Load a repo's analysis
  const loadRepo = async () => {
    setIsLoading(true)

    // URL parameters
    const datasetId = router.query.datasetId
    const repoName = router.query.repo
    const nValue = +router.query.near

    // API URLs
    const urlResults = `https://healthyenv.herokuapp.com/datasets/${datasetId}/cluster/${repoName}?near_n=${nValue}`
    const urlMetricsInfo = `https://healthyenv.herokuapp.com/metrics`
    const urlMetricsCategories = `https://healthyenv.herokuapp.com/metrics/categories`

    // Make all requests and update states with the received data
    await Promise.all([axios.get(urlResults), axios.get(urlMetricsInfo), axios.get(urlMetricsCategories)]).then((values) => {
      const resultsResponse = values[0].data
      const metricsInfoResponse = values[1].data
      const metricsCategoriesResponse = values[2].data

      setSelectedRepoInfo(resultsResponse['selected'])
      setReferenceReposInfo(resultsResponse['repos'])
      setRequestPayloads([{
        url: urlResults,
        payload: JSON.stringify(resultsResponse, null, 2)
      }])

      // Make an list with all necessary data to perform an analysis
      const metricsData = []
      let okMetricsCount = 0, reasonableMetricsCount = 0, badMetricsCount = 0
      Object.keys(metricsCategoriesResponse['metric_categories']).forEach(categoryKey => {
        const metricInfo = []
        Object.keys(metricsInfoResponse.metrics).forEach(metricKey => {
          if (categoryKey === metricsInfoResponse.metrics[metricKey]['category_id']) {
            const refMetricsValues = [], valuesArray = []
            const selected = {
              name: resultsResponse['selected']['name'],
              value: resultsResponse['selected']['metrics'][metricKey]
            }
            resultsResponse['repos'].forEach((repo: any) => {
              if (repo.near) {
                refMetricsValues.push({
                  name: repo.name,
                  value: repo.metrics[metricKey]
                })
                valuesArray.push(repo.metrics[metricKey])
              }
            })

            const median = getMedian(valuesArray)
            const firstQuartile = getFirstQuartile(valuesArray)
            const thirdQuartile = getThirdQuartile(valuesArray)

            let metricSituation: MetricSituation
            if ((resultsResponse.selected['metrics'][metricKey] > median ? true : false) == metricsInfoResponse.metrics[metricKey]['is_upper']) {
              metricSituation = MetricSituation.Ok
              okMetricsCount++
            } else {
              if (metricsInfoResponse.metrics[metricKey]['is_upper']) {
                if (resultsResponse.selected['metrics'][metricKey] >= firstQuartile) {
                  metricSituation = MetricSituation.Reasonable
                  reasonableMetricsCount++
                } else {
                  metricSituation = MetricSituation.Bad
                  badMetricsCount++
                }
              } else {
                if (resultsResponse.selected['metrics'][metricKey] <= thirdQuartile) {
                  metricSituation = MetricSituation.Reasonable
                  reasonableMetricsCount++
                } else {
                  metricSituation = MetricSituation.Bad
                  badMetricsCount++
                }
              }
            }

            metricInfo.push({
              id: metricKey,
              name: metricsInfoResponse.metrics[metricKey]['name'],
              description: metricsInfoResponse.metrics[metricKey]['description'],
              is_upper: metricsInfoResponse.metrics[metricKey]['is_upper'],
              category_id: metricsInfoResponse.metrics[metricKey]['category_id'],
              values: {
                selected: selected,
                reference: refMetricsValues,
              },
              situation: metricSituation,
            })
          }
        })
        if (metricInfo.length > 0) metricsData.push({
          id: categoryKey,
          working_group: metricsCategoriesResponse.metric_categories[categoryKey]['working_group'],
          description: metricsCategoriesResponse.metric_categories[categoryKey]['description'],
          metrics: metricInfo,
        })
      })

      setMetricsData(metricsData)
      setAnalysisSummary({ okMetricsCount, reasonableMetricsCount, badMetricsCount })
    })

    setIsLoading(false)
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
                  {selectedRepoInfo['name']}
                </span>
                <RepoInfos
                  language={selectedRepoInfo['language']}
                  loc={selectedRepoInfo['loc']}
                  stars={selectedRepoInfo['stars']}
                  forks={selectedRepoInfo['forks']}
                  openIssues={selectedRepoInfo['open_issues']}
                  contributors={selectedRepoInfo['contributors']}
                  commits={selectedRepoInfo['commits']} />
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
              <NearReposPlot selectedRepoInfo={selectedRepoInfo} referenceReposInfo={referenceReposInfo} />
            </div>
            <div className={styles.sectionHeader}>
              <span className={styles['section-title']}>Métricas aplicadas ao grupo</span>
              <MetricsHint />
            </div>
            {
              metricsData.map((metricCategory: object) => {
                return <PlotGrid
                  key={metricCategory['id']}
                  data={metricCategory}
                />
              })
            }
            <div className={styles['section-title']}>
              <span>Resumo da avaliação</span>
            </div>
            <AnalysisSummarySection metricsCount={analysisSummary} />

            <div className={styles['section-title']}>
              <span>Detalhes da requisição</span>
            </div>
            <div className={styles['request-details']}>
              <span className={styles['request-method']}>GET</span>
              <span className={styles['request-url']}>{requestPayloads[0].url}</span>
            </div>
            <div className={styles['response-body-container']}>
              <span className={styles['body-title']}>Corpo da resposta</span>
              <textarea rows={20} value={requestPayloads[0].payload} spellCheck={false} readOnly={true} />
            </div>
          </div>
      }
    </>
  )
}

export default Repo