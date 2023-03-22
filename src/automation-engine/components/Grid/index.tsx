import React, { useEffect } from 'react'
import * as d3 from 'd3'
import { snapValue } from '@/automation-engine/utils'

const createGrid = (svg: any, width: number, height: number) => {
  const dotRadius = 1
  const dotColor = '#c3c8d1'

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
    const svg = d3.select(ref.current)
    createGrid(svg, window.innerWidth, window.innerHeight)
  }, [])

  return <g ref={ref} />
}

export default Grid
