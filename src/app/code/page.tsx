"use client"

import Portfolio from './components/portfolio/page';
import Resume from './components/resume/page';
import styles from './page.module.css'
import { ReactElement, useState } from 'react';

export default function Code() {
  const tabPagesByName: { [key: string]: ReactElement } = {
    Portfolio: <Portfolio></Portfolio>,
    Resume: <Resume></Resume>,
  }
  const tabNames = Object.keys(tabPagesByName);
  const [activeTabName, setActiveTab] = useState<string>(tabNames[0]);
  function makeTabButton(tabName: string) {
    function handleClick() {
      setActiveTab(tabName)
    }

    return (
      <button onClick={handleClick} className={styles.tab} key={tabName}>
        {tabName}
      </button>
    );
  }
  const tabButtons = tabNames.map(makeTabButton);

  const tabPage = tabPagesByName[activeTabName];

  return (
    <main className="flex min-h-screen flex-col items-center gap-6">
      <div className={styles['tab-container']}>
        {tabButtons}
      </div>
      <div style={{width: '100%',}}>
        {tabPage}
      </div>
    </main>
  );
}
