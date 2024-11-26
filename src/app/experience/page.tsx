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

function updateTimelineProgress(timeline: HTMLElement) {
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.scrollHeight;
  const hasScrollbar = bodyHeight > windowHeight;

  let scrollPercentage = null;
  if (!hasScrollbar) {
    scrollPercentage = 100;
  } else {
    scrollPercentage =
      (window.scrollY / (document.body.offsetHeight - windowHeight)) * 100;
  }

  timeline.style.setProperty(
    "--timeline-scroll-percentage",
    `${scrollPercentage}%`
  );
}

// TODO: Consider intersection observer API:
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
function updateTimelineFade(
  timeline: HTMLElement,
  bottomFade: HTMLElement,
  topFade: HTMLElement
) {
  const didReachBottomOfTimeline =
    window.innerHeight >= timeline.getBoundingClientRect().bottom;
  if (didReachBottomOfTimeline) {
    bottomFade.classList.add(styles.hide);
  } else {
    bottomFade.classList.remove(styles.hide);
  }

  const didReachTopOfTimeline =
    window.scrollY <= timeline.getBoundingClientRect().top;
  if (didReachTopOfTimeline) {
    topFade.classList.add(styles.hide);
  } else {
    topFade.classList.remove(styles.hide);
  }
}

function addViewportChangeHandler(handler: (event: Event) => any) {
  window.addEventListener("scroll", handler);
  window.addEventListener("resize", handler);
}

function removeViewportChangeHandler(handler: () => void) {
  window.removeEventListener("scroll", handler);
  window.removeEventListener("resize", handler);
}

export default function Experience() {
  let [jobs, setJobs] = useState<Job[]>([]);
  if (jobs.length === 0) {
    getJobs().then(setJobs);
  }

  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineBottomFadeRef = useRef<HTMLDivElement>(null);
  const timelineTopFadeRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    // current won't be null since we're in a layout effect
    const timeline = timelineRef.current!;
    const timelineBottomFade = timelineBottomFadeRef.current!;
    const timelineTopFade = timelineTopFadeRef.current!;
    const updateTimelineEffects = () => {
      updateTimelineProgress(timeline);
      updateTimelineFade(timeline, timelineBottomFade, timelineTopFade);
    };

    updateTimelineEffects();

    addViewportChangeHandler(updateTimelineEffects);

    return () => {
      removeViewportChangeHandler(updateTimelineEffects);
    };
  }, [jobs]);

  return (
    <Fragment>
      <div ref={timelineTopFadeRef} className={styles["timeline-top-fade"]} />
      <div
        className={`${styles.timeline} ${styles.unemployed}`}
        style={{ "--job-count": jobs.length } as CSSProperties}
        ref={timelineRef}
      >
        {jobs.map((job, index) => (
          // TODO: When `subgrid` has better support[1], I can use it to put these
          // elements together in a container instead of using a Fragment.
          //
          // [1]: https://caniuse.com/css-subgrid
          <Fragment key={job.description}>
            <ImageComponent
              className={styles["job-logo"]}
              style={{ "--job-index": index + 1 } as CSSProperties}
              {...job.image}
            />
            <div
              className={styles["job-card"]}
              style={{ "--job-index": index + 1 } as CSSProperties}
            >
              <p className={styles.role}>
                {job.role} @ {job.company}
                <br />
                {job.description}
              </p>
              <p className={styles["job-card-date"]}>{job.date}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        ref={timelineBottomFadeRef}
        className={styles["timeline-bottom-fade"]}
      />
    </Fragment>
  );
}
