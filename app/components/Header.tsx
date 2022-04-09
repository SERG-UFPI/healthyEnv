import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default () => {
  return (
    <div style={{
      fontSize: 22,
      fontWeight: 'bold',
      padding: '16px',
      // backgroundColor: '#E0E0E0',
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