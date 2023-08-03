import { Fragment, ReactElement, useRef } from 'react';
import styles from './gallery.module.css';
import Image from 'next/image';

export enum GalleryMediaType {
  Image,
  Video,
}

export type GalleryImage = {
  url: string,
  width: number,
  height: number,
  alt: string,
  _type: GalleryMediaType.Image,
};

export type GalleryVideo = {
  url: string,
  width: number,
  height: number,
  alt: string,
  embed?: ReactElement,
  _type: GalleryMediaType.Video,
};

export type GalleryProps = {
  media: (GalleryImage|GalleryVideo)[],
};

function makeMedia(media: GalleryImage|GalleryVideo, index: Number) {
  if (media._type === GalleryMediaType.Image) {
    return (
      <Image key={index.toString()} className={styles.image} alt={media.alt} src={media.url} width={media.width} height={media.height}/>
    );
  } else {
    return media.embed ? <Fragment key={index.toString()}>{media.embed}</Fragment> : (
      <video key={index.toString()} className={styles.video}>
        <source src={media.url} height={media.height} width={media.width}/>
        <p>{media.alt}</p>
      </video>
    );
  }
}

function makeMediaSet(media: (GalleryImage|GalleryVideo)[]) {
  const elements = media.map(makeMedia);

  return (
    <div className={styles['media-container']}>
      {elements}
    </div>
  );
}

function makeThumbnailMedia(media: GalleryImage|GalleryVideo, index: Number) {
  if (media._type === GalleryMediaType.Image) {
    return (
      <Image key={index.toString()} className={styles['image-thumbnail']} alt={media.alt} src={media.url} width={media.width} height={media.height}/>
    );
  } else {
    return (
      <div key={index.toString()} className={styles['video-thumbnail']}></div>
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

export function Gallery({media, ...props}: GalleryProps) {
  const mediaSet = makeMediaSet(media);
  const thumbnailMediaSet = makeThumbnailMediaSet(media);

  return (
    <div className={styles.container} {...props}>
      {mediaSet}
      {thumbnailMediaSet}
    </div>
  );
}
