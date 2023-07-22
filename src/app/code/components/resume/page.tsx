import styles from './page.module.css'
import React, { useLayoutEffect, useRef, useState, CSSProperties } from 'react';
import Image from 'next/image';
import { ImageComponent, ImageProps } from 'components/image/image';

async function getItems() {
  const response = await fetch('/json/timeline-items.json');
  const timelineItems = await response.json();

  return timelineItems;
}

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<[]>([]);

  function setTimelineProgress() {
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

    var numhalf = ((result / 2) + (t < 0 ? t * -1 : 0));

    // try out centering the line
    numhalf = numhalf - Math.max(0, (window.innerHeight - result) / 2);

    if (element.getBoundingClientRect().bottom <= window.innerHeight) {
      numhalf = element.clientHeight;
    }

    // try out percentage of total scroll
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    numhalf = scrollPercent * element.clientHeight;
    // so the first timeline item is always highlighted
    numhalf = Math.max(numhalf, 10);

    const timelineItems = element.getElementsByClassName(styles['timeline-item']) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < timelineItems.length; i++) {
      const timelineItem = timelineItems.item(i);
      let toAdd = styles['timeline-show'];
      let toRemove = styles['timeline-hidden'];
      if ((timelineItem?.offsetTop ?? 0) > numhalf) {
        toAdd = styles['timeline-hidden'];
        toRemove = styles['timeline-show'];
      }
      timelineItem?.classList.remove(toRemove);
      timelineItem?.classList.add(toAdd);
    }

    let half = numhalf + 'px';
    element.style.setProperty('--length-to-highlight', half);
  }
  useLayoutEffect(() => {
    if (data.length === 0) {
      getItems().then((value) => {
        setData(value.reverse());
      })
      return;
    }

    // Only do the initial highlight after the elements are rendered in the timeline. Otherwise the whole thing
    // will be highlighted because the height of the timeline with no items will be 0.
    setTimelineProgress();

    window.addEventListener('scroll', setTimelineProgress, { passive: true });
    window.addEventListener("resize", setTimelineProgress);

    return () => {
      window.removeEventListener('scroll', setTimelineProgress);
      window.removeEventListener('resize', setTimelineProgress);
    };
  }, [data]);


  function makeElement(datum: { role: string, company: string, image?: ImageProps, description: string, date: string, }) {
    const defaultImage = <div>{datum.company}</div>;
    const image = datum.image ? <ImageComponent {...datum.image} /> : defaultImage;

    return (
      <div className={styles['timeline-item']} key={datum.role + datum.date + datum.company}>
        <div className={styles['timeline-image']}>
          {image}
        </div>
        <div className={styles['timeline-text']}>
          <h3>{datum.date}</h3>
          <h3>{datum.role}</h3>
          <h3>{datum.company}</h3>
          <p>{datum.description}</p>
        </div>
      </div>
    );
  }
  const elements = data.map(makeElement);

  return (
    <div className={styles.container} style={{'--length-to-highlight': '0px'} as CSSProperties} ref={ref}>
      {elements}
    </div>
  );
}
