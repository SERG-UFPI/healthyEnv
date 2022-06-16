import dynamic from 'next/dynamic'
import styles from '../styles/MetricPlot.module.css'
import PlotLoadingIndicator from './PlotLoadingIndicator'

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <PlotLoadingIndicator width={0} height={500} />
})


const MetricPlot = ({ y_all, y_selected, is_upper, labels, name, title, width }) => {
  const getMedian = (arr: number[]): number => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b)

    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
  };

  const getFirstQuartile = (arr: number[]): number => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b)

    const subArr = arr.length % 2 !== 0
      ? nums.slice(0, mid + 1)
      : nums.slice(0, mid)
    const subArrMid = Math.floor(subArr.length / 2)

    return subArr.length % 2 !== 0 ? subArr[subArrMid] : (subArr[subArrMid - 1] + subArr[subArrMid]) / 2
  }

  const getThirdQuartile = (arr: number[]): number => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b)

    const subArr = nums.slice(mid, arr.length),
      subArrMid = Math.floor(subArr.length / 2)

    return subArr.length % 2 !== 0 ? subArr[subArrMid] : (subArr[subArrMid - 1] + subArr[subArrMid]) / 2
  }

  const isOk = (y_selected > getMedian(y_all) ? true : false) == is_upper;

  const generateColor = (): string => {
    if (isOk) {
      return '#c4ffcc' // verde
    } else {
      if (is_upper) {
        if (y_selected >= getFirstQuartile(y_all)) {
          return '#fceec2' // laranja
        } else {
          return '#fad6d6' // vermelha
        }
      } else {
        if (y_selected <= getThirdQuartile(y_all)) {
          return '#fceec2' // laranja
        } else {
          return '#fad6d6' // vermelha
        }
      }
    }
  }

  const plotColor = generateColor()

  return (
    <div className={styles.box} style={{ width: `${(width - 10)}px`, height: `${510}px`, backgroundColor: plotColor }} >
      <Plot
        data={[
          {
            y: y_all,
            text: labels,
            type: 'box',
            name: 'Métrica',
            pointpos: -1.8,
            boxpoints: 'all',
            jitter: 0.3,
            boxmean: true,
            quartilemethod: 'inclusive'
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
          plot_bgcolor: plotColor,
          paper_bgcolor: plotColor,
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