import React, { useEffect } from 'react'
import { Node as NodeType } from 'shared/src/types/models/Node.interface'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@/components/Grid'
import Node from '@/components/Node'
import Connection from '@/components/Connection'
import { syncNodesTrigger } from '@/redux/slices/queueSlice'
import { RootState } from '@/redux/types'
import { fetchNodesTrigger } from '@/redux/slices/nodeSlice'
import ConnectivityBar from './Connectivity/Connectivity'

function Button() {
  const dispatch = useDispatch()
  const handleClick = () => navigator.onLine && dispatch(syncNodesTrigger())

  return (
    <foreignObject x="0" y="0" width="100" height="100">
      <button type="button" onClick={handleClick}>Sync</button>
    </foreignObject>
  )
}

function AutomationEngine() {
  const dispatch = useDispatch()
  const nodes: NodeType[] = useSelector((state: RootState) => Object.values(state.node.nodesById))
  const connections = nodes.reduce((acc: { parent: NodeType, child: NodeType }[], node: NodeType) => {
    const parent: NodeType | undefined = nodes.find((n) => n.id === node.parentId)

    return parent ? [...acc, { parent, child: node }] : acc
  }, [])

  useEffect(() => {
    dispatch(fetchNodesTrigger())
  }, [dispatch])

  return (
    <>
      <ConnectivityBar />
      <svg width="100vw" height="100vh">
        <Grid />
        <Button />
        {connections.map((connection) => (
          connection.child && connection.parent && (
            <Connection
              key={`${connection.parent.id}-${connection.child.id}`}
              origin={{ x: connection.parent.x, y: connection.parent.y }}
              destination={{ x: connection.child.x, y: connection.child.y }}
            />
          )
        ))}
        {nodes && nodes.filter((x) => !!x).map((node: NodeType) => (
          <Node key={node.id} node={node} />
        ))}
      </svg>
    </>
  )
}

export default AutomationEngine
