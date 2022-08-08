import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [counter, setCounter] = useState(60);
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const timer = 
      counter > 0 && play === true && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer)
  }, [play, counter])

  return (
    <div>
      <span>Countdown: {counter}</span> <br/>
      <button onClick={() => setPlay(true)} >play</button>
    </div>
  )
}

export default App
