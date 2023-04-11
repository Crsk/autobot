/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable global-require */
import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface FeatureItem {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Drag & Drop',
    Svg: require('@site/static/img/node.svg').default,
    description: (
      <>
        Move the boxes according to your needs
      </>
    ),
  },
  {
    title: 'Talk to the IA',
    Svg: require('@site/static/img/chat_ia.svg').default,
    description: (
      <>
        Tell us what each box is about
      </>
    ),
  },
  {
    title: 'Build',
    Svg: require('@site/static/img/rocket.svg').default,
    description: (
      <>
        Deploy, we're ready to rock!
      </>
    ),
  },
]

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
