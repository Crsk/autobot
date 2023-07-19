import { CamelCase, SnakeCase } from '../types/utils'

function camelToSnakeCase<T>(obj: CamelCase<T>): SnakeCase<T> {
  const newObj: any = {}

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in obj) {
    const newKey = key.replace(/([A-Z])/g, group => `_${group.toLowerCase()}`)
    newObj[newKey] = obj[key]
  }

  return newObj as SnakeCase<T>
}

export default <T>(data: CamelCase<T>) => camelToSnakeCase<T>(data)
