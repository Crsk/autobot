import { useEffect } from 'react'
import * as d3 from 'd3'
import { fromEvent } from 'rxjs'
import { map, takeUntil, switchMap } from 'rxjs/operators'
import { useDispatch } from 'react-redux'
import { dropNewNode, updateNewNode } from '@/redux/store'
import { v4 as uuid } from 'uuid'

const useDragDot = (elementRef: any, boxId: string) => {
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
        switchMap(() => mousemove$.pipe(
          map((event) => ({ x: event.clientX, y: event.clientY })),
          takeUntil(
            mouseup$.pipe(
              map(() => {
                const x = parseFloat(element.attr('x'))
                const y = parseFloat(element.attr('y'))
                dispatch(dropNewNode({ parentId: boxId, id: uuid(), x, y }))
                element.attr('x', x).attr('y', y)
              }),
            ),
          ),
        )),
      ).subscribe(({ x, y }) => {
        dispatch(updateNewNode({ x, y }))
      })

    // eslint-disable-next-line consistent-return
    return () => {
      subscription.unsubscribe()
    }
  }, [elementRef, dispatch, boxId])
}

export default useDragDot
