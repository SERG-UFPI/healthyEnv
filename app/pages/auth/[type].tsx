import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from '../../styles/Auth.module.css'
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMailForward, faVoicemail } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Auth() {
  const router = useRouter()
  const [toggleEmailAuth, setToggleEmailAuth] = useState(false)

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady])

  const type = router.query.type == 'login' ? 'Log in' : 'Sign up'
  const method = router.query.method == 'email' ? 'Email' : 'GitHub'

  return (
    <>
      <Head>
        <title>HealthyEnv - Auth</title>
      </Head>{method == 'Email' ? (
        <div className={styles.auth}>
          {type == 'Log in' ? (
            <div className={styles.emailAuthForm}>
              <span className={styles.emailAuthFormTitle}>Log in using <b>email</b></span>
              <Link href={`/auth/${router.query.type}`}>
                <a className={styles.emailAuthFormLink}>Go back to auth options</a>
              </Link>
              <input placeholder="Email" className={styles.emailAuthInput} />
              <input placeholder="Password" type='password' className={styles.emailAuthInput} />
              <button className={styles.emailAuthButton}>Log in</button>
            </div>
          ) : (
            <div className={styles.emailAuthForm}>
              <div className={styles.emailAuthFormTitle}>Sign up with <b>email</b></div>
              <Link href={`/auth/${router.query.type}`}>
                <a className={styles.emailAuthFormLink}>Go back to auth options</a>
              </Link>
              <input placeholder="Your name" className={styles.emailAuthInput} />
              <input placeholder="Email" type='email' className={styles.emailAuthInput} />
              <input placeholder="Password" type='password' className={styles.emailAuthInput} />
              <button className={styles.emailAuthButton}>Sign up</button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.auth}>
          <span className={styles.title}>Welcome to <b>HealthyEnv</b></span>
          <span className={styles.subtitle}>
            {type} in with one of the following options:
          </span>
          <div className={styles.option}>
            <FontAwesomeIcon icon={faGithub} />
            <span className={styles.optionLabel}>GitHub</span>
          </div>
          <Link href={`/auth/${router.query.type}?method=email`}>
            <a onClick={() => {
              setToggleEmailAuth(true)
            }} >
              <div className={styles.option}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span className={styles.optionLabel}>Email</span>
              </div>
            </a>
          </Link>
          <div className={styles.changeType}>
            {router.query.type == 'login' ? (
              <div>
                <span>No account yet? </span>
                <Link href='/auth/signup'>
                  <a className={styles.changeTypeButton}>Sign up</a>
                </Link>
              </div>
            ) : (
              <div>
                <span>Already have an account? </span>
                <Link href='/auth/login'>
                  <a className={styles.changeTypeButton}>Log in</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}