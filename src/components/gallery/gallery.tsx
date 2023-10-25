import { CSSProperties, useRef, useState } from "react";
import styles from "./gallery.module.css";
import Image from "next/image";
import { Icon, IconType } from "components/icon/icon";

export enum GalleryMediaType {
  Image = "Image",
  Video = "Video",
}

export type GalleryImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  _type: GalleryMediaType.Image;
};

export type GalleryVideo = {
  source?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  embed?: object;
  _type: GalleryMediaType.Video;
};

export type GalleryProps = {
  media: (GalleryImage | GalleryVideo)[];
};

export function Gallery({ media, ...props }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function makeMedia(media: GalleryImage | GalleryVideo, index: Number) {
    const commonProps = {
      tabIndex: -1,
    };

    // I get an error when I set the key using the spread operator so I have to set it explicitly. idk why I have to
    // do this though.
    // issue related to this problem: https://github.com/zillow/react-slider/issues/288
    const key = index.toString();

    if (media._type === GalleryMediaType.Image) {
      return (
        <Image
          key={key}
          {...commonProps}
          className={styles.image}
          alt={media.alt}
          src={media.url}
          width={media.width}
          height={media.height}
        />
      );
    } else {
      if (media.embed) {
        return <iframe key={key} {...commonProps} {...media.embed}></iframe>;
      } else if (media.source) {
        const source = media.source;
        return (
          <video key={key} {...commonProps} className={styles.video}>
            <source
              src={source.url}
              height={source.height}
              width={source.width}
            />
            <p>{source.alt}</p>
          </video>
        );
      } else {
        throw new Error("Invalid video format: no source or embed");
      }
    }
  }

  function makeMediaSet(media: (GalleryImage | GalleryVideo)[]) {
    const elements = media.map(makeMedia);

    return (
      <div className={styles.wrapper}>
        <div
          className={styles["media-container"]}
          style={{ "--active-item-index": activeIndex } as CSSProperties}
        >
          {elements}
        </div>
      </div>
    );
  }

  function makeThumbnailMedia(
    media: GalleryImage | GalleryVideo,
    index: number
  ) {
    function handleClick() {
      setActiveIndex(index);
    }

    const commonProps = {
      onClick: handleClick,
      className: index === activeIndex ? styles.active : "",
    };

    // I get an error when I set the key using the spread operator so I have to set it explicitly. idk why I have to
    // do this though.
    // issue related to this problem: https://github.com/zillow/react-slider/issues/288
    const key = index.toString();

    if (media._type === GalleryMediaType.Image) {
      commonProps.className += ` ${styles["image-thumbnail"]}`;
      return (
        <Image
          key={key}
          {...commonProps}
          alt={media.alt}
          src={media.url}
          width={media.width}
          height={media.height}
        />
      );
    } else {
      commonProps.className += ` ${styles["video-thumbnail"]}`;
      return <Icon key={key} {...commonProps} type={IconType.Video} />;
    }
  }

  function makeThumbnailMediaSet(media: (GalleryImage | GalleryVideo)[]) {
    const elements = media.map(makeThumbnailMedia);

    return <div className={styles["thumbnail-container"]}>{elements}</div>;
  }

  const mediaSet = makeMediaSet(media);
  const thumbnailMediaSet = makeThumbnailMediaSet(media);

  return (
    <div className={styles.container} {...props}>
      {mediaSet}
      {thumbnailMediaSet}
    </div>
  );
}
