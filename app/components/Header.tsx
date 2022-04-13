import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import useWindowDimensions from '../utils/useWindowDimensions'

export default () => {
  const { width } = useWindowDimensions()
  let pagePadding = width > 1320 ? ((width - 1320) / 2) + 16 : 16

  return (
    <div style={{
      fontSize: 22,
      fontWeight: 'bold',
      padding: `16px ${pagePadding}px`,
      borderBottom: 'solid',
      borderWidth: '1px',
      borderColor: '#EAEAEA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span>healthyEnv</span>
      <a href='https://github.com/SERG-UFPI/healthyEnv'>
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  )
}