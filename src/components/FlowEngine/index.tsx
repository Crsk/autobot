import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { fromEvent } from 'rxjs'
import { map, takeUntil, switchMap } from 'rxjs/operators'
import styles from './flow-engine.module.scss'

function FlowEngine() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const boxWidth = 225
    const boxHeight = 75
    const snapValue = 25

    const createGrid = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const dotRadius = 1
      const dotColor = '#bfc3c9'

      for (let x = 0; x <= width; x += snapValue) {
        for (let y = 0; y <= height; y += snapValue) {
          svg.append('circle').attr('cx', x).attr('cy', y).attr('r', dotRadius)
            .attr('fill', dotColor)
        }
      }
    }

    if (svg.selectAll('*').empty()) {
      createGrid()
      const createBox = (x: number, y: number) => svg.append('rect').attr('x', x).attr('y', y).attr('rx', 5)
        .attr('width', boxWidth)
        .attr('height', boxHeight)
        .attr('fill', '#058af0')
        .attr('class', styles.box)
      const snapToGrid = (val: number) => Math.round(val / snapValue) * snapValue
      const line = svg.append('line').attr('stroke', '#058af0').attr('stroke-width', 1.5)
      const box1 = createBox(snapToGrid(50), snapToGrid(50))
      const box2 = createBox(snapToGrid(350), snapToGrid(50))
      const textGroup = svg.append('g').attr('class', styles['non-selectable']).attr('text-anchor', 'middle')
      const textRect = textGroup.append('rect').attr('rx', 5).attr('ry', 5).attr('fill', 'white')
      const text = textGroup.append('text').attr('font-size', 12).attr('fill', '#058af0').text('Yes')

      const updateLine = () => {
        const x1 = parseFloat(box1.attr('x')) + boxWidth / 2
        const y1 = parseFloat(box1.attr('y')) + boxHeight / 2
        const x2 = parseFloat(box2.attr('x')) + boxWidth / 2
        const y2 = parseFloat(box2.attr('y')) + boxHeight / 2
        const textX = (x1 + x2) / 2
        const textY = (y1 + y2) / 2
        line.attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2)
        text.attr('x', textX).attr('y', textY)
        const textBox = text.node()?.getBBox()
        if (textBox) {
          textRect.attr('x', textBox.x - 5).attr('y', textBox.y - 5).attr('width', textBox.width + 10).attr('height', textBox.height + 10)
        }
      }

      updateLine()

      const drag = (element: d3.Selection<SVGRectElement, unknown, null, undefined>) => {
        const mousedown$ = fromEvent<MouseEvent>(element.node()!, 'mousedown')
        const mousemove$ = fromEvent<MouseEvent>(svg.node()!, 'mousemove')
        const mouseup$ = fromEvent<MouseEvent>(svg.node()!, 'mouseup')

        mousedown$.pipe(
          map((event: MouseEvent) => {
            element.classed(styles.dragging, true)

            return {
              offsetX: event.clientX - parseFloat(element.attr('x')),
              offsetY: event.clientY - parseFloat(element.attr('y')),
            }
          }),
          switchMap((offset) => mousemove$.pipe(
            map((event) => ({ x: event.clientX - offset.offsetX, y: event.clientY - offset.offsetY })),
            takeUntil(
              mouseup$.pipe(
                map(() => {
                  const x = snapToGrid(parseFloat(element.attr('x')))
                  const y = snapToGrid(parseFloat(element.attr('y')))
                  element.classed(styles.dragging, false).transition().duration(200).attr('x', x)
                    .attr('y', y)
                    .on('end', updateLine)
                }),
              ),
            ),
          )),
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

export default FlowEngine
