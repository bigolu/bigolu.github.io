"use client"

import styles from './modal.module.css'
import React, { RefObject, useLayoutEffect, useRef, useState } from 'react';

type ModalProps = {
  open: boolean,
  source: RefObject<HTMLDivElement>,
  handleClose: () => void,
  children: React.ReactNode,
}

export default function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (!props.source.current) {
      return;
    }
    if (!modalRef.current) {
      return;
    }

    if (props.open && !isOpen) {
      const rect = props.source.current.getBoundingClientRect();
      modalRef.current.style.setProperty('--width', props.source.current.clientWidth + 'px');
      modalRef.current.style.setProperty('--height', props.source.current.clientHeight + 'px');
      modalRef.current.style.setProperty('--left', rect.left.toString() + 'px');
      modalRef.current.style.setProperty('--top', rect.top.toString() + 'px');
      modalRef.current.style.setProperty('--background-color', 'rgb(var(--timeline-item-background-rgb))');
      // TODO: find bg color in ancestors, set border[-radius]

      props.source.current.style.visibility = 'hidden';
      modalRef.current.showModal();
      setIsOpen(true);
    } else if (!props.open && isOpen) {
      modalRef.current.close();
      props.source.current.style.visibility = 'unset';
      setIsOpen(false);
    }
  }, [isOpen, props.open, props.source]);

  return (
    <dialog className={styles.container} ref={modalRef}>
      {props.children}
    </dialog>
  );
}
