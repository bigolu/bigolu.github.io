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
function updateTimelineFade(timeline: HTMLElement, fade: HTMLElement) {
  const didReachBottomOfTimeline =
    timeline.getBoundingClientRect().bottom <= window.innerHeight;

  if (didReachBottomOfTimeline) {
    fade.classList.add(styles.hide);
  } else {
    fade.classList.remove(styles.hide);
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
  const timelineFadeRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    // current won't be null since we're in a layout effect
    const timeline = timelineRef.current!;
    const timelineFade = timelineFadeRef.current!;
    const viewportChangeHandler = () => {
      updateTimelineProgress(timeline);
      updateTimelineFade(timeline, timelineFade);
    };

    viewportChangeHandler();

    addViewportChangeHandler(viewportChangeHandler);

    return () => {
      removeViewportChangeHandler(viewportChangeHandler);
    };
  }, [jobs]);

  return (
    <Fragment>
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
      <div ref={timelineFadeRef} className={styles["timeline-fade"]} />
    </Fragment>
  );
}
