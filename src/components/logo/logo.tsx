import styles from './logo.module.css'

export default function LogoComponent() {
  return (
    <a className={styles.container} href='/'>
      <div className={styles['home-logo']}>
        <span className={styles.ola}>ola</span><span className={styles.olu}>olu</span>
        <br/>
        <span className={styles.big}>big</span><span className={styles['gie']}>gie</span>
      </div>
    </a>
  )
}
