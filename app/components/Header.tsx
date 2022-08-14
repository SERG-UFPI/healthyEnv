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
          <Link href='/how-it-works'>
            <a>
              {selectedIndex == 1
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>How it works</span>
                : <span className={styles.link}>How it works</span>}
            </a>
          </Link>
          <Link href='/api-docs'>
            <a>
              {selectedIndex == 2
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>API</span>
                : <span className={styles.link}>API</span>}
            </a>
          </Link>
          <Link href='/docs'>
            <a>
              {selectedIndex == 3
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>Docs</span>
                : <span className={styles.link}>Docs</span>}
            </a>
          </Link>
          <Link href='/about'>
            <a>
              {selectedIndex == 4
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>About</span>
                : <span className={styles.link}>About</span>}
            </a>
          </Link>
        </div>
        <div className={styles.options}>
          <Link href='/auth/login'>
            <a><span className={styles.loginButton}>Log in</span></a>
          </Link>
          <Link href='/auth/signup'>
            <a><span className={styles.signupButton}>Sign up</span></a>
          </Link>
          <a href='https://github.com/SERG-UFPI/healthyEnv' className={styles.icon}>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header