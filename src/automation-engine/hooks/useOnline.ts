import { useEffect, useState } from 'react'
import { fromEvent, map, merge, share } from 'rxjs'

const useOnline = () => {
  const online$ = fromEvent(window, 'online').pipe(map(() => true))
  const offline$ = fromEvent(window, 'offline').pipe(map(() => false))
  const status$ = merge(online$, offline$).pipe(share())
  const [online, setOnline] = useState<boolean>(true)

  useEffect(() => {
    const subscription = status$.subscribe((isConnected) => setOnline(isConnected))

    return () => subscription.unsubscribe()
  }, [status$])

  return online
}

export default useOnline
