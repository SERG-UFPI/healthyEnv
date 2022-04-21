import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header selectedIndex={0} />
      <div className={styles.container}>
        <div className={styles.presentation}>
          <span className={styles.title}>
            Análise de repositórios de software com facilidade
          </span>
          <span className={styles.subtitle}>
            O healthyEnv provê <i>datasets</i> com centenas de repositórios e métricas
            para a realização de análises que visam mostrar a saúde de um projeto de software
            diante de projetos similares.
          </span>
          <div className={styles.button}>
            <Link href='/datasets'>
              <a>Explorar datasets</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
