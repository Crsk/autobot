import { colors } from '@/automation-engine/utils'
import React from 'react'

type Size = 'S' | 'M' | 'L' | 'XL'
type Color = 'dark' | 'primary'
const sizeMap = { S: 16, M: 24, L: 32, XL: 40 }
const paddingMap = { default: 0, S: 4, M: 8, L: 12, XL: 16 }
const colorMap = { dark: colors.strong, primary: colors.primary }

// eslint-disable-next-line react/require-default-props
function Delete({ color, size, paddingLeft }: { color?: Color, size?: Size, paddingLeft?: Size }) {
  const sizeValue = !size ? sizeMap.M : sizeMap[size]
  const paddingLeftValue = !paddingLeft ? paddingMap.default : paddingMap[paddingLeft]
  const colorValue = !color ? colorMap.dark : colorMap[color]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={sizeValue}
      viewBox="0 0 24 24"
      width={sizeValue}
      fill={colorValue}
      style={{ paddingLeft: paddingLeftValue }}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
    </svg>
  )
}

// eslint-disable-next-line import/prefer-default-export
export { Delete }
