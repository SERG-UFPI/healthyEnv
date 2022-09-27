import { useState } from "react";
import styles from '../styles/ChangeNModal.module.css'
import "react-activity/dist/Dots.css";
import Link from "next/link";

interface ChangeNModalProps {
  closeModal: Function
  refreshAnalysis: Function
  currNValue: number
  datasetCount: number
  datasetId: string | string[]
  userName: string | string[]
  repoName: string | string[]
}

const ChangeNModal = (props: ChangeNModalProps) => {
  const [nValue, setNValue] = useState(1)

  return (
    <div className={styles.changeNModal}>
      <div className={styles.popupContent}>
        <div className={styles.header}>
          <span className={styles.title}>Change similar amount</span>
          <span>Set a quantity for obtaining similar projects to do the analysis:</span>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={() => props.closeModal()}>
            Cancel
          </button>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <input
            className={styles.input}
            type='number'
            id='nValue'
            name='nValue'
            min='1'
            max={props.datasetCount}
            defaultValue={props.currNValue}
            onChange={(e) => {
              const value = Number(e.target.value)
              if (value > (props.datasetCount)) {
                e.target.value = Number(props.datasetCount).toString()
              }
              setNValue(+e.target.value)
            }}
          />
          <div className={styles.button} onClick={() => {
            props.closeModal()
            props.refreshAnalysis(props.datasetId, props.userName, props.repoName, nValue)
          }}>
            <Link href={`/dashboard/datasets/${props.datasetId}/analyze/${props.userName}/${props.repoName}?near=${nValue}`}>
              <a>Confirm</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeNModal;