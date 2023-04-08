import { SnakeCase, CamelCase } from 'shared/types/utils/index'

function snakeToCamelCase<T>(obj: SnakeCase<T>): CamelCase<T> {
  const newObj: any = {}

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in obj) {
    const newKey = key.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
    newObj[newKey] = obj[key]
  }

  return newObj as CamelCase<T>
}

export default <T>(data: SnakeCase<T>) => snakeToCamelCase<T>(data)
