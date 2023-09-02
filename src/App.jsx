import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard/Index'
import CreateChallenge from './components/ChallengeForm/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CreateChallenge/>
    </>
  )
}

export default App
