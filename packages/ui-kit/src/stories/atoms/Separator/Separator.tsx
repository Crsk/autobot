import React from 'react'
import styles from './Separator.module.scss'

type SeparatorProps = {
  theme: 'light' | 'dark'
}

const Separator = ({ theme }: SeparatorProps) => <div className={`${styles.container} ${styles.container}--${theme}`} />

export { Separator }
