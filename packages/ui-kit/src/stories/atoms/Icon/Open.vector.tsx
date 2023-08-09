import React from 'react'
import { colorsMap } from '../../../utils/colors'

const Open = (theme: 'dark' | 'light' = 'dark') => (
  <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 4L1.27146e-07 -3.97233e-08L5 -4.76837e-07L2.5 4Z" fill={colorsMap.gray25[theme]} />
  </svg>
)

export { Open }
