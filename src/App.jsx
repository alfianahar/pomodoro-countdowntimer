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

function Clock ({minutes, setMinutes, seconds, setSeconds, now, setNow, sessionTime, setSessionTime, breakTime, setBreakTime}) {
  const mins = minutes < 10 ? `0${minutes}` : minutes;
  const secs = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          let minutes = now ? sessionTime - 1 : breakTime - 1;
          let seconds = 59;

          setSeconds(seconds);
          setMinutes(minutes);
          setNow(!now);
        }
      } else {
        setSeconds(seconds - 1)
      }

    }, 1000)
  }, [seconds])

  return (
    <div className="clock">
      <h2>{now ? 'Break time' : 'Focus Session'}</h2>
      <div className="clock-layout">{mins} : {secs}</div>
      <div>
        <button>Play</button>
        <button>Reset</button>
      </div>
    </div>
  )
}

function Pomodoro({minutes, setMinutes, seconds, setSeconds, now, setNow, sessionTime, setSessionTime, breakTime, setBreakTime}) {
  return (
    <div className="pomodoro">
      <PomoSetting />
      <Clock minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds} now={now} setNow={setNow} sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime} setBreakTime={setBreakTime}/>
    </div>
  )
}


function App() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(2)
  const [now, setNow] = useState(false)
  const [sessionTime, setSessionTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)


  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Pomodoro minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds} now={now} setNow={setNow} sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime} setBreakTime={setBreakTime} />

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
