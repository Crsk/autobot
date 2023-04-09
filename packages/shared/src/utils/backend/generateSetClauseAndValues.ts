// TypeScript is a statically-typed language, which means that it checks types at compile time rather than runtime.
// So, we add an index signature to UpdatedNodeProps because TypeScript doesn't know the types of the properties (updatedNode[key]) we're accessing using string indices.
type UpdatedNodeProps = { [key: string]: any }

export default (updatedNode: UpdatedNodeProps): { setClause: string, values: any[] } => {
  const keys = Object.keys(updatedNode)
  const setClause = keys.map((key: string) => `\`${key}\` = ?`).join(', ')
  const values = keys.map((key) => updatedNode[key])

  return { setClause, values }
}
