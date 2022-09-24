import dynamic from "next/dynamic"
import PlotLoadingIndicator from './PlotLoadingIndicator'
import styles from '../styles/AnalysisSummarySection.module.css'
import useWindowDimensions from "../utils/useWindowDimensions"

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <PlotLoadingIndicator width={600} height={300} />,
})

interface AnalysisSummarySectionProps {
  metricsCount: object
}

const AnalysisSummarySection = (props: AnalysisSummarySectionProps) => {
  const { width } = useWindowDimensions()

  let safeWidth = width - 17 > 1280 ? 1280 - 72 : width - 17 - 72;

  return (
    <div className={styles.analysisSummary}>
      <Plot
        data={[{
          values: [props.metricsCount['okMetricsCount'], props.metricsCount['reasonableMetricsCount'], props.metricsCount['badMetricsCount']],
          labels: ['Métricas boas', 'Métricas razoáveis', 'Métricas ruins'],
          marker: {
            colors: ['#c4ffcc', '#fceec2', '#fad6d6'],
          },
          type: 'pie',
        }]}
        layout={{
          width: safeWidth,
          height: 300,
        }}
      />
      <div className={styles.analysisValues}>
        <span className={styles.analysisTitle}>Métricas com valores saudáveis</span>
        <span className={styles.analysisSubtitle}>{props.metricsCount['okMetricsCount']}</span>
        <span className={styles.analysisTitle}>Métricas com valores razoáveis</span>
        <span className={styles.analysisSubtitle}>{props.metricsCount['reasonableMetricsCount']}</span>
        <span className={styles.analysisTitle}>Métricas com valores ruins</span>
        <span className={styles.analysisSubtitle}>{props.metricsCount['badMetricsCount']}</span>
        <span className={styles.analysisTitle}>Taxa de saúde</span>
        <span className={styles.analysisSubtitle}>~{
          Math.round((props.metricsCount['okMetricsCount']) * 100 / (props.metricsCount['okMetricsCount'] + props.metricsCount['reasonableMetricsCount'] + props.metricsCount['badMetricsCount']))
        }%</span>
      </div>
    </div>
  );
}

export default AnalysisSummarySection;