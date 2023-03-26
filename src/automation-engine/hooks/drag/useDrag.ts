import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { fromEvent, Subject } from 'rxjs'
import { map, takeUntil, switchMap, tap, share } from 'rxjs/operators'
import { useDispatch, useSelector } from 'react-redux'
import { addNode, updateConnections, updateNode } from '@/redux/store'
import { snapToGrid } from '@/automation-engine/utils'
import { Node } from '@/automation-engine/models/node'
import styles from './index.module.scss'

const useDrag = (elementRef: any, boxId: string, newDot: { parentId: string, ref: any } | undefined = undefined) => {
  const dispatch = useDispatch()
  const mouseupSubject = useRef<Subject<void>>(new Subject<void>()).current

  // Updating manually to avoid unnecessary re-renders and circular dependency
  const node: Node | null = useSelector((state: any) => state.nodesById[boxId])
  const nodes = useSelector((state: any) => Object.values<Node>(state.nodesById))
  const nodeRef = useRef(node)
  const nodesRef = useRef(nodes)
  nodeRef.current = node
  nodesRef.current = nodes

  useEffect(() => {
    const updateNodeAndConnections = (x: number, y: number, snap: boolean = false) => {
      if (newDot?.parentId && !nodeRef.current) dispatch(addNode({ parentId: newDot?.parentId, id: boxId, x, y }))
      else dispatch(updateNode({ id: boxId, x: snap ? snapToGrid(x) : x, y: snap ? snapToGrid(y) : y }))
      dispatch(updateConnections({ nodes: nodesRef.current, snapToGrid: snap }))
    }
    const element = d3.select(elementRef.current)
    const dotElement = d3.select(newDot?.ref?.current)

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
        map((event) => {
          element.classed(styles.dragging, true)

          return newDot?.ref && dotElement
            ? {
              offsetX: event.clientX - parseFloat(dotElement.attr('x')),
              offsetY: event.clientY - parseFloat(dotElement.attr('y')),
            }
            : {
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
              tap(() => {
                const x = snapToGrid(parseFloat(element.attr('x')))
                const y = snapToGrid(parseFloat(element.attr('y')))
                updateNodeAndConnections(x, y, true)
                element
                  .classed(styles.dragging, false)
                  .transition()
                  .duration(200)
                  .attr('x', x)
                  .attr('y', y)
                mouseupSubject.next()
              }),
            ),
          ),
        )),
      ).subscribe(({ x, y }) => updateNodeAndConnections(x, y))

    // eslint-disable-next-line consistent-return
    return () => {
      subscription.unsubscribe()
    }
  }, [elementRef, dispatch, boxId, mouseupSubject, newDot?.parentId, newDot?.ref])

  return mouseupSubject
}

export default useDrag
