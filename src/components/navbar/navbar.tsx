import styles from './navbar.module.css'
import Link from 'next/link'

function makeLink([displayName, route]: string[]) {
  return (
    <li className={styles.navbarItem} key={route}>
      <Link href={`/${route}`}>{displayName}</Link>
    </li>
  );
}

export default function NavbarComponent() {
  const routesByDisplayName = {
    'about': 'about',
    'portfolio': 'portfolio',
    'experience': 'experience',
  };

  const links = Object.entries(routesByDisplayName).map(makeLink);

  return (
    <ul className={styles.container}>
      {links}
    </ul>
  )
}
