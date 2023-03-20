import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { fromEvent } from 'rxjs'
import { map, takeUntil, switchMap } from 'rxjs/operators'

const DraggableBoxes = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const boxWidth = 50
    const boxHeight = 50
    const snapValue = 100

    if (svg.selectAll('*').empty()) {
      const createBox = (x, y) => svg.append('rect').attr('x', x).attr('y', y).attr('width', boxWidth).attr('height', boxHeight).attr('fill', 'steelblue')
      const snapToGrid = (val) => Math.round(val / snapValue) * snapValue
      const box1 = createBox(snapToGrid(50), snapToGrid(50))
      const box2 = createBox(snapToGrid(250), snapToGrid(50))
      const line = svg.append('line').attr('stroke', 'black').attr('stroke-width', 2)

      const updateLine = () => {
        line
          .attr('x1', parseFloat(box1.attr('x')) + boxWidth / 2)
          .attr('y1', parseFloat(box1.attr('y')) + boxHeight / 2)
          .attr('x2', parseFloat(box2.attr('x')) + boxWidth / 2)
          .attr('y2', parseFloat(box2.attr('y')) + boxHeight / 2)
      }

      updateLine()

      const drag = (element) => {
        const mousedown$ = fromEvent(element.node(), 'mousedown')
        const mousemove$ = fromEvent(svg.node(), 'mousemove')
        const mouseup$ = fromEvent(svg.node(), 'mouseup')

        mousedown$.pipe(
          map((event) => ({
            offsetX: event.clientX - parseFloat(element.attr('x')),
            offsetY: event.clientY - parseFloat(element.attr('y')),
          })),
          switchMap((offset) =>
            mousemove$.pipe(
              map((event) => ({
                x: snapToGrid(event.clientX - offset.offsetX),
                y: snapToGrid(event.clientY - offset.offsetY),
              })),
              takeUntil(mouseup$)
            )
          )
        ).subscribe(({ x, y }) => {
          element.attr('x', x).attr('y', y)
          updateLine()
        })
      }

      drag(box1)
      drag(box2)
    }
  }, [])

  return <svg ref={svgRef} width="100vw" height="100vh" />
}

export default DraggableBoxes
