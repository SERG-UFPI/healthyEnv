import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div style={{
    width: '600px',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>Carregando gráfico...</div>
})


export default ({ y_all, y_selected, labels, name, title }) => {
  return (
    <Plot
      data={[
        {
          y: y_all,
          text: labels,
          type: 'box',
          name: 'Metric',
          pointpos: -1.8,
          boxpoints: 'all',
        },
        {
          y: [y_selected],
          x: ['Metric'],
          text: [name],
          name: name,
          marker: {
            size: 8
          },
          pointpos: -1.6,
        }
      ]}
      layout={{
        width: 800,
        height: 600,
        title: title,
      }}
    />
  )
}