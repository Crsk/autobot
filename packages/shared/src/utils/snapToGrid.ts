import { snapValue } from './helper'

export default (val: number) => Math.round(val / snapValue) * snapValue
