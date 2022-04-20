import { Dots } from 'react-activity'
import "react-activity/dist/Dots.css";

const PlotLoadingIndicator = ({ width, height }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      // width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 ' + width + 'px'
    }}>
      <Dots color='#000000' size={18} speed={1} animating={true} />
      <span style={{
        fontSize: 14
      }}>Carregando gráfico...</span>
    </div>
  )
}

export default PlotLoadingIndicator