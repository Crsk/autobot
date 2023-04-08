import { useEffect } from 'react'
import { Subject } from 'rxjs'

const useSubscribe = <T>(observable: Subject<T>, callback: () => void) => {
  useEffect(() => {
    const subscription = observable.subscribe(callback)

    return () => {
      subscription.unsubscribe()
    }
  }, [observable, callback])
}

export default useSubscribe
