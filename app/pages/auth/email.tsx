import Link from "next/link";
import styles from '../../styles/Auth.module.css'
import { useRouter } from "next/router";
import Head from "next/head";

export default function Email() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>HealthyEnv - Email Auth</title>
      </Head>
      <div className={styles.auth}>
        {router.query.type == 'login' ? (
          <div className={styles.emailAuthForm}>
            <span className={styles.emailAuthFormTitle}>Log in using <b>email</b></span>
            <Link href={`/auth`}>
              <a className={styles.emailAuthFormLink}>Go back to auth options</a>
            </Link>
            <input placeholder="Email" className={styles.emailAuthInput} />
            <input placeholder="Password" type='password' className={styles.emailAuthInput} />
            <button className={styles.emailAuthButton}>Log in</button>
          </div>
        ) : (
          <div className={styles.emailAuthForm}>
            <div className={styles.emailAuthFormTitle}>Sign up with <b>email</b></div>
            <Link href={`/auth`}>
              <a className={styles.emailAuthFormLink}>Go back to auth options</a>
            </Link>
            <input placeholder="Your name" className={styles.emailAuthInput} />
            <input placeholder="Email" type='email' className={styles.emailAuthInput} />
            <input placeholder="Password" type='password' className={styles.emailAuthInput} />
            <button className={styles.emailAuthButton}>Sign up</button>
          </div>
        )}
        <div className={styles.changeType}>
          {router.query.type == 'login' ? (
            <div>
              <span>No account yet? </span>
              <Link href='/auth/email?type=signup'>
                <a className={styles.changeTypeButton}>Sign up</a>
              </Link>
            </div>
          ) : (
            <div>
              <span>Already have an account? </span>
              <Link href='/auth/email?type=login'>
                <a className={styles.changeTypeButton}>Log in</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
