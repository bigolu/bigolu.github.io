"use client";

import styles from "./modal.module.css";
import React, { RefObject, useLayoutEffect, useRef, useState } from "react";

type ModalProps = {
  open: boolean;
  source: RefObject<HTMLDivElement>;
  handleClose: () => void;
  children: React.ReactNode;
};

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
      // NOTE: Use this for height/width since it takes scale() into account
      const rect = props.source.current.getBoundingClientRect();
      const computedStyles = window.getComputedStyle(
        props.source.current,
        null
      );
      const modalViewportWidthPercentage = 65;
      const modalViewportHeightPercentage = 75;
      const modalWidth =
        window.innerWidth * (modalViewportWidthPercentage / 100);
      const modalHeight =
        window.innerHeight * (modalViewportHeightPercentage / 100);
      const widthScale = rect.width / modalWidth;
      const heightScale = rect.height / modalHeight;

      modalRef.current.style.setProperty(
        "--width",
        props.source.current.clientWidth + "px"
      );
      modalRef.current.style.setProperty(
        "--height",
        props.source.current.clientHeight + "px"
      );
      modalRef.current.style.setProperty(
        "--modal-width",
        modalViewportWidthPercentage + "dvi"
      );
      modalRef.current.style.setProperty(
        "--modal-height",
        modalViewportHeightPercentage + "dvb"
      );
      modalRef.current.style.setProperty(
        "--left",
        rect.left + rect.width / 2 - modalWidth / 2 + "px"
      );
      modalRef.current.style.setProperty(
        "--top",
        rect.top + rect.height / 2 - modalHeight / 2 + "px"
      );
      modalRef.current.style.setProperty(
        "--background-color",
        "rgb(var(--timeline-item-background-rgb))"
      );
      modalRef.current.style.setProperty("border-radius", "17px");
      modalRef.current.style.setProperty(
        "border-top",
        computedStyles.borderTop
      );
      modalRef.current.style.setProperty(
        "border-bottom",
        computedStyles.borderBottom
      );
      modalRef.current.style.setProperty(
        "border-right",
        computedStyles.borderRight
      );
      modalRef.current.style.setProperty(
        "border-left",
        computedStyles.borderLeft
      );
      modalRef.current.style.setProperty(
        "border-top-width",
        Number(
          computedStyles.borderTopWidth.substring(
            0,
            computedStyles.borderTopWidth.length - 2
          )
        ) /
          heightScale +
          "px"
      );
      modalRef.current.style.setProperty(
        "border-bottom-width",
        Number(
          computedStyles.borderBottomWidth.substring(
            0,
            computedStyles.borderBottomWidth.length - 2
          )
        ) /
          heightScale +
          "px"
      );
      modalRef.current.style.setProperty(
        "border-left-width",
        Number(
          computedStyles.borderLeftWidth.substring(
            0,
            computedStyles.borderLeftWidth.length - 2
          )
        ) /
          widthScale +
          "px"
      );
      modalRef.current.style.setProperty(
        "border-right-width",
        Number(
          computedStyles.borderRightWidth.substring(
            0,
            computedStyles.borderRightWidth.length - 2
          )
        ) /
          widthScale +
          "px"
      );
      modalRef.current.style.setProperty(
        "--scale",
        `${widthScale}, ${heightScale}`
      );

      // props.source.current.style.filter = 'blur(10px)';
      props.source.current.style.visibility = "hidden";
      modalRef.current.showModal();
      setIsOpen(true);
    } else if (!props.open && isOpen) {
      modalRef.current.close();
      props.source.current.style.visibility = "unset";
      // props.source.current.style.filter = 'none';
      setIsOpen(false);
    }
  }, [isOpen, props.open, props.source]);

  return (
    <dialog className={styles.container} ref={modalRef}>
      {props.children}
    </dialog>
  );
}
