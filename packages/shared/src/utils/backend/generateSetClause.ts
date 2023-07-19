export default (obj: any): any =>
  Object.entries(obj)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(', ')
