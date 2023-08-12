import { Metadata } from 'next'
import './globals.css'
import LogoComponent from 'components/logo/logo'
import NavbarComponent from 'components/navbar/navbar'
import styles from './layout.module.css'
import { ExternalLink } from 'components/external-link/component'

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
      <body className={styles.body}>
        <div className={styles.container}>
          <div className={styles.header}>
            <LogoComponent />
            <NavbarComponent />
          </div>
          <div className={styles.main}>
            {children}
          </div>
          <footer className={styles.footer}>
            <ExternalLink href='https://github.com/bigolu/bigolu.github.io'>
              source code for this website
            </ExternalLink>
          </footer>
        </div>
      </body>
    </html>
  )
}
