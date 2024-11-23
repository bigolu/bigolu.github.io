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

type Job = {
  role: string;
  company: string;
  image: ImageProps;
  description: string;
  date: string;
};

async function getJobs() {
  const response = await fetch("/json/jobs.json");
  return await response.json();
}

function getVerticalMarginHeight(element: HTMLElement) {
  const computedStyles = window.getComputedStyle(element, null);
  return (
    parseFloat(computedStyles.marginBottom) +
    parseFloat(computedStyles.marginTop)
  );
}

function getTimelineItemHeight(
  image: HTMLElement,
  text: HTMLElement
) {
  return (
    image.clientHeight +
    getVerticalMarginHeight(image) +
    text.clientHeight +
    getVerticalMarginHeight(text)
  );
}

function makeTimelineProgressUpdater(timeline: HTMLElement) {
  return function () {
    var timelineClientHeight = timeline.clientHeight;
    var windowOuterHeight = window.outerHeight;
    var timelineBoundingClientRect = timeline.getBoundingClientRect();
    var t = timelineBoundingClientRect.top;
    var b = timelineBoundingClientRect.bottom;
    var result = Math.max(0, t > 0 ? Math.min(timelineClientHeight, windowOuterHeight - t) : Math.min(b, windowOuterHeight));
  
    var numhalf = result / 2 + (t < 0 ? t * -1 : 0);
  
    numhalf = numhalf - Math.max(0, (window.innerHeight - result) / 2);
  
    if (timeline.getBoundingClientRect().bottom <= window.innerHeight) {
      numhalf = timelineClientHeight;
    }
  
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    numhalf = scrollPercent * timelineClientHeight;
  
    // try out gradient
    let firstUnseen = true;
  
    const timelineTexts = timeline.getElementsByClassName(
      styles["timeline-text"]
    ) as HTMLCollectionOf<HTMLElement>;
    const timelineImages = timeline.getElementsByClassName(
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
      timelineImage.classList.remove(toRemove);
      timelineImage.classList.add(toAdd);
      timelineText.classList.remove(toRemove);
      timelineText.classList.add(toAdd);
    }
  
    timeline.style.setProperty("--length-to-highlight", numhalf + "px");
  }
}

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const [jobs, setJobs] = useState<Job[]>([]);
  if (jobs.length === 0) {
    getJobs().then(setJobs);
  }

  useLayoutEffect(() => {
    // current won't be null since we're in a layout effect
    const updateTimelineProgress = makeTimelineProgressUpdater(timelineRef.current!);
    updateTimelineProgress();
    window.addEventListener("scroll", updateTimelineProgress, { passive: true });
    window.addEventListener("resize", updateTimelineProgress);

    return () => {
      window.removeEventListener("scroll", updateTimelineProgress);
      window.removeEventListener("resize", updateTimelineProgress);
    };
  }, [jobs]);

  return (
    <div
      className={`${styles.container} ${styles.unemployed}`}
      style={{ "--job-count": jobs.length } as CSSProperties}
      ref={timelineRef}
    >
      {jobs.map((job, index) =>
        // TODO: When `subgrid` has better support[1], I can use it to put these
        // elements together in a container instead of using a Fragment.
        //
        // [1]: https://caniuse.com/css-subgrid
        <Fragment key={job.description}>
          <div
            className={styles["timeline-image"]}
            style={{ "--job-index": index + 1 } as CSSProperties}
          >
            <ImageComponent {...job.image} />
          </div>
          <div
            className={styles["timeline-text"]}
            style={{ "--job-index": index + 1 } as CSSProperties}
          >
            <p className={styles.role}>
              {job.role} @ {job.company}
              <br />
              {job.description}
            </p>
            <p className={styles.date}>{job.date}</p>
          </div>
        </Fragment>
      )}
    </div>
  );
}
