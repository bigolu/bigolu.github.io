import styles from './page.module.css'
import Image from 'next/image'
import profilePicture from './static_biggs.png'
import { ImageComponent, ImageProps } from 'components/image/image'

export default function About() {
  const imageProps: ImageProps = {
    "light": {
      "url": "/image/biggs-light.png",
      "width": 407,
      "height": 436
    },
    "dark": {
      "url": "/image/biggs-dark.png",
      "width": 50,
      "height": 76
    },
    alt: "Picture of the author"
  };
  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${styles.container}`}>
      <ImageComponent {...imageProps} />
      <div className={`nes-container ${styles['greeting-container']}`} style={{padding: '5px'}}>
        <span className={styles['greeting-content']}></span><br></br>
      </div>
    </main>
  )
}
