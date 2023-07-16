import styles from './page.module.css'
import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import profilePicture from '../../../about/static_biggs.png'

export default function Resume() {
  const data = Array(10).fill(
    {
      name: "First",
      description: "this is stuff that I did at some point",
    }
  );
  function makeElement(datum) {
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

  const ref = useRef(null);

  // TODO: may have to account for scroll amount of the timeline and offset of timeline container from viewport
  function handleClick() {
    // const rect = event.currentTarget.getBoundingClientRect();
    // var y = Math.floor(event.clientY - rect.top);
    // event.currentTarget.style.setProperty('--length-to-highlight', (event.currentTarget.clientHeight / 2) + 'px');
    // console.log(y);
    // console.log(event.currentTarget.clientHeight);

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
    console.log(half)
    console.log('top: ' + t)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleClick, { passive: true });
    handleClick();
    return () => window.removeEventListener('scroll', handleClick);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      {elements}
    </div>
  );
}
