"use client";

import { Icon, IconType } from "components/icon/icon";
import { useLayoutEffect, useRef } from "react";
import styles from "./email.module.css";

export default function Email() {
  const linkTextRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    // I'm assserting that this is non-null since this effect runs after the email element in rendered in the DOM.
    const linkTextElement = linkTextRef.current!;
    const linkElement = linkRef.current!;

    const base64EncodedEmail = "Y29kZUBiaWdvLmx1";
    const decodedEmail = atob(base64EncodedEmail);
    linkElement.setAttribute("href", `mailto:${decodedEmail}`);
    linkTextElement.textContent = decodedEmail;
  });

  return (
    <a ref={linkRef}>
      <Icon className={styles.email} type={IconType.Mail} />
      <span ref={linkTextRef}></span>
    </a>
  );
}
