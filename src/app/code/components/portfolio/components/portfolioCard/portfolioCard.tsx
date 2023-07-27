import { ImageProps } from 'components/image/image';
import styles from './portfolioCard.module.css'
import { useState, MouseEvent, useRef } from 'react';
import Modal from '../modal/modal';

export type PortfolioCardProps = {
  name: string,
  date: string,
  description: string,
  tags: string[],
  links: string[],
  teammates: string[],
  thumbnailImageUrl: string,
  images: ImageProps[],
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
        <div>
          <p>{props.name}</p>
          <p>{props.description}</p>
          {makeTagList(props.tags)}
          <p> TODO: show the assets </p>
          <button className={styles.close} onClick={(event: MouseEvent<HTMLElement>) => {event.stopPropagation(); handleModalClose()}}>X</button>
        </div>
      </Modal>
    </div>
  );
}