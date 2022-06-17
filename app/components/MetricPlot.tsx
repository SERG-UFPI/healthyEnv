import dynamic from 'next/dynamic'
import styles from '../styles/MetricPlot.module.css'
import PlotLoadingIndicator from './PlotLoadingIndicator'

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <PlotLoadingIndicator width={0} height={500} />
})

enum MetricSituation {
  Ok = 'OK',
  Reasonable = 'REASONABLE',
  Bad = 'BAD',
}

interface MetricPlotProps {
  yAll: number[]
  ySelected: number[]
  labels: string[]
  name: string
  title: string
  width: number
  situation: MetricSituation
}

const MetricPlot = (props: MetricPlotProps) => {
  const getColor = (situation: MetricSituation): string => {
    switch (situation) {
      case MetricSituation.Ok:
        return '#c4ffcc'
      case MetricSituation.Reasonable:
        return '#fceec2'
      case MetricSituation.Bad:
        return '#fad6d6'
    }
  }

  return (
    <div className={styles.box} style={{ width: `${(props.width - 10)}px`, height: `${510}px`, backgroundColor: getColor(props.situation) }} >
      <Plot
        data={[
          {
            y: props.yAll,
            text: props.labels,
            type: 'box',
            name: 'Métrica',
            pointpos: -1.8,
            boxpoints: 'all',
            jitter: 0.3,
            boxmean: true,
            quartilemethod: 'inclusive'
          },
          {
            y: [props.ySelected],
            x: ['Métrica'],
            text: [props.name],
            name: 'Repositório',
            marker: {
              size: 8
            },
            pointpos: -1.0,
          }
        ]}
        layout={{
          width: (props.width - 20),
          height: 500,
          title: props.title,
          font: {
            family: 'Lato, sans-serif',
            color: '#111111'
          },
          plot_bgcolor: getColor(props.situation),
          paper_bgcolor: getColor(props.situation),
          yaxis: {
            type: "log",
            autorange: true,
            showgrid: false,
            zeroline: true,
          }
        }}
      />
    </div >
  )
}

export default MetricPlot