import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

interface SelectedIndex {
  selectedIndex: number
}

const Header = ({ selectedIndex }: SelectedIndex) => {
  return (
    <div className={styles.header}>
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1280px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Link href='/'>
            <a>
              <span className={styles.title}>HealthyEnv</span>
            </a>
          </Link>
          <Link href='/datasets'>
            <a>
              {selectedIndex == 1
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>Datasets e análise</span>
                : <span className={styles.link}>Datasets e análise</span>}
            </a>
          </Link>
          <Link href='/request'>
            <a>
              {selectedIndex == 2
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>Solicitar inclusão de repositório</span>
                : <span className={styles.link}>Solicitar inclusão de repositório</span>}
            </a>
          </Link>
          <Link href='/about'>
            <a>
              {selectedIndex == 3
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>Sobre</span>
                : <span className={styles.link}>Sobre</span>}
            </a>
          </Link>
        </div>
        <a href='https://github.com/SERG-UFPI/healthyEnv' className={styles.icon}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  )
}

export default Header