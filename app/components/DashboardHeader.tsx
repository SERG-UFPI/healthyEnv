import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SelectedIndex {
  selectedIndex: number
}

export default function DashboardHeader({ selectedIndex }: SelectedIndex) {

  const [userInfo, setUserInfo] = useState({})

  function getUserInfo() {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem('userData')
      // console.log(data)
      setUserInfo(JSON.parse(data))
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

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
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>Repository analysis</span>
                : <span className={styles.link}>Repository analysis</span>}
            </a>
          </Link>
          <Link href='/requests'>
            <a>
              {selectedIndex == 2
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>Submit a repository</span>
                : <span className={styles.link}>Submit a repository</span>}
            </a>
          </Link>
          <Link href='/help'>
            <a>
              {selectedIndex == 3
                ? <span className={styles.link} style={{ color: '#2590DA', fontWeight: 'bold' }}>Help</span>
                : <span className={styles.link}>Help</span>}
            </a>
          </Link>
        </div>
        <div className={styles.authUserArea}>
          <Image src={'https://avatars.githubusercontent.com/u/24456956?v=4'} width={30} height={30} className={styles.userAvatar} alt='Profile picture' />
          <div className={styles.authUserInfo}>
            <span className={styles.userName}>{userInfo['name']}</span>
            <span className={styles.userEmail}>{userInfo['email']}</span>
          </div>
        </div>
      </div>
    </div >
  );
}