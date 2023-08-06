"use client"

import { useLayoutEffect, useRef } from "react";

export default function Email() {
  const ref = useRef<HTMLAnchorElement>(null);
  useLayoutEffect(() => {
    // I'm assserting that this is non-null since this effect runs after the email element in rendered in the DOM.
    const emailElement = ref.current as HTMLAnchorElement;

    const base64EncodedEmail = "am9ic0BiaWdvLmx1";
    const decodedEmail = atob(base64EncodedEmail);
    emailElement.setAttribute('href', `mailto:${decodedEmail}`);
    emailElement.textContent = decodedEmail;
  });

  return (
    <a ref={ref}></a>
  );
}