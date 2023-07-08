import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import LogoComponent from 'components/logo/logo'
import NavbarComponent from 'components/navbar/navbar'
import styles from './layout.module.css'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
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
