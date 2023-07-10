"use client"

import { AssertionError } from 'assert';
import Portfolio from './components/portfolio/page';
import Resume from './components/resume/page';
import styles from './page.module.css'
import { ReactElement, useState, MouseEvent } from 'react';

export default function Code() {
  const tabPagesByName: { [key: string]: ReactElement } = {
    Portfolio: <Portfolio></Portfolio>,
    Resume: <Resume></Resume>,
  }
  const tabNames = Object.keys(tabPagesByName);
  const [activeTabName, setActiveTab] = useState(tabNames[0]);
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    function assertIsString(val: any): asserts val is string {
      if (typeof val !== "string") {
        throw new AssertionError({message: "Not a string!"});
      }
    }
    const x = event.currentTarget.dataset.tabname
    assertIsString(x)
    setActiveTab(x)
  }
  const tabButtons = tabNames.map((tabname) =>
    <button data-tabname={tabname} onClick={handleClick} className={styles['tab']} key={tabname}>
      {tabname}
    </button>
  );

  const tabPage = tabPagesByName[activeTabName];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className={styles['tab-container']}>
        {tabButtons}
      </div>
      <div style={{width: '80%'}}>
        {tabPage}
      </div>
    </main>
  );
}
