import { Metadata } from 'next'
import './globals.css'
import LogoComponent from 'components/logo/logo'
import NavbarComponent from 'components/navbar/navbar'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: 'bigo-dot-lu',
  description: 'My personal site.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <div className={styles.header}>
            <LogoComponent />
            <NavbarComponent />
          </div>
          <div className={styles.main}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
