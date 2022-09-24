import styles from '../styles/MetricsHint.module.css'

const MetricsHint = () => {
  return (
    <div className={styles.metricsHint}>
      <span className={styles.title}>Legend:</span>
      <div className={styles.legendItem}>
        <div className={styles.hintBoxOk} />
        <span className={styles.hintText}>Healthy</span>
      </div>
      <div className={styles.legendItem}>
        <span className={styles.hintBoxReasonable} />
        <span className={styles.hintText}>Reasonable</span>
      </div>
      <div className={styles.legendItem}>
        <span className={styles.hintBoxBad} />
        <span className={styles.hintText}>Needs attention</span>
      </div>
    </div>
  );
}

export default MetricsHint;