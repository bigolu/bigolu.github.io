"use client";

import PortfolioCard, {
  PortfolioCardProps,
} from "./components/portfolioCard/portfolioCard";
import styles from "./page.module.css";
import { useState } from "react";

async function getPortfolioItems() {
  const response = await fetch("/json/portfolio-items.json");
  const portfolioItems = await response.json();

  return portfolioItems;
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioCardProps[]>(
    []
  );
  if (portfolioItems.length === 0) {
    getPortfolioItems().then(setPortfolioItems);
  }

  return (
    <div className={styles.container}>
      {portfolioItems.map((portfolioItem) => (
        <PortfolioCard {...portfolioItem} key={portfolioItem.name} />
      ))}
    </div>
  );
}
