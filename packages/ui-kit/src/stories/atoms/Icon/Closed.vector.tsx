import React from 'react'
import { colorsMap } from '../../../utils/colors'

const Closed = (theme: 'dark' | 'light' = 'dark') => (
  <svg width="4" height="6" viewBox="0 0 4 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3L-6.95394e-07 5.5L-4.76837e-07 0.5L4 3Z" fill={colorsMap.gray25[theme]} />
  </svg>
)

export { Closed }
