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
      const line = svg.append('line').attr('stroke', '#025948').attr('stroke-width', 2)
      const textGroup = svg.append('g').attr('class', 'non-selectable').attr('text-anchor', 'middle')
      const textRect = textGroup.append('rect').attr('rx', 5).attr('ry', 5).attr('fill', 'rgba(10, 15, 14, 0.2)')
      const text = textGroup.append('text').attr('font-size', 16).attr('fill', '#05735e').text('Yes')

      const updateLine = () => {
        const x1 = parseFloat(box1.attr('x')) + boxWidth / 2
        const y1 = parseFloat(box1.attr('y')) + boxHeight / 2
        const x2 = parseFloat(box2.attr('x')) + boxWidth / 2
        const y2 = parseFloat(box2.attr('y')) + boxHeight / 2
        const textX = (x1 + x2) / 2
        const textY = (y1 + y2) / 2
        line.attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2)
        text.attr('x', textX).attr('y', textY)
        const textBox = text.node().getBBox()
        textRect.attr('x', textBox.x - 5).attr('y', textBox.y - 5).attr('width', textBox.width + 10).attr('height', textBox.height + 10)
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
