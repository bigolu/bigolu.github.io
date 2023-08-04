import { useRef } from 'react';
import styles from './gallery.module.css';
import Image from 'next/image';

export enum GalleryMediaType {
  Image = 'Image',
  Video = 'Video',
}

export type GalleryImage = {
  url: string,
  width: number,
  height: number,
  alt: string,
  _type: GalleryMediaType.Image,
};

export type GalleryVideo = {
  source?: {
    url: string,
    width: number,
    height: number,
    alt: string,
  },
  embed?: object,
  _type: GalleryMediaType.Video,
};

export type GalleryProps = {
  media: (GalleryImage|GalleryVideo)[],
};

export function Gallery({media, ...props}: GalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<(HTMLElement|SVGElement|null)[] | null>(null);

  function getThumbnails() {
    if (!thumbnailsRef.current) {
      thumbnailsRef.current = new Array(media.length).fill(null);
    }
    return thumbnailsRef.current;
  }

  function makeMedia(media: GalleryImage|GalleryVideo, index: Number) {
    const commonProps = {
      tabIndex: -1,
      key: index.toString()
    };

    if (media._type === GalleryMediaType.Image) {
      return (
        <Image {...commonProps} className={styles.image} alt={media.alt} src={media.url} width={media.width} height={media.height}/>
      );
    } else {
      if (media.embed) {
        return (
          <iframe {...commonProps} {...media.embed}></iframe>
        );
      } else if (media.source) {
        const source = media.source;
        return (
          <video {...commonProps} className={styles.video}>
            <source src={source.url} height={source.height} width={source.width}/>
            <p>{source.alt}</p>
          </video>
        );
      } else {
        throw new Error('Invalid video format: no source or embed');
      }
    }
  }

  function makeMediaSet(media: (GalleryImage|GalleryVideo)[]) {
    const elements = media.map(makeMedia);

    return (
      <div className={styles.wrapper}>
        <div ref={galleryRef} className={styles['media-container']}>
          {elements}
        </div>
      </div>
    );
  }

  function makeThumbnailMedia(media: GalleryImage|GalleryVideo, index: number) {
    function thumbnailsRefCallback(thumbnailElement: HTMLElement|SVGElement|null) {
      const thumbnails = getThumbnails();
      thumbnails[index] = thumbnailElement;
    }

    function handleClick() {
      const galleryContainer = galleryRef.current;
      if (!galleryContainer) {
        return;
      }
      galleryContainer.style.setProperty('--active-item-index', index.toString());

      getThumbnails().forEach((thumbnail, currentIndex) => {
        if (index === currentIndex) {
          thumbnail?.classList.add(styles.active);
        } else {
          thumbnail?.classList.remove(styles.active);
        }
      });
    }

    const commonProps = {
      onClick: handleClick,
      key: index.toString(),
      ref: thumbnailsRefCallback,
      className: '',
    };

    if (index === 0) {
      commonProps.className = styles.active;
    };

    if (media._type === GalleryMediaType.Image) {
      commonProps.className += ` ${styles['image-thumbnail']}`;
      return (
        <Image {...commonProps} alt={media.alt} src={media.url} width={media.width} height={media.height}/>
      );
    } else {
      commonProps.className += ` ${styles['video-thumbnail']}`;
      return (
        <svg {...commonProps} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <use href="image/video-thumbnail.svg#icon"/>
        </svg>
      );
    }
  }


  function makeThumbnailMediaSet(media: (GalleryImage|GalleryVideo)[]) {
    const elements = media.map(makeThumbnailMedia);

    return (
      <div className={styles['thumbnail-container']}>
        {elements}
      </div>
    );
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
