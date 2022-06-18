import styles from '../styles/MetricsHint.module.css'

const MetricsHint = () => {
  return (
    <div className={styles.metricsHint}>
      <span className={styles.title}>Legenda:</span>
      <div className={styles.hintBoxOk} />
      <span className={styles.hintText}>Saudável</span>
      <span className={styles.hintBoxReasonable} />
      <span className={styles.hintText}>Razoável</span>
      <span className={styles.hintBoxBad} />
      <span className={styles.hintText}>Precisa de atenção</span>
    </div>
  );
}

export default MetricsHint;