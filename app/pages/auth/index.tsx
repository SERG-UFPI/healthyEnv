import styles from '../../styles/Auth.module.css'
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Dots } from 'react-activity'
import "react-activity/dist/Dots.css";
import Router, { useRouter } from "next/router";
import Constants from '../../utils/constants';

export default function Auth() {
  const router = useRouter()
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  function checkCurrentAuth() {
    const data = JSON.parse(localStorage.getItem('userData'))

    if (data == undefined) {
      setShowAuthOptions(true)
    } else {
      if ((Date.now() - data['timestamp']) > 86400000) {
        setShowAuthOptions(true)
      } else {
        Router.push('/dashboard/datasets')
      }
    }
  }

  useEffect(
    () => {
      checkCurrentAuth()
    }, [])

  return (
    <>
      <Head>
        <title>HealthyEnv - Auth</title>
      </Head>
      {showAuthOptions ? (
        <div className={styles.auth}>
          <span className={styles.title}>Welcome to <b>HealthyEnv</b></span>
          <span className={styles.subtitle}>
            Log in or sign up with one of the following options:
          </span>
          <Link href={`https://github.com/login/oauth/authorize?client_id=${Constants.ghCliendId}&redirect_uri=http://localhost:3000/auth/github?next=${router.query.next}`}>
            <a>
              <div className={styles.option}>
                <FontAwesomeIcon icon={faGithub} />
                <span className={styles.optionLabel}>GitHub</span>
              </div>
            </a>
          </Link>
          <Link href='/'>
            <a className={styles.backHomeButton}>Go back to HealthyEnv home</a>
          </Link>
        </div>
      ) : (
        <div className={styles.auth}>
          <Dots color='#000000' size={18} speed={1} animating={true} />
        </div>)
      }
    </>
  );
}