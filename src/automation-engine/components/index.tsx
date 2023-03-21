import React, { useRef } from 'react'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import Grid from '@/automation-engine/components/Grid'
import Box from '@/automation-engine/components/Box'
import Line from '@/automation-engine/components/Line'
import { useSelector } from 'react-redux'
import { setBox1Position, setBox2Position } from '../../redux/store'

function AutomationEngine() {
  const svgRef: React.MutableRefObject<null> = useRef(null)
  const box1Ref: React.MutableRefObject<null> = useRef(null)
  const box2Ref: React.MutableRefObject<null> = useRef(null)

  const box1Position = useSelector((state: any) => state.box1Position)
  const box2Position = useSelector((state: any) => state.box2Position)

  useDrag(box1Ref, setBox1Position)
  useDrag(box2Ref, setBox2Position)

  return (
    <svg ref={svgRef} width="100vw" height="100vh">
      <Grid />
      <Line origin={box1Position} destination={box2Position} />
      <Box x={box1Position.x} y={box1Position.y} setBoxPosition={setBox1Position} />
      <Box x={box2Position.x} y={box2Position.y} setBoxPosition={setBox2Position} />
    </svg>
  )
}

export default AutomationEngine
