import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const image = '/assets/landing.png'

  return (
    <>
      <Head>
        <title>HealthyEnv - Ferramenta para avaliação de repositórios de software</title>
      </Head>
      <Header selectedIndex={0} />
      <div className={styles.container}>
        <div className={styles.firstSection}>
          <div className={styles.imageContainer}>
            <Image src={image} layout='fill' objectFit='contain' alt='An example of analysis.' className={styles.image} quality='100' />
          </div>
          <div className={styles.presentation}>
            <span className={styles.title}>
              Easy software repository analysis
            </span>
            <span className={styles.subtitle}>
              HealthyEnv is a free tool capable of analyzing a software
              repository based on hundreds of other repositories in our dataset.
            </span>
            <div className={styles.linksList}>
              <div className={styles.button}>
                <Link href='/auth'>
                  <a>Get started</a>
                </Link>
              </div>
              {/* <div className={styles.simpleButton}>
                <Link href='/docs'>
                  <a>See the docs</a>
                </Link>
                <FontAwesomeIcon icon={faChevronRight} style={{ paddingLeft: 10 }} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
