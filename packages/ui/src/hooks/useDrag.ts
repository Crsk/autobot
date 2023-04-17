import { useEffect, useRef } from 'react'
import { select } from 'd3'
import { fromEvent, Subject } from 'rxjs'
import { map, takeUntil, switchMap, tap } from 'rxjs/operators'
import { useDispatch } from 'react-redux'
import { snapToGrid } from 'shared/src/utils'
import { draggingData, updateNewChild, updateNodeTrigger } from '@/redux/slices/nodeSlice'

type Distance = { dx: number; dy: number }

/**
 * The hook uses the Redux store to manage the state of the nodes in the diagram.
 * It dispatches actions to update the position of the dragged node and the connected elements during and after dragging.
 */
const useDrag = (elementRef: any, nodeId: string, draggingNewChild: boolean = false) => {
  const dispatch = useDispatch()
  const mouseupSubject = useRef<Subject<Distance>>(new Subject<Distance>()).current

  useEffect(() => {
    const element = select(elementRef.current)
    const updateNode = (x: number, y: number, snap: boolean = false) => {
      if (draggingNewChild) {
        dispatch(updateNewChild({ id: nodeId, x: snap ? snapToGrid(x) : x, y: snap ? snapToGrid(y) : y }))
      } else {
        dispatch(updateNodeTrigger({ id: nodeId, propsToUpdate: { x: snap ? snapToGrid(x) : x, y: snap ? snapToGrid(y) : y } }))
      }
    }

    if (!element) return
    if (!elementRef.current) return

    // eslint-disable-next-line func-names
    const svg = element.select(function () {
      return this.parentNode
    })

    const mousedown$ = fromEvent<MouseEvent>(element.node(), 'mousedown')
    const mouseup$ = fromEvent<MouseEvent>(element.node(), 'mouseup')
    const mousemove$ = fromEvent<MouseEvent>(svg.node(), 'mousemove')

    const subscription = mousedown$.pipe(
      tap(() => dispatch(draggingData({ draggingNode: true }))),
      map(({ clientX, clientY }) => ({
        offsetX: clientX - (+element.attr('x')),
        offsetY: clientY - (+element.attr('y')),
        initialX: +element.attr('x'),
        initialY: +element.attr('y'),
      })),
      switchMap(({ offsetX, offsetY, initialX, initialY }) => mousemove$.pipe(
        map(({ clientX, clientY }) => ({ x: clientX - offsetX, y: clientY - offsetY })),
        takeUntil(mouseup$.pipe(
          tap(() => {
            updateNode(snapToGrid(+element.attr('x')), snapToGrid(+element.attr('y')), true) // Snap to grid on drop
            dispatch(draggingData({ draggingNode: false }))
            mouseupSubject.next({ dx: Math.abs(+element.attr('x') - initialX), dy: Math.abs(+element.attr('y') - initialY) })
          }),
        )),
      )),
    ).subscribe(({ x, y }) => updateNode(x, y)) // move the element without snap to grid so it goes smooth

    // eslint-disable-next-line consistent-return
    return () => {
      subscription.unsubscribe()
    }
  }, [elementRef, dispatch, nodeId, mouseupSubject, draggingNewChild])

  return mouseupSubject
}

export default useDrag
