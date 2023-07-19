type CamelToSnake<T extends string, P extends string = ''> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
  ? CamelToSnake<R, `${P}${C0 extends Lowercase<C0> ? '' : '_'}${Lowercase<C0>}`>
  : P

type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamel<U>>}` : S

function camelToSnakeCase<T>(obj: CamelCase<T>): SnakeCase<T> {
  const newObj: any = {}

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in obj) {
    const newKey = key.replace(/([A-Z])/g, group => `_${group.toLowerCase()}`)
    newObj[newKey] = obj[key]
  }

  return newObj as SnakeCase<T>
}

function snakeToCamelCase<T>(obj: SnakeCase<T>): CamelCase<T> {
  const newObj: any = {}

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in obj) {
    const newKey = key.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
    newObj[newKey] = obj[key]
  }

  return newObj as CamelCase<T>
}

export type CamelCase<T> = { [K in keyof T as SnakeToCamel<K & string>]: T[K] }
export type SnakeCase<T> = { [K in keyof T as CamelToSnake<K & string>]: T[K] }
export const toCamelCase = <T>(data: SnakeCase<T>) => snakeToCamelCase<T>(data)
export const toSnakeCase = <T>(data: CamelCase<T>) => camelToSnakeCase<T>(data)
