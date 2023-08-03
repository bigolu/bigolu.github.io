import { GalleryMediaType } from 'components/gallery/gallery';
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
      media: [
        {
         _type: GalleryMediaType.Image,
         url: "/image/rutgers.svg",
         width: 248,
         height: 219.38,
         alt: "Rutgers logo"
        },
        {
          _type: GalleryMediaType.Video,
          url: "",
          width: -1,
          height: -1,
          alt: "",
          embed: <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/N-pzoutwgU0" title="YouTube video player" style={{border: '0'}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        },
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
      media: [
        {
         _type: GalleryMediaType.Image,
         url: "/image/rutgers.svg",
         width: 248,
         height: 219.38,
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
