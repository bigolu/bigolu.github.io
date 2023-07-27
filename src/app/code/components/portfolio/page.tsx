import PortfolioCard, { PortfolioCardProps } from './components/portfolioCard/portfolioCard';
import styles from './page.module.css';

export default function Portfolio() {
  const portfolioItemData: PortfolioCardProps[] = [
    {
      name: 'project #1',
      date: 'Summer 2015',
      description: 'The first project I ever made.',
      tags: [
        'backend',
        'frontend'
      ],
      links: [

      ],
      teammates: [

      ],
      thumbnailImageUrl: "/image/rutgers.svg",
      images: [
        {
         both: {
           url: "/image/rutgers.svg",
           width: 248,
           height: 219.38
         },
         alt: "Rutgers logo"
        }
      ],
    },
    {
      name: 'project #2',
      date: 'Summer 2016',
      description: 'The second project I made.',
      tags: [
        'mobile',
      ],
      links: [

      ],
      teammates: [

      ],
      thumbnailImageUrl: "/image/rutgers.svg",
      images: [
        {
         both: {
           url: "/image/rutgers.svg",
           width: 248,
           height: 219.38
         },
         alt: "Rutgers logo"
        }
      ],
    },
  ];

  function makePortfolioCard(portfolioItemDatum: PortfolioCardProps) {
    return <PortfolioCard {...portfolioItemDatum} key={portfolioItemDatum.name} />;
  }

  const portfolioCards = portfolioItemData.map(makePortfolioCard);

  return (
    <div className={styles.container}>
      {portfolioCards}
    </div>
  );
}
