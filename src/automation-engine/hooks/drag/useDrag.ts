import { useEffect, useRef } from 'react'
import { select } from 'd3'
import { fromEvent, Subject } from 'rxjs'
import { map, takeUntil, switchMap, tap, share } from 'rxjs/operators'
import { useDispatch } from 'react-redux'
import { snapToGrid } from '@/automation-engine/utils'
import { updateNewChild, updateNodeTrigger } from '@/redux/slices/nodeSlice'

/**
 * The hook uses the Redux store to manage the state of the nodes in the diagram.
 * It dispatches actions to update the position of the dragged node and the connected elements during and after dragging.
 */
const useDrag = (elementRef: any, nodeId: number, draggingNewChild: boolean = false) => {
  const dispatch = useDispatch()
  const mouseupSubject = useRef<Subject<void>>(new Subject<void>()).current

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
    const mousemove$ = fromEvent<MouseEvent>(svg.node(), 'mousemove')
    const mouseup$ = fromEvent<MouseEvent>(svg.node(), 'mouseup')
      .pipe(share()) // Avoid separate chain of observables executed independently for each subscriber

    const subscription = mousedown$
      .pipe(
        map((event) => ({ offsetX: event.clientX - (+element.attr('x')), offsetY: event.clientY - (+element.attr('y')) })),
        switchMap((offset) => mousemove$.pipe(
          map((event) => ({ x: event.clientX - offset.offsetX, y: event.clientY - offset.offsetY })),
          takeUntil(
            mouseup$.pipe(tap(() => {
              updateNode(snapToGrid(+(element.attr('x'))), snapToGrid(+(element.attr('y'))), true) // Snap to grd on drop
              mouseupSubject.next() // Notify drop
            })),
          ),
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
