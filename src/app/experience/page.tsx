"use client";

import styles from "./page.module.css";
import React, {
  useLayoutEffect,
  useRef,
  useState,
  CSSProperties,
  Fragment,
  useEffect,
} from "react";
import { ImageComponent, ImageProps } from "components/image/image";

type Job = {
  role: string;
  company: string;
  image: ImageProps;
  description: string;
  date: string;
};

async function fetchJobs(setJobs: React.Dispatch<React.SetStateAction<Job[]>>) {
  const response = await fetch("/json/jobs.json");
  const jobs = await response.json();
  setJobs(jobs);
}

function updateTimelineProgress(
  setTimelineProgressPercentage: React.Dispatch<React.SetStateAction<number>>,
) {
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

  setTimelineProgressPercentage(scrollPercentage);
}

// TODO: Consider intersection observer API:
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
function updateTimelineFade(
  timeline: HTMLElement,
  setShouldHideTopFade: React.Dispatch<React.SetStateAction<boolean>>,
  setShouldHideBottomFade: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const didReachTopOfTimeline =
    window.scrollY <= timeline.getBoundingClientRect().top;
  setShouldHideTopFade(didReachTopOfTimeline);

  const didReachBottomOfTimeline =
    window.innerHeight >= timeline.getBoundingClientRect().bottom;
  setShouldHideBottomFade(didReachBottomOfTimeline);
}

function addViewportChangeHandler(handler: (event: Event) => any) {
  window.addEventListener("scroll", handler);
  window.addEventListener("resize", handler);
}

function removeViewportChangeHandler(handler: (event: Event) => any) {
  window.removeEventListener("scroll", handler);
  window.removeEventListener("resize", handler);
}

export default function Experience() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetchJobs(setJobs);
  }, []);

  const [shouldHideTopFade, setShouldHideTopFade] = useState<boolean>(false);
  const [shouldHideBottomFade, setShouldHideBottomFade] =
    useState<boolean>(false);
  const [timelineProgressPercentage, setTimelineProgressPercentage] =
    useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const isTimelineEmpty = jobs.length === 0;
    if (isTimelineEmpty) {
      return;
    }

    // current won't be null since we're in a layout effect
    const timeline = timelineRef.current!;
    const updateTimelineEffects = () => {
      updateTimelineProgress(setTimelineProgressPercentage);
      updateTimelineFade(
        timeline,
        setShouldHideTopFade,
        setShouldHideBottomFade,
      );
    };

    updateTimelineEffects();

    addViewportChangeHandler(updateTimelineEffects);

    return () => {
      removeViewportChangeHandler(updateTimelineEffects);
    };
  }, [jobs]);

  return (
    <Fragment>
      <div
        className={`${styles["timeline-top-fade"]} ${
          shouldHideTopFade ? styles.hide : ""
        }`}
      />
      <div
        className={`${styles.timeline} ${styles.unemployed}`}
        style={
          {
            "--job-count": jobs.length,
            "--timeline-scroll-percentage": `${timelineProgressPercentage}%`,
          } as CSSProperties
        }
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
              <p>
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
        className={`${styles["timeline-bottom-fade"]} ${
          shouldHideBottomFade ? styles.hide : ""
        }`}
      />
    </Fragment>
  );
}
