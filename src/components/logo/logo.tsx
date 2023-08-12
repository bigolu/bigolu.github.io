import styles from './logo.module.css'

export default function LogoComponent() {
  return (
    <a className={styles.container} href='/'>
      <div className={styles['home-logo']}>
        <span className={styles.ola}>Ola</span><span className={styles.olu}>olu</span>
        <br/>
        <span className={styles.big}>Big</span><span className={styles['gie']}>gie</span>
        <br/>
        Emmanuel
      </div>
    </a>
  )
}
