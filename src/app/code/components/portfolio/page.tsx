import styles from './page.module.css'

export default function Portfolio() {
  const data = {
    p1: {
      name: 'p1',
      description: 'The first thing I made.'
    },
    p2: {
      name: 'p2',
      description: 'The second thing I made.'
    },
  }
  const projects = Object.values(data).map((datum) =>
    <div className={styles.project} key={datum.name}>
      <p>{datum.name}</p>
      <p>{datum.description}</p>
    </div>
  )

  return (
    <div className={styles.container}>
      {projects}
    </div>
  )
}
