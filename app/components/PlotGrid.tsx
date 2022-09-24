import MetricPlot from "./MetricPlot"
import useWindowDimensions from "../utils/useWindowDimensions"
import styles from '../styles/PlotGrid.module.css'
import { FC } from "react"

interface PlotGridProps {
  metrics: any
  workingGroup
}

const PlotGrid: FC<{ data: PlotGridProps }> = ({ data }) => {
  const { width } = useWindowDimensions()

  let safeWidth = width > 1280 ? 1280 - 72 : width - 72;
  const maxPlotsPerRow = safeWidth >= 400 ? Math.floor(safeWidth / 400) : 1;
  let plotWidth = (safeWidth - ((maxPlotsPerRow - 1) * 10)) / maxPlotsPerRow;
  var style = { '--width': `${plotWidth}px` } as React.CSSProperties

  const generatePlots = () => {
    const plots = []
    data.metrics.forEach((metric: object) => {
      plots.push(
        <MetricPlot
          key={metric['id'] + Math.random()}
          yAll={metric['values']['reference'].map((value: any) => value['value'])}
          ySelected={metric['values']['selected']['value']}
          labels={metric['values']['reference'].map((value: any) => value['name'])}
          name={metric['values']['selected']['name']}
          title={metric['name']}
          width={plotWidth}
          situation={metric['situation']}
        />
      )
    });

    return plots
  }

  return (
    <div>{
      <div className={styles.metricCategory}>
        <span className={styles.workingGroup}>
          {data['working_group']}
        </span>
        <span className={styles.description}>
          {data['description']}
        </span>
      </div>
    }
      <div className={styles.grid} style={style}>
        {generatePlots()}
      </div>
    </div>
  )
}

export default PlotGrid