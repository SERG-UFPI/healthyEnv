import styles from '../../styles/Auth.module.css'
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Auth() {

  return (
    <>
      <Head>
        <title>HealthyEnv - Auth</title>
      </Head>
      <div className={styles.auth}>
        <span className={styles.title}>Welcome to <b>HealthyEnv</b></span>
        <span className={styles.subtitle}>
          Log in or sign up with one of the following options:
        </span>
        <Link href={`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}`}>
          <a>
            <div className={styles.option}>
              <FontAwesomeIcon icon={faGithub} />
              <span className={styles.optionLabel}>GitHub</span>
            </div>
          </a>
        </Link>
        {/* <Link href={`/auth/email?type=login`}>
          <a>
            <div className={styles.option}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span className={styles.optionLabel}>Email</span>
            </div>
          </a>
        </Link> */}
        <Link href='/'>
          <a className={styles.backHomeButton}>Go back to HealthyEnv home</a>
        </Link>
      </div>
    </>
  );
}