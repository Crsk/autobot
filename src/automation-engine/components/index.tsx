import React, { useEffect } from 'react'
import Grid from '@/automation-engine/components/Grid'
import Node from '@/automation-engine/components/Node'
import Line from '@/automation-engine/components/Line'
import { useDispatch, useSelector } from 'react-redux'
import { Node as NodeType } from '@/automation-engine/models/node'
import { Connection } from '@/automation-engine/types'
// import { addNode } from '@/redux/slices/nodeSlice'

function AutomationEngine() {
  const dispatch = useDispatch()
  const nodes: NodeType[] = useSelector((state: Record<string, Node>) => Object.values(state.nodesById))
  const connections: Connection[] = useSelector((state: any) => Object.values(state.connections))

  useEffect(() => {
    // dispatch(addNode({ parentId: null, id: '0', x: 300, y: 300 }))
    // dispatch(addNode({ id: '1', x: 400, y: 600, parentId: '0' }))
  }, [dispatch])

  return (
    <svg width="100vw" height="100vh">
      <Grid />
      {connections.map((connection) => (
        <Line
          key={`${connection.origin.id}-${connection.destination.id}`}
          origin={{ x: connection.origin.x, y: connection.origin.y }}
          destination={{ x: connection.destination.x, y: connection.destination.y }}
        />
      ))}
      {nodes.filter((x) => !!x).map((node: NodeType) => (
        <Node key={node.id} nodeId={node.id} />
      ))}
    </svg>
  )
}

export default AutomationEngine
