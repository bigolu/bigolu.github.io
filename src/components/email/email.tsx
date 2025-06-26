"use client";

import { useLayoutEffect, useRef } from "react";

export default function Email() {
  const emailRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    // I'm assserting that this is non-null since this effect runs after the
    // email element in rendered into the DOM.
    emailRef.current!.textContent = atob("PGNvZGUgYXQgYmlnby5sdT4=");
  });

  return <span ref={emailRef}></span>;
}
