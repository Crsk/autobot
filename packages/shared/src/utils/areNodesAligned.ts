import { Point } from '../types/utils'
import { alignmentThreshold } from './helper'

// Check if the nodes are aligned vertically or horizontally
export default (origin: Point, destination: Point) =>
  Math.abs(origin.x - destination.x) <= alignmentThreshold ||
  Math.abs(destination.y - destination.y) <= alignmentThreshold
