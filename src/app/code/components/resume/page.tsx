import styles from './page.module.css'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import profilePicture from '../../../about/static_biggs.png'

async function getItems() {
  const response = await fetch('/timeline-items.json');
  const timelineItems = await response.json();

  return timelineItems;
}

export default async function Resume() {
  const ref = useRef<HTMLDivElement>(null);

  const data = await getItems();

  function makeElement(datum: { name: string, description: string, }) {
    return (
      <div className={styles['timeline-item']}>
        <Image className={styles['timeline-image']} src={profilePicture} alt='my image' width={50} height={50} />
        <div>
          <h3>{datum.name}</h3>
          <p>{datum.description}</p>
        </div>
      </div>
    );
  }
  const elements = data.map(makeElement);

  function handleScroll() {
    const element = ref.current;
    if (element === null) {
      return;
    }

    var elH = element.clientHeight;
    var H = window.outerHeight;
    var r = element.getBoundingClientRect();
    var t=r.top;
    var b=r.bottom;
    var result = Math.max(0, t>0? Math.min(elH, H-t) : Math.min(b, H));

    var half = ((result / 2) + (t < 0 ? t * -1 : 0)) + 'px';

    if (element.getBoundingClientRect().bottom <= window.innerHeight) {
      half = '100%';
    }

    element.style.setProperty('--length-to-highlight', half);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      {elements}
    </div>
  );
}
