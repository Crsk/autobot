import React from 'react'

function Dot({
  x, y, radius = 4, fill = '#058af0',
}: any) {
  return <circle cx={x} cy={y} r={radius} fill={fill} />
}

export default Dot
