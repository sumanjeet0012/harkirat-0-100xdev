import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Admin} from '@repo/ui/admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      hi
      <Admin />
    </div>
  )
}

export default App
