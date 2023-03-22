import React, { useEffect } from 'react'
import Grid from '@/automation-engine/components/Grid'
import Box from '@/automation-engine/components/Box'
import { addNode } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Node } from '@/automation-engine/models/node'

function AutomationEngine() {
  const dispatch = useDispatch()
  const node = useSelector((state: any) => state.nodesById['0'])

  useEffect(() => {
    dispatch(addNode({ parentId: null, id: '0', x: 300, y: 300 }))
    dispatch(addNode({ id: '1', x: 400, y: 600, parentId: '0' }))
  }, [dispatch])

  return (
    <svg width="100vw" height="100vh">
      <Grid />
      {(nodes as Node[]).filter((x) => !!x).map((nodee: Node) => (
        <Box key={nodee.id} node={nodee} />
      ))}
    </svg>
  )
}

export default AutomationEngine
