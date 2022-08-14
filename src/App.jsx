import { useEffect, useState } from 'react'
import settingicon from './assets/cog-outline.png'
import './App.css'

function TimerControl({type, label, length, setLength }) {
  return (    
      <div className="timer-control">
        <h3 id={`${type}-label`}>{label}</h3>
        <div className="plus-minus">
          <button id={`${type}-decrement`} onClick={() => setLength(length - 1)}>-</button>
          <span id={`${type}-length`}>{length}</span>
          <button id={`${type}-increment`} onClick={() => setLength(length + 1)}>+</button>
        </div>
      </div>
  )
}

function PomoSetting ({sessionTime, setSessionTime, breakTime, setBreakTime}) {
  return (
    <div className="pomosetting">
      <div className="setting-tittle">
        <img src={settingicon} className="icon-setting" alt="setting" width="24" />
        <span>Settings</span>
      </div>
      <div className="control">
        <TimerControl type="break" label="Break Length" length={breakTime} setLength={setBreakTime}/>
        <TimerControl type="session" label="Session Length" length={sessionTime} setLength={setSessionTime}/>
      </div>
    </div>
  )
}

function Clock ({now, setNow, sessionTime, setSessionTime, breakTime, setBreakTime, displayTime, setdisplayTime, play, setPlay}) {
  const minutes = Math.floor(displayTime / 60)
  const seconds = displayTime - (minutes * 60)
  
  const mins = minutes < 10 ? `0${minutes}` : minutes;
  const secs = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if  (displayTime && play) {
        setdisplayTime(displayTime-1)
      }

        // if (seconds === 0 && play) {
        //   if (minutes !== 0 ) {
        //     seconds = Number(59)
        //     minutes - 1
            
        //   } else {
        //     // let minutes = now ? sessionTime - 1 : breakTime - 1;
        //     // let seconds = 59;
            
        //     // setNow(!now);
        //   }
        // } else {
        //     seconds - 1
        // }


    }, 1000)
  }, [play, displayTime])

  return (
    <div className={now ? 'clock-break' : 'clock'}>
      <h2 id="timer-label">{now ? 'Break time' : 'Focus Session'}</h2>
      <div className="clock-layout">{mins} : {secs}</div>
      <div className="start-stop">
        <button id="start_stop" onClick={() => setPlay(!play)}>{play ? 'Pause' : 'Play'}</button>
        <button id="reset">Reset</button>
      </div>
    </div>
  )
}

function Pomodoro({now, setNow, sessionTime, setSessionTime, breakTime, setBreakTime, play, setPlay}) {
  return (
    <div className="pomodoro">
      <PomoSetting sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime} setBreakTime={setBreakTime}/>
      <Clock now={now} setNow={setNow} sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime} setBreakTime={setBreakTime} play={play} setPlay={setPlay}/>
    </div>
  )
}


function App() {
  const [now, setNow] = useState(false)
  const [sessionTime, setSessionTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [displayTime, setdisplayTime] = useState(1500)
  const [play, setPlay] = useState(false)


  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Pomodoro now={now} setNow={setNow} sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime} setBreakTime={setBreakTime} displayTime={displayTime} setdisplayTime={setdisplayTime} play={play} setPlay={setPlay}  />

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
