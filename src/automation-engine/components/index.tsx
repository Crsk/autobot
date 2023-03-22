import React, { useEffect } from 'react'
import Grid from '@/automation-engine/components/Grid'
import Box from '@/automation-engine/components/Box'
import { addNode } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'

function AutomationEngine() {
  const dispatch = useDispatch()
  const node = useSelector((state: any) => state.nodesById['0'])

  useEffect(() => {
    dispatch(addNode({ parentId: null, id: '0', x: 300, y: 300 }))
  }, [dispatch])

  return (
    <svg width="100vw" height="100vh">
      <Grid />
      {node && <Box node={node} />}
    </svg>
  )
}

export default AutomationEngine
