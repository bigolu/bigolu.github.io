import styles from './page.module.css'
import React, { useLayoutEffect, useRef, useState, CSSProperties } from 'react';
import { ImageComponent, ImageProps } from 'components/image/image';

async function getItems() {
  const response = await fetch('/json/timeline-items.json');
  const timelineItems = await response.json();

  return timelineItems;
}

export default function Resume() {
  type TimelineItem = { role: string, company: string, image: ImageProps, description: string, date: string, logoScaleFactor?: number, };

  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<TimelineItem[]>([]);

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
    numhalf = Math.max(numhalf, 30);

    const timelineTexts = element.getElementsByClassName(styles['timeline-text']) as HTMLCollectionOf<HTMLElement>;
    const timelineImages = element.getElementsByClassName(styles['timeline-image']) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < timelineImages.length; i++) {
      const timelineImage = timelineImages[i];
      const timelineText = timelineTexts[i];
      let toAdd = styles['show'];
      let toRemove = styles['hidden'];
      if ((timelineImage?.offsetTop ?? 0) > numhalf) {
        toAdd = styles['hidden'];
        toRemove = styles['show'];
      }
      timelineImage?.classList.remove(toRemove);
      timelineImage?.classList.add(toAdd);
      timelineText?.classList.remove(toRemove);
      timelineText?.classList.add(toAdd);
    }

    let half = numhalf + 'px';
    element.style.setProperty('--length-to-highlight', half);
  }

  useLayoutEffect(() => {
    if (data.length === 0) {
      getItems().then((value) => {
        setData(value);
      });
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

  function makeImageAndTextElements(datum: TimelineItem, index: number) {
    return [
        <div key={datum.description + 'image'} className={styles['timeline-image']} style={{'gridRow': 1 + (2 * index)} as CSSProperties}>
          <ImageComponent {...datum.image} />
        </div>,
        <div key={datum.description + 'text'} className={styles['timeline-text']} style={{'gridRow': 2 + (2 * index),} as CSSProperties}>
          <h3>{datum.date}</h3>
          <h3>{datum.role} @ {datum.company}</h3>
          <p>{datum.description}</p>
        </div>,
    ];
  }

  function flatten(list: React.JSX.Element[][]) {
    return list.reduce((accumulator, value) => accumulator.concat(value), []);
  }

  const elements = flatten(data.map(makeImageAndTextElements));

  return (
    <div className={styles.container + ' ' + styles.unemployed} style={{'--length-to-highlight': '0px', '--row-count': (data.length * 2) + 1,} as CSSProperties} ref={ref}>
      {elements}
    </div>
  );
}
