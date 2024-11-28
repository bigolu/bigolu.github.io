"use client";

import PortfolioCard, {
  PortfolioCardProps,
} from "./components/portfolioCard/portfolioCard";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

async function fetchPortfolioItems(
  setPortfolioItems: React.Dispatch<React.SetStateAction<PortfolioCardProps[]>>,
) {
  const response = await fetch("/json/portfolio-items.json");
  const portfolioItems = await response.json();
  setPortfolioItems(portfolioItems);
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioCardProps[]>(
    [],
  );
  useEffect(() => {
    fetchPortfolioItems(setPortfolioItems);
  }, []);

  return (
    <div className={styles.container}>
      {portfolioItems.map((portfolioItem) => (
        <PortfolioCard {...portfolioItem} key={portfolioItem.name} />
      ))}
    </div>
  );
}
