import React, { useEffect } from 'react'
import { select } from 'd3'
import { snapValue } from '@/automation-engine/utils'

const createGrid = (svg: any, width: number, height: number) => {
  const dotRadius = 2
  const dotColor = '#0d0d0e'

  for (let x = 0; x <= width; x += snapValue) {
    for (let y = 0; y <= height; y += snapValue) {
      svg.append('circle').attr('cx', x).attr('cy', y).attr('r', dotRadius)
        .attr('fill', dotColor)
    }
  }
}

function Grid() {
  const ref = React.useRef(null)

  useEffect(() => {
    const svg = select(ref.current)
    createGrid(svg, window.innerWidth, window.innerHeight)
  }, [])

  return <g ref={ref} />
}

export default Grid
