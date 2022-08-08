import { useEffect, useState } from 'react'
import settingicon from './assets/cog-outline.png'
import './App.css'

function TimerControl({type, label }) {
  return (    
      <div className="timer-control">
        <h3 id={`${type}-label`}>{label}</h3>
        <div className="plus-minus">
          <button> - </button>
          <span> 05 </span>
          <button> + </button>
        </div>
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
        <TimerControl type="break" label="Break Length" />
        <TimerControl type="session" label="Session Length" />
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
      <div>
        <button>Play</button>
        <button>Reset</button>
      </div>
    </div>
  )
}

function Pomodoro({minutes, seconds}) {
  return (
    <div className="pomodoro">
      <PomoSetting />
      <Clock minutes={minutes} seconds={seconds}/>
    </div>
  )
}


function App() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Pomodoro minutes={minutes} seconds={seconds} />

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
