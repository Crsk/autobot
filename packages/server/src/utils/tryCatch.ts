function tryCatch<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)

      Object.getOwnPropertyNames(constructor.prototype).forEach((key) => {
        if (key !== 'constructor') {
          const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, key)
          if (descriptor && typeof descriptor.value === 'function') {
            const originalMethod = descriptor.value

            Object.defineProperty(this, key, {
              ...descriptor,
              async value(...args2: any[]) {
                try {
                  return originalMethod.apply(this, args2)
                } catch (error) {
                  const className = constructor.name
                  const methodName = key
                  const argString = JSON.stringify(args)
                  const redText = '\x1b[31m%s\x1b[0m'

                  const errorMessage = `Error occurred in ${className}.${methodName} with arguments ${argString}`
                  console.log(redText, errorMessage)

                  const stackTrace = `Stack trace: ${(error as Error).stack}`
                  console.log(redText, stackTrace)

                  throw new Error(errorMessage)
                }
              },
            })
          }
        }
      })
    }
  }
}

export default tryCatch
