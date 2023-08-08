import styles from './portfolioCard.module.css'
import { useState, MouseEvent, useRef, CSSProperties } from 'react';
import Modal from '../modal/modal';
import { Gallery, GalleryImage, GalleryVideo } from 'components/gallery/gallery';

type Link = {
  href: string,
  text: string,
};

export type PortfolioCardProps = {
  name: string,
  date: string,
  description: string,
  tags: string[],
  links?: Link[],
  teammates?: string[],
  thumbnailImageUrl: string,
  media?: (GalleryImage|GalleryVideo)[],
};

export default function PortfolioCard(props: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  function makeTagListItem(tag: string) {
    return (
      <li className={styles.tag} key={tag}>
        {tag}
      </li>
    );
  }

  function makeTagList(tags: string[]) {
    const tagListItems = tags.map(makeTagListItem);
    return (
      <ol className={styles.taglist}>
        {tagListItems}
      </ol>
    );
  }

  function makeTeammateList(teammates: string[]) {
    return (
      <p>
        Teammates: {teammates.join(', ')}
      </p>
    );
  }

  function makeLinkList(links: Link[]) {
    return (
      <p>
        Links: {links.map((link: Link) => <a target='_blank' key={link.href} href={link.href}>{link.text}</a>)}
      </p>
    );
  }

  function handleCardClick(_event: MouseEvent<HTMLElement>) {
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  return (
    <div className={styles.container} ref={cardRef} onClick={handleCardClick} style={{'--thumbnail-image-url': `url("${props.thumbnailImageUrl}")`} as CSSProperties}>
      <p>{props.name}</p>
      <p>{props.description}</p>
      {makeTagList(props.tags)}
      <p className={styles.date}>{props.date}</p>

      <Modal open={open} source={cardRef} handleClose={handleModalClose}>
        <div className={styles['modal-container']}>
          <Gallery media={props.media ?? []} />
          <div>
            <p>{props.name}</p>
            <p>{props.date}</p>
            <p>{props.description}</p>
            {makeTagList(props.tags)}
            {props.teammates ? makeTeammateList(props.teammates) : null}
            {props.links ? makeLinkList(props.links) : null}
          </div>
          <button className={styles.close} onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); handleModalClose()}}>X</button>
        </div>
      </Modal>
    </div>
  );
}