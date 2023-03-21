import React, { useRef, useState } from 'react'
import { snapToGrid, defaultBoxWidth, defaultBoxHeight } from '@/automation-engine/utils'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import Grid from '@/automation-engine/components/Grid'
import Box from '@/automation-engine/components/Box'
import Line from '@/automation-engine/components/Line'
import LineTextLabel from '@/automation-engine/components/LineTextLabel'

function AutomationEngine() {
  const svgRef: React.MutableRefObject<null> = useRef(null)
  const box1Ref: React.MutableRefObject<null> = useRef(null)
  const box2Ref: React.MutableRefObject<null> = useRef(null)

  const [box1Position, setBox1Position] = useState({
    x: snapToGrid(50),
    y: snapToGrid(50),
  })
  const [box2Position, setBox2Position] = useState({
    x: snapToGrid(350),
    y: snapToGrid(50),
  })

  useDrag(box1Ref, snapToGrid, setBox1Position)
  useDrag(box2Ref, snapToGrid, setBox2Position)

  const linePoints = {
    x1: box1Position.x + defaultBoxWidth / 2,
    y1: box1Position.y + defaultBoxHeight / 2,
    x2: box2Position.x + defaultBoxWidth / 2,
    y2: box2Position.y + defaultBoxHeight / 2,
  }

  const textPosition = {
    x: (linePoints.x1 + linePoints.x2) / 2,
    y: (linePoints.y1 + linePoints.y2) / 2,
  }

  return (
    <svg ref={svgRef} width="100vw" height="100vh">
      <Grid />
      <Box x={box1Position.x} y={box1Position.y} onPositionChange={setBox1Position} />
      <Box x={box2Position.x} y={box2Position.y} onPositionChange={setBox2Position} />
      <Line {...linePoints} />
      <LineTextLabel x={textPosition.x} y={textPosition.y} text="Yes" />
    </svg>
  )
}

export default AutomationEngine
