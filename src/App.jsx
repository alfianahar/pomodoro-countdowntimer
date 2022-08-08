import { useEffect, useState } from 'react'
import settingicon from './assets/cog-outline.png'
import './App.css'

function TimerControl() {
  return (    
      <div className="timer-control">
        <h3>Break</h3>
        <button> - </button>
        <span> 05 </span>
        <button> + </button>
      </div>
  )
}

function PomoSetting () {
  return (
    <div className="pomosetting">
      <div className="setting-tittle">
        <img src={settingicon} className="icon-setting" alt="setting" width="24" />
        <span>Settings</span>
      </div>
      <div className="control">
        <TimerControl />
        <TimerControl />
      </div>
    </div>
  )
}

function Clock ({minutes, seconds}) {
  const mins = minutes < 10 ? `0${minutes}` : minutes;
  const secs = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {

  }, [])
  
  return (
    <div className="clock">
      <h2>Session</h2>
      <div className="clock-layout">{mins} : {secs}</div>
    </div>
  )
}

function Pomodoro({min, sec}) {
  return (
    <div className="pomodoro">
      <PomoSetting />
      <Clock minutes={min} seconds={sec}/>
    </div>
  )
}


function App() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Pomodoro min={minutes} sec={seconds} />

      <footer className="credit">
        <p className="">
          Made by{' '}
          <span className="">
            <a href="https://www.alfianahar.com/bio" target="_blank">
              Alfian Nahar
            </a>
          </span>
        </p>
      </footer>      
    </div>
  )
}

export default App
