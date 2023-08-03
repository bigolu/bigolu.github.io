import styles from './portfolioCard.module.css'
import { useState, MouseEvent, useRef } from 'react';
import Modal from '../modal/modal';
import { Gallery, GalleryImage, GalleryVideo } from 'components/gallery/gallery';

export type PortfolioCardProps = {
  name: string,
  date: string,
  description: string,
  tags: string[],
  links: string[],
  teammates: string[],
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
      <ol>
        {tagListItems}
      </ol>
    );
  }

  function handleCardClick(_event: MouseEvent<HTMLElement>) {
    setOpen(true);
  }

  function handleModalClose() {
    setOpen(false);
  }

  return (
    <div className={styles.container} ref={cardRef} onClick={handleCardClick}>
      <p>{props.name}</p>
      <p>{props.description}</p>
      {makeTagList(props.tags)}

      <Modal open={open} source={cardRef} handleClose={handleModalClose}>
        <div className={styles['modal-container']}>
          <Gallery media={props.media ?? []} />
          <div>
            <p>{props.name}</p>
            <p>{props.description}</p>
            {makeTagList(props.tags)}
            <button className={styles.close} onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); handleModalClose()}}>X</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}