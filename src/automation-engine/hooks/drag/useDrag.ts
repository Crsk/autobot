import { useEffect, useRef } from 'react'
import { select } from 'd3'
import { fromEvent, Subject } from 'rxjs'
import { map, takeUntil, switchMap, tap, share } from 'rxjs/operators'
import { useDispatch, useSelector } from 'react-redux'
import { snapToGrid } from '@/automation-engine/utils'
import { Node } from '@/automation-engine/models/node'
import { addNodeTrigger, updateNodeTrigger } from '@/redux/slices/nodeSlice'
import styles from './index.module.scss'

/**
 * The hook uses the Redux store to manage the state of the nodes in the diagram.
 * It dispatches actions to update the position of the dragged node and the connected elements during and after dragging.
 */
const useDrag = (elementRef: any, nodeId: string, newNode: { parentId: string, ref: any } | undefined = undefined) => {
  const dispatch = useDispatch()
  const mouseupSubject = useRef<Subject<void>>(new Subject<void>()).current

  // Updating manually to avoid unnecessary re-renders and circular dependency
  const node: Node | null = useSelector((state: any) => state.nodesById[nodeId])
  const nodes = useSelector((state: any) => Object.values<Node>(state.nodesById))
  const nodeRef = useRef(node)
  const nodesRef = useRef(nodes)
  nodeRef.current = node
  nodesRef.current = nodes

  useEffect(() => {
    const updateNode = (x: number, y: number, snap: boolean = false) => {
      if (newNode?.parentId && !nodeRef.current) {
        dispatch(addNodeTrigger({
          id: nodeId,
          name: '',
          parentId: newNode?.parentId,
          x,
          y,
        }))
      } else {
        dispatch(updateNodeTrigger({
          id: nodeId,
          propsToUpdate: {
            x: snap ? snapToGrid(x) : x,
            y: snap ? snapToGrid(y) : y,
          },
        }))
      }
    }
    const element = select(elementRef.current)
    const dotElement = select(newNode?.ref?.current)

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

          return newNode?.ref && dotElement
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
                updateNode(x, y, true)
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
      ).subscribe(({ x, y }) => updateNode(x, y))

    // eslint-disable-next-line consistent-return
    return () => {
      subscription.unsubscribe()
    }
  }, [elementRef, dispatch, nodeId, mouseupSubject, newNode?.parentId, newNode?.ref])

  return mouseupSubject
}

export default useDrag
