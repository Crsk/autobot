import { snapToGrid } from '@/automation-engine/utils'
import { useEffect } from 'react'
import * as d3 from 'd3'
import { fromEvent } from 'rxjs'
import { map, takeUntil, switchMap } from 'rxjs/operators'
import { useDispatch } from 'react-redux'
import { updateNode } from '@/redux/store'
import styles from './index.module.scss'

const useDrag = (elementRef: any, boxId: string) => {
  const dispatch = useDispatch()

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
                const x = snapToGrid(parseFloat(element.attr('x')))
                const y = snapToGrid(parseFloat(element.attr('y')))
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
        dispatch(updateNode({ id: boxId, x, y }))
      })

    // eslint-disable-next-line consistent-return
    return () => {
      subscription.unsubscribe()
    }
  }, [elementRef, dispatch, boxId])
}

export default useDrag
