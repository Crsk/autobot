import React, { useEffect } from 'react'
import { Node as NodeType } from 'shared/src/types/models'
import { useDispatch, useSelector } from 'react-redux'
import { defaultNodeWidth, snapToGrid } from 'shared/src/utils'
import Grid from '@/components/Grid/Grid'
import Node from '@/components/Node/Node'
import Connection from '@/components/Connection/Connection'
import { RootState } from '@/redux/types'
import { addNodeTrigger, fetchNodesTrigger } from '@/redux/slices/nodeSlice'

function Flow() {
  const dispatch = useDispatch()
  const nodes: NodeType[] = useSelector((state: RootState) => Object.values(state.node.nodesById))
  const connections = nodes.reduce((acc: { parent: NodeType; child: NodeType }[], node: NodeType) => {
    const parent: NodeType | undefined = nodes.find(n => n.id === node.parentId)

    return parent ? [...acc, { parent, child: node }] : acc
  }, [])

  useEffect(() => {
    if (!nodes.length) {
      const center = window.innerWidth / 2 - defaultNodeWidth / 2
      dispatch(addNodeTrigger({ id: 'start', name: '', parentId: null, x: snapToGrid(center), y: snapToGrid(100) }))
    }

    dispatch(fetchNodesTrigger())
  }, [dispatch, nodes.length])

  return (
    <svg width="100vw" height="100vh">
      <Grid />
      {connections.map(
        connection =>
          connection.child &&
          connection.parent && (
            <Connection
              key={`${connection.parent.id}-${connection.child.id}`}
              origin={{ x: connection.parent.x, y: connection.parent.y }}
              destination={{ x: connection.child.x, y: connection.child.y }}
            />
          )
      )}
      {nodes && nodes.filter(x => !!x).map((node: NodeType) => <Node key={node.id} node={node} />)}
    </svg>
  )
}

export default Flow
