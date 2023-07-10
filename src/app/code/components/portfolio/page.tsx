import Modal from './components/modal/modal';
import styles from './page.module.css'
import { ReactElement, useState, MouseEvent } from 'react';

export default function Portfolio() {
  const [modalData, setModalData] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    data: {},
    isOpen: false,
  })

  const data = {
    p1: {
      name: 'p1',
      description: 'The first thing I made.'
    },
    p2: {
      name: 'p2',
      description: 'The second thing I made.'
    },
  }
  function handleClick(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.visibility = 'hidden';
    function assertIsString(val: any): asserts val is string {
      if (typeof val !== "string") {
        // throw new AssertionError({message: "Not a string!"});
      }
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setModalData({
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      data: {},
      isOpen: !modalData.isOpen,
    })
  }
  const projects = Object.values(data).map((datum) =>
    <div onClick={handleClick} className={styles.project} key={datum.name}>
      <p>{datum.name}</p>
      <p>{datum.description}</p>
    </div>
  )

  return (
    <div className={styles.container}>
      {projects}
      <Modal width={modalData.width} height={modalData.height} left={modalData.left} top={modalData.top} data={modalData.data} isOpen={modalData.isOpen}></Modal>
    </div>
  )
}
