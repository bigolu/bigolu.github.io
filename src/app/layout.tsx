import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

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
        <div id="layout">
          <div id="header">
            <div className='logo'>logo</div>
            <div className='navbar'>navbar</div>
          </div>
          <div id="main">{children}</div>
        </div>
      </body>
    </html>
  )
}
