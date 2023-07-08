import styles from './page.module.css'
import Image from 'next/image'
import profilePicture from './static_biggs.png'

export default function About() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${styles.container}`}>
      <Image
        src={profilePicture}
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <div className={`nes-container ${styles['greeting-container']}`} style={{padding: 0}}>
        <span>Hey how{"'"}s it going?</span>
      </div>
    </main>
  )
}
