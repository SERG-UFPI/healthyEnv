import dynamic from 'next/dynamic';
import PlotLoadingIndicator from './PlotLoadingIndicator';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <PlotLoadingIndicator width={600} height={300} />,
})

interface NearReposPlotProps {
  selectedRepoInfo: object
  referenceReposInfo: object[]
}

const NearReposPlot = (props: NearReposPlotProps) => {
  return (
    <Plot
      data={[
        {
          x: props.referenceReposInfo.map((repo) => { if (!repo['near']) return repo['x'] }),
          y: props.referenceReposInfo.map((repo) => { if (!repo['near']) return repo['y'] }),
          text: props.referenceReposInfo.map((repo) => { if (!repo['near']) return repo['name'] }),
          name: 'distantes',
          type: 'scatter',
          mode: 'markers',
          marker: { color: '#E66E6E' },
        },
        {
          x: props.referenceReposInfo.map((repo) => { if (repo['near']) return repo['x'] }),
          y: props.referenceReposInfo.map((repo) => { if (repo['near']) return repo['y'] }),
          text: props.referenceReposInfo.map((repo) => { if (repo['near']) return repo['name'] }),
          name: 'próximos',
          type: 'scatter',
          mode: 'markers',
          marker: { color: '#84ED66' },
        },
        {
          x: [props.selectedRepoInfo['x']],
          y: [props.selectedRepoInfo['y']],
          text: [props.selectedRepoInfo['name']],
          name: props.selectedRepoInfo['name'],
          type: 'scatter',
          mode: 'markers',
          marker: { color: '#448A30' },
        },
      ]}
      layout={{
        width: 600,
        height: 300,
        title: 'Repositórios próximos ao selecionado',
        xaxis: {
          showticklabels: false,
        },
        yaxis: {
          showticklabels: false,
        },
        font: {
          family: 'Lato, sans-serif',
          color: '#111111'
        },
        plot_bgcolor: '#ffffff',
        paper_bgcolor: '#ffffff',
      }}
    />
  );
}

export default NearReposPlot;