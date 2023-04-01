import React, { useEffect } from 'react'
import Grid from '@/automation-engine/components/Grid'
import Node from '@/automation-engine/components/Node'
import Connection from '@/automation-engine/components/Connection'
import { useDispatch, useSelector } from 'react-redux'
import { Node as NodeType } from '@/automation-engine/models/node'
import { fetchNodesTrigger } from '@/redux/slices/nodeSlice'

function AutomationEngine() {
  const dispatch = useDispatch()
  const nodes: NodeType[] = useSelector((state: any) => Object.values(state.nodesById))
  const connections = nodes.reduce((acc: { parent: NodeType, child: NodeType }[], node: NodeType) => {
    const parent: NodeType | undefined = nodes.find((n) => n.id === node.parentId)

    return parent ? [...acc, { parent, child: node }] : acc
  }, [])

  useEffect(() => {
    dispatch(fetchNodesTrigger())
  }, [dispatch])

  return (
    <svg width="100vw" height="100vh">
      <Grid />
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
        <Node key={`${node.id}`} node={node} />
      ))}
    </svg>
  )
}

export default AutomationEngine
