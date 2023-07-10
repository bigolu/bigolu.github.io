"use client"

import { createPortal } from 'react-dom';
import styles from './modal.module.css'
import React, { useLayoutEffect, useState } from 'react';

interface ModalProps {
  width: number,
  height: number,
  left: number,
  top: number,
  data: any,
  isOpen: boolean,
}

export default function Modal(props: ModalProps) {
  const inlineStyles = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    'backgroundColor': 'white',
    left: props.left,
    top: props.top,
  }
  const modalContent = (
    <div className={styles.container} style={inlineStyles}>
      <p>Hey there, I{"'"}m a modal.</p>
    </div>
  );

  const [wrapperElement, setWrapperElement] = useState<HTMLElement|null>(null);
  function createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }
  useLayoutEffect(() => {
    const wrapperId = 'my-modal-id';
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element != null && element.parentNode) {
        element!.parentNode.removeChild(element);
      }
    }
  }, []);

  return (wrapperElement && props.isOpen) ? createPortal(modalContent, wrapperElement) : null;
}
