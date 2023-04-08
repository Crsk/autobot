import React, { useEffect, useState } from 'react'
import useOnline from '@/hooks/useOnline'
import styles from './connectivity.module.scss'

function ConnectivityBar() {
  const online = useOnline()
  const [connectivityBar, setConnectivityBar] = useState({ message: '', class: 'hide' })

  useEffect(() => {
    setConnectivityBar({
      message: online ? 'Back online!' : 'Working offline...',
      class: `${styles.show} ${online ? styles.online : styles.offline}`,
    })

    if (online) setTimeout(() => { setConnectivityBar({ message: '', class: `${styles.online} ${styles.hide}` }) }, 5000)
  }, [online])

  return <div className={connectivityBar.class}>{connectivityBar.message}</div>
}

export default ConnectivityBar
