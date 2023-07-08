import styles from './navbar.module.css'
import Link from 'next/link'

export default function NavbarComponent() {
  return (
    <div className={styles.container}>
      <Link href='/about'>About</Link>
      <Link href='/code'>Code</Link>
    </div>
  )
}
