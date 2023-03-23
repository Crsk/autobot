import React, { useEffect } from 'react'
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
  const connections = getConnections(nodes as Node[])

  useEffect(() => {
    dispatch(addNode({ parentId: null, id: '0', x: 300, y: 300 }))
    dispatch(addNode({ id: '1', x: 400, y: 600, parentId: '0' }))
  }, [dispatch])

  return (
    <svg width="100vw" height="100vh">
      <Grid />
      {connections.map((connection) => (
        <Line key={`${connection.origin.id}-${connection.destination.id}`} origin={connection.origin} destination={connection.destination} />
      ))}
      {(nodes as Node[]).filter((x) => !!x).map((node: Node) => (
        <Box key={node.id} node={node} />
      ))}
    </svg>
  )
}

export default AutomationEngine
