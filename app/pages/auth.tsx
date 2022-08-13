import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from '../styles/Auth.module.css'
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMailForward, faVoicemail } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Auth() {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady])

  const type = router.query.type == 'login' ? 'Log in' : 'Sign up'

  return (
    <>
      <Head>
        <title>HealthyEnv - {type}</title>
      </Head>
      <div className={styles.auth}>
        <span className={styles.title}>Welcome to <b>HealthyEnv</b></span>
        <span className={styles.subtitle}>
          {type} in with one of the following options:
        </span>
        <div className={styles.option}>
          <FontAwesomeIcon icon={faGithub} />
          <span className={styles.optionLabel}>GitHub</span>
        </div>
        <div className={styles.option}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className={styles.optionLabel}>Email</span>
        </div>
        <div className={styles.changeType}>
          {router.query.type == 'login' ? (
            <div>
              <span>No account yet? </span>
              <Link href='/auth?type=signup'>
                <a className={styles.changeTypeButton}>Sign up</a>
              </Link>
            </div>
          ) : (
            <div>
              <span>Already have an account? </span>
              <Link href='/auth?type=login'>
                <a className={styles.changeTypeButton}>Log in</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}