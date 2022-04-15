import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import useWindowDimensions from '../utils/useWindowDimensions'

export default () => {
  return (
    <div style={{
      borderBottom: 'solid',
      borderWidth: '1px',
      borderColor: '#EAEAEA',
    }}>
      <div style={{
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1280px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span>healthyEnv</span>
        <a href='https://github.com/SERG-UFPI/healthyEnv'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  )
}