import styles from './navbar.module.css'
import Link from 'next/link'

export default function NavbarComponent() {
  return (
    <div className={styles.container}>
      <Link href='/about'>about</Link>
      <Link href='/portfolio'>portfolio</Link>
      <Link href='/experience'>experience</Link>
    </div>
  )
}
