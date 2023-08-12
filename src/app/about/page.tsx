import styles from './page.module.css'
import { ImageComponent, ImageProps } from 'components/image/image'
import Email from 'components/email/email';
import { Fragment } from 'react';
import { ExternalLink } from 'components/external-link/component';
import Link from 'next/link'

export default function About() {
  const imageProps: ImageProps = {
    "light": {
      "url": "/image/biggs-light.png",
      "width": 407,
      "height": 436
    },
    "dark": {
      "url": "/image/biggs-dark.png",
      "width": 50,
      "height": 76
    },
    alt: "Picture of the author"
  };

  const skills = {
    'Front End': [
      'React',
      'Next.js',
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
    ],
    'Back End': [
      'Spring',
      'Flask',
      'OpenAPI',
      'Elasticsearch',
      'Java',
      'Python',
    ],
    'Other': [
      'POSIX shell',
      'Bash',
    ],
  };

  const links = [
    {
      'href': 'https://github.com/bigolu',
      'text': 'GitHub',
    },
    {
      'href': 'https://www.linkedin.com/in/bigolu',
      'text': 'LinkedIn',
    },
    {
      'href': 'https://stackblitz.com/@bigolu',
      'text': 'StackBlitz',
    }
  ];

  function makeSkillLists() {
    const skillLists = Object.entries(skills).map(([subject, skills]) => {
      return (
        <Fragment key={subject}>
          <h2>{subject}</h2>
          <ul className={styles.list}>
            {skills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </Fragment>
      );
    }).map((fragment, index) => <li className={styles.skillList} key={index}>{fragment}</li>);

    return (
      <ul className={styles.topLevelLists}>
        {skillLists}
      </ul>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.me}>
        <ImageComponent className={styles.image} {...imageProps} />
        <div className={`nes-container ${styles['greeting-container']}`} style={{padding: '5px'}}>
          Hey, my name is Olaolu, but I go by Biggie. I&apos;m a full-stack software engineer and I&apos;m looking for my next role so if you&apos;re looking for a developer, send an email to <Email />. {"You can find all of my experience on the"} <Link href='/portfolio'>portfolio</Link> {'and'} <Link href='/experience'>experience</Link> {"pages, but if you prefer a summary you can look at my"} <ExternalLink href='https://docs.google.com/viewerng/viewer?url=https://github.com/bigolu/jobs/raw/master/resume.pdf'>single-page resume</ExternalLink>.
        </div>
      </div>
      <div className={styles.skills}>
        <h1>skills:</h1>
        {makeSkillLists()}
      </div>
      <div>
        <h1>find me on:</h1>
        <ul className={styles.topLevelLists}>
          {links.map(link => <li key={link.href}><ExternalLink href={link.href}>{link.text}</ExternalLink></li>)}
        </ul>
      </div>
    </main>
  );
}
