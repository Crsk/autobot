import { useEffect } from 'react'
import * as d3 from 'd3'
import { fromEvent } from 'rxjs'
import { map, takeUntil, switchMap } from 'rxjs/operators'
import styles from './index.module.scss'

const useDrag = (elementRef: any, snapFunction: any, onPositionChange: any) => {
  useEffect(() => {
    const element = d3.select(elementRef.current)

    if (!element) return
    if (!elementRef.current) return

    // eslint-disable-next-line func-names
    const svg = element.select(function () {
      return this.parentNode
    })

    const mousedown$ = fromEvent<MouseEvent>(element.node(), 'mousedown')
    const mousemove$ = fromEvent<MouseEvent>(svg.node(), 'mousemove')
    const mouseup$ = fromEvent<MouseEvent>(svg.node(), 'mouseup')

    const subscription = mousedown$
      .pipe(
        map((event) => {
          element.classed(styles.dragging, true)

          return {
            offsetX: event.clientX - parseFloat(element.attr('x')),
            offsetY: event.clientY - parseFloat(element.attr('y')),
          }
        }),
        switchMap((offset) => mousemove$.pipe(
          map((event) => ({
            x: event.clientX - offset.offsetX,
            y: event.clientY - offset.offsetY,
          })),
          takeUntil(
            mouseup$.pipe(
              map(() => {
                const x = snapFunction(parseFloat(element.attr('x')))
                const y = snapFunction(parseFloat(element.attr('y')))
                element
                  .classed(styles.dragging, false)
                  .transition()
                  .duration(200)
                  .attr('x', x)
                  .attr('y', y)
              }),
            ),
          ),
        )),
      ).subscribe(({ x, y }) => {
        element.attr('x', x).attr('y', y)
        onPositionChange({ x, y })
      })

    // eslint-disable-next-line consistent-return
    return () => {
      subscription.unsubscribe()
    }
  }, [elementRef, snapFunction, onPositionChange])
}

export default useDrag
