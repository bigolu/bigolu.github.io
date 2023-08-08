import styles from './page.module.css'
import { ImageComponent, ImageProps } from 'components/image/image'
import Email from 'components/email/email';
import { Fragment } from 'react';
import { ExternalLink } from 'components/external-link/component';

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
    'Front-End': [
      'React',
      'Next.js',
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
    ],
    'Back-End': [
      'Spring',
      'Flask',
      'OpenAPI',
      'Elasticsearch',
      'Java',
      'Python',
    ],
    'DevOps': [
      'POSIX shell',
      'Bash',
      'Fish',
      'Nix',
      'Unix-like Operating Systems',
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
      <div>
        <ImageComponent className={styles.image} {...imageProps} />
        <div className={`nes-container ${styles['greeting-container']}`} style={{padding: '5px'}}>
          Hey, my name is Olaolu, but I go by Biggie. I&apos;m a full-stack software engineer and I&apos;m looking for my next role so if you&apos;re looking for a developer, send an email to <Email />.
        </div>
      </div>
      <div>
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
