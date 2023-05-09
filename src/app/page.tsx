// "use client"
import React, {useState} from 'react'
import styles from './page.module.css'

export default function Home() {
  const [numero, setNumero] = useState(0);
  console.log('Oi 5 periodo!! :D')
  return (
    <main className={styles.main}>
        <p>
          Hello World
        </p>
    </main>
  )
}
