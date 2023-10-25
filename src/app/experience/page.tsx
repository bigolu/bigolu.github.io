"use client";

import styles from "./page.module.css";
import React, {
  useLayoutEffect,
  useRef,
  useState,
  CSSProperties,
  Fragment,
} from "react";
import { ImageComponent, ImageProps } from "components/image/image";

async function getData() {
  const response = await fetch("/json/timeline-items.json");
  const timelineItems = await response.json();

  return timelineItems;
}

function getVerticalMarginHeight(element: HTMLElement) {
  const computedStyles = window.getComputedStyle(element, null);
  return (
    parseFloat(computedStyles.marginBottom) +
    parseFloat(computedStyles.marginTop)
  );
}

function getTimelineItemHeight(
  imageElement: HTMLElement,
  textElement: HTMLElement
) {
  return (
    imageElement.clientHeight +
    getVerticalMarginHeight(imageElement) +
    textElement.clientHeight +
    getVerticalMarginHeight(textElement)
  );
}

export default function Experience() {
  type TimelineItem = {
    role: string;
    company: string;
    image: ImageProps;
    description: string;
    date: string;
  };

  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<TimelineItem[]>([]);
  if (data.length === 0) {
    getData().then(setData);
  }

  function setTimelineProgress() {
    const element = ref.current;
    if (element === null) {
      return;
    }

    var elH = element.clientHeight;
    var H = window.outerHeight;
    var r = element.getBoundingClientRect();
    var t = r.top;
    var b = r.bottom;
    var result = Math.max(0, t > 0 ? Math.min(elH, H - t) : Math.min(b, H));

    var numhalf = result / 2 + (t < 0 ? t * -1 : 0);

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

    // try out gradient
    let firstUnseen = true;

    const timelineTexts = element.getElementsByClassName(
      styles["timeline-text"]
    ) as HTMLCollectionOf<HTMLElement>;
    const timelineImages = element.getElementsByClassName(
      styles["timeline-image"]
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < timelineImages.length; i++) {
      const timelineImage = timelineImages[i];
      const timelineText = timelineTexts[i];
      let toAdd = styles["show"];
      let toRemove = styles["hidden"];

      const offsetTopIncludingTopMargin =
        timelineImage?.offsetTop -
        parseFloat(window.getComputedStyle(timelineImage, null).marginTop);

      if (offsetTopIncludingTopMargin > numhalf) {
        toAdd = styles["hidden"];
        toRemove = styles["show"];

        const timelineItemHeight = getTimelineItemHeight(
          timelineImages[i - 1],
          timelineTexts[i - 1]
        );
        let sum = 0;
        for (let current = 0; current < i - 1; current++) {
          sum += getTimelineItemHeight(
            timelineImages[current],
            timelineTexts[current]
          );
        }
        const minimumOpacityPercentage = 20;
        const percent =
          minimumOpacityPercentage +
          ((numhalf - sum) / timelineItemHeight) *
            (100 - minimumOpacityPercentage);
        if (firstUnseen) {
          firstUnseen = false;
          timelineImage.style.setProperty("--percent", percent + "%");
          timelineText.style.setProperty("--percent", percent + "%");
        } else {
          timelineImage.style.setProperty(
            "--percent",
            minimumOpacityPercentage + "%"
          );
          timelineText.style.setProperty(
            "--percent",
            minimumOpacityPercentage + "%"
          );
        }
      }
      timelineImage?.classList.remove(toRemove);
      timelineImage?.classList.add(toAdd);
      timelineText?.classList.remove(toRemove);
      timelineText?.classList.add(toAdd);
    }

    let half = numhalf + "px";
    element.style.setProperty("--length-to-highlight", half);
  }

  // data is a dependency so I can set timeline progress when the data is fetched
  useLayoutEffect(() => {
    if (data.length === 0) {
      return;
    }

    // Only do the initial highlight after the elements are rendered in the timeline. Otherwise the whole thing
    // will be highlighted because the height of the timeline with no items will be 0.
    setTimelineProgress();

    window.addEventListener("scroll", setTimelineProgress, { passive: true });
    window.addEventListener("resize", setTimelineProgress);

    return () => {
      window.removeEventListener("scroll", setTimelineProgress);
      window.removeEventListener("resize", setTimelineProgress);
    };
  }, [data]);

  function makeImageAndTextElements(datum: TimelineItem, index: number) {
    // TODO: When `subgrid` has better support, I can use it to put these elements together in a container instead
    // of using a Fragment.
    // browser support: https://caniuse.com/css-subgrid
    return (
      <Fragment key={datum.description}>
        <div
          className={styles["timeline-image"]}
          style={{ gridRow: 1 + 2 * index } as CSSProperties}
        >
          <ImageComponent {...datum.image} />
        </div>
        <div
          className={styles["timeline-text"]}
          style={{ gridRow: 2 + 2 * index } as CSSProperties}
        >
          <p className={styles.role}>
            {datum.role} @ {datum.company} &#8212; {datum.description}
          </p>
          <p className={styles.date}>{datum.date}</p>
        </div>
      </Fragment>
    );
  }

  const elements = data.map(makeImageAndTextElements);

  return (
    <div
      className={styles.container + " " + styles.unemployed}
      style={{ "--row-count": data.length * 2 + 1 } as CSSProperties}
      ref={ref}
    >
      {elements}
    </div>
  );
}
