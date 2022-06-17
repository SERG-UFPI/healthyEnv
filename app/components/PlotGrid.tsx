import MetricPlot from "./MetricPlot"
import useWindowDimensions from "../utils/useWindowDimensions"
import styles from '../styles/PlotGrid.module.css'

interface PlotGridProps {
  data: object
}

const PlotGrid = (props: PlotGridProps) => {
  const { width } = useWindowDimensions()

  let pagePadding = width > 1280 ? ((width - 1280) / 2) + 16 : 16
  const maxPlotsPerRow = Math.floor((width - (pagePadding * 2)) / 400);
  let plotWidth = ((width - (pagePadding * 2)) / maxPlotsPerRow);
  var style = { '--width': `${plotWidth - 10}px` } as React.CSSProperties

  const generatePlots = () => {
    const plots = []
    props.data['metrics'].forEach((metric: object) => {
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
          {props.data['working_group']}
        </span>
        <span className={styles.description}>
          {props.data['description']}
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