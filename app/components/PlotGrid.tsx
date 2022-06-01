import MetricPlot from "./MetricPlot"
import useWindowDimensions from "../utils/useWindowDimensions"
import styles from '../styles/PlotGrid.module.css'

const PlotGrid = ({ repoInfo, clusteringInfo, metricsInfo }) => {
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

    metricsKeys.forEach(key => {
      const metricName = metricsInfo['metrics'][key]['name']
      const titleList = []
      metricName.split('_').forEach((word: string) => {
        titleList.push(word.charAt(0).toUpperCase() + word.slice(1))
      })
      const title = titleList.join(' ')

      plots.push(
        <MetricPlot
          key={key}
          y_all={clusteringInfo.filter((repo: any) => { return repo['near'] }).map((repo: any) => { return repo['metrics'][key] })}
          y_selected={repoInfo['metrics'][key]}
          is_upper={metricsInfo['metrics'][key]['is_upper']}
          labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
          name={repoInfo['name']}
          title={title}
          width={plotWidth}
        />
      )
    })

    return plots
  }

  return (
    <div className={styles.grid} style={style}>
      {generatePlots()}
    </div>
  )
}

export default PlotGrid