import dynamic from 'next/dynamic'
import styles from '../styles/MetricPlot.module.css'
import PlotLoadingIndicator from './PlotLoadingIndicator'

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <PlotLoadingIndicator width={0} height={500} />
  // loading: () => <div style={{
  //   width: '600px',
  //   height: '300px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }}>Carregando gráfico...</div>
})


export default ({ y_all, y_selected, labels, name, title, width }) => {
  return (
    <div className={styles.box} style={{ width: width - 10, height: 510 }} >
      <Plot
        data={[
          {
            y: y_all,
            text: labels,
            type: 'box',
            name: 'Métrica',
            pointpos: -1.8,
            boxpoints: 'all',
          },
          {
            y: [y_selected],
            x: ['Métrica'],
            text: [name],
            name: 'Repositório',
            marker: {
              size: 8
            },
            pointpos: -1.0,
          }
        ]}
        layout={{
          width: (width - 20),
          height: 500,
          title: title,
          font: {
            family: 'Lato, sans-serif',
            color: '#111111'
          },
        }}
      />
    </div>
  )
}