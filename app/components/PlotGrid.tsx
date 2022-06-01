import MetricPlot from "./MetricPlot"
import useWindowDimensions from "../utils/useWindowDimensions"
import styles from '../styles/PlotGrid.module.css'

const PlotGrid = ({ repoInfo, clusteringInfo, metricsInfo, metricCategory }) => {
  const { width } = useWindowDimensions()

  let pagePadding = width > 1280 ? ((width - 1280) / 2) + 16 : 16
  const maxPlotsPerRow = Math.floor((width - (pagePadding * 2)) / 400);
  let plotWidth = ((width - (pagePadding * 2)) / maxPlotsPerRow);
  var style = { '--width': `${plotWidth - 10}px` } as React.CSSProperties

  const metricsKeys = []
  for (let metricKey in repoInfo['metrics']) {
    metricsKeys.push(metricKey)
  }

  const generatePlots = () => {
    const plots = []

    metricsInfo.forEach((metric: object, index: number) => {
      const metricName = metric['name']
      plots.push(
        <MetricPlot
          key={metric['id'] + Math.random()}
          y_all={clusteringInfo.filter((repo: any) => { return repo['near'] }).map((repo: any) => { return repo['metrics'][metric['id']] })}
          y_selected={repoInfo['metrics'][metric['id']]}
          is_upper={metric['is_upper']}
          labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
          name={repoInfo['name']}
          title={metricName}
          width={plotWidth}
        />
      )
    })

    return plots
  }

  return (
    <div>{
      metricsInfo.length > 0
        ? (
          <div className={styles.metricCategory}>
            <span className={styles.workingGroup}>
              {metricCategory['working_group']}
            </span>
            <span className={styles.description}>
              {metricCategory['description']}
            </span>
          </div>
        )
        : false
    }
      {metricsInfo.length > 0 ? (
        <div className={styles.grid} style={style}>
          {generatePlots()}
        </div>
      ) : false}
    </div>
  )
}

export default PlotGrid