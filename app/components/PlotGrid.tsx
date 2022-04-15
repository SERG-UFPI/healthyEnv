import MetricPlot from "./MetricPlot"
import useWindowDimensions from "../utils/useWindowDimensions"
import styles from '../styles/PlotGrid.module.css'

export default ({ repoInfo, clusteringInfo }) => {
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
      plots.push(
        <MetricPlot
          key={key}
          y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['metrics'][key] })}
          y_selected={repoInfo['metrics'][key]}
          labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
          name={repoInfo['name']}
          title={key}
          width={plotWidth}
        />
      )
    })

    return plots
  }

  return (
    <div className={styles.grid} style={style}>
      {generatePlots()}
      {/* <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['metrics']['code_changes_commits'] })}
        y_selected={repoInfo['metrics']['code_changes_commits']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: commits'}
        width={plotWidth}
      />
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['metrics']['code_changes_lines_added'] })}
        y_selected={repoInfo['metrics']['code_changes_lines_added']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: lines added'}
        width={plotWidth}
      />
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['metrics']['code_changes_lines_removed'] })}
        y_selected={repoInfo['metrics']['code_changes_lines_removed']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: lines removed'}
        width={plotWidth}
      />
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['metrics']['code_changes_lines_avg_lines_commit'] })}
        y_selected={repoInfo['metrics']['code_changes_lines_avg_lines_commit']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: average lines per commit'}
        width={plotWidth}
      />
      <MetricPlot
        y_all={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['metrics']['code_changes_lines_avg_files_commit'] })}
        y_selected={repoInfo['metrics']['code_changes_lines_avg_files_commit']}
        labels={clusteringInfo.map((repo: any) => { if (repo['near']) return repo['name'] })}
        name={repoInfo['name']}
        title={'Code changes: average files per commit'}
        width={plotWidth}
      /> */}
    </div>
  )
}