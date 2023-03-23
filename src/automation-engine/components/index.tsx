import React, { useEffect, useMemo } from 'react'
import Grid from '@/automation-engine/components/Grid'
import Box from '@/automation-engine/components/Box'
import Line from '@/automation-engine/components/Line'
import { addNode } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Node } from '@/automation-engine/models/node'
import { getConnections } from '@/automation-engine/utils'

function AutomationEngine() {
  const dispatch = useDispatch()
  const nodes = useSelector((state: any) => Object.values(state.nodesById))
  const connections = useMemo(() => getConnections(nodes as Node[]), [nodes])

  useEffect(() => {
    dispatch(addNode({ parentId: null, id: '0', x: 300, y: 300 }))
    dispatch(addNode({ id: '1', x: 400, y: 600, parentId: '0' }))
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
      {(nodes as Node[]).filter((x) => !!x).map((node: Node) => (
        <Box key={node.id} node={node} />
      ))}
    </svg>
  )
}

export default AutomationEngine
