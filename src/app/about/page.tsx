import styles from './page.module.css'
import Image from 'next/image'
import profilePicture from './static_biggs.png'
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
    'front-end': [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
    ],
    'back-end': [
      'Java',
      'Python',
      'Spring',
    ],
    'other': [
      'Shell (POSIX, Bash, Fish)',
      'Nix',
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
          <ul>
            {skills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </Fragment>
      );
    }).map((fragment, index) => <li className={styles.skillList} key={index}>{fragment}</li>);

    return (
      <ul>
        {skillLists}
      </ul>
    );
  }

  return (
    <main className={styles.container}>
      <ImageComponent className={styles.image} {...imageProps} />
      <div className={`nes-container ${styles['greeting-container']}`} style={{padding: '5px'}}>
        Hey, my name is Biggie and I&apos;m a full-stack software engineer. If you&apos;re here regarding a job oppurtunity you can send an email to <Email />.
      </div>
      <h1>skills</h1>
      {makeSkillLists()}
      <h1>find me on:</h1>
      <ul className={styles['skill-list']}>
        {links.map(link => <li key={link.href}><ExternalLink href={link.href}>{link.text}</ExternalLink></li>)}
      </ul>
    </main>
  );
}
