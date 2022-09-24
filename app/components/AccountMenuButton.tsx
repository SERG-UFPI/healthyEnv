import { faArrowAltCircleDown, faArrowRightFromBracket, faCaretDown, faCaretUp, faChevronDown, faChevronUp, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import styles from '../styles/AccountMenuButton.module.css'

interface AccountMenuButtonProps {
  profilePicture: string
  userName: string
  userEmail: string
  onLogout: Function
}

const AccountMenuButton = (props: AccountMenuButtonProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const popupClassName = showPopup ? `${styles.popuptext} ${styles.show}` : styles.popuptext

  function toSubmissions() {
    Router.push(`/dashboard/requests/${props.userEmail}`)
  }

  return (
    <div className={styles.popup} onClick={() => setShowPopup(!showPopup)}>
      {props.profilePicture && (
        <Image src={props.profilePicture} width={30} height={30} className={styles.userAvatar} alt='Profile picture' />
      )}
      <div className={styles.authUserInfo}>
        <span className={styles.userName}>{props.userName}</span>
        <span className={styles.userEmail}>{props.userEmail}</span>
      </div>
      <FontAwesomeIcon icon={showPopup ? faCaretUp : faCaretDown} style={{
        marginLeft: '10px',
        fontSize: 14,
        cursor: 'pointer',
      }} />
      <div className={styles.popupContainer}>
        <div className={popupClassName}>
          <div className={styles.popupButton} onClick={() => toSubmissions()}>
            <FontAwesomeIcon icon={faHistory} />
            <span className={styles.popupButtonLabel}>My submissions</span>
          </div>
          <div className={styles.popupButton} onClick={() => props.onLogout()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <span className={styles.popupButtonLabel}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountMenuButton;