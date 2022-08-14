import { useEffect, useState } from 'react'
import settingicon from './assets/cog-outline.png'
import './App.css'

function TimerControl({type, label, length, setLength, displayTime, setDisplayTime, play }) {
  return (    
      <div className="timer-control">
        <h3 id={`${type}-label`}>{label}</h3>
        <div className="plus-minus">
          <button disabled={play} id={`${type}-decrement`} onClick={() => {
            if (length > 1) {
              setLength(length - 1)
              setDisplayTime(displayTime - 60)
            }

          }}>-</button>
          <span id={`${type}-length`}>{length}</span>
          <button disabled={play} id={`${type}-increment`} onClick={() => {
            if (length < 60) {
              setLength(length + 1)
              setDisplayTime(displayTime + 60)
            }
          }}>+</button>
        </div>
      </div>
  )
}

function PomoSetting ({sessionTime, setSessionTime, breakTime, setBreakTime, displayTime, setDisplayTime, play}) {
  return (
    <div className="pomosetting">
      <div className="setting-tittle">
        <img src={settingicon} className="icon-setting" alt="setting" width="24" />
        <span>Settings</span>
      </div>
      <div className="control">
        <TimerControl type="break" label="Break Length" length={breakTime} setLength={setBreakTime} play={play}/>
        <TimerControl type="session" label="Session Length" length={sessionTime} setLength={setSessionTime} play={play} displayTime={displayTime} setDisplayTime={setDisplayTime}/>
      </div>
    </div>
  )
}

function Clock ({now, setNow, sessionTime, setSessionTime, breakTime, setBreakTime, displayTime, setDisplayTime, play, setPlay}) {
  const minutes = Math.floor(displayTime / 60)
  const seconds = displayTime - (minutes * 60)

  const mins = minutes < 10 ? `0${minutes}` : minutes;
  const secs = seconds < 10 ? `0${seconds}` : seconds;

  const countdown = setTimeout(() => {
    if (displayTime && play) {
      setDisplayTime(displayTime - 1)
      console.log(displayTime)
    }
  }, 1000)

  const handleReset = () => {
    clearTimeout(countdown);
    setPlay(false);
    setDisplayTime(1500);
    setBreakTime(5);
    setSessionTime(25);
    setNow(false)
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }

  const timerCount = () => {
    if (play) {
      countdown;
      const audio = document.getElementById("beep");
      if(!displayTime && now === false ){
        setDisplayTime(breakTime * 60)
        setNow(!now);
        audio.play()
      }
      if(!displayTime && now === true){
        setDisplayTime(sessionTime * 60)
        setNow(!now);
        audio.pause()
        audio.currentTime = 0;
      }
    } else {
      clearTimeout(countdown)
    }

  }

  useEffect(() => {
    timerCount()
  }, [play, displayTime])

  return (
    <div className={now ? 'clock-break' : 'clock'}>
      <h2 id="timer-label">{now ? 'Break time' : 'Focus Session'}</h2>
      <div className="clock-layout">{mins} : {secs}</div>
      <div className="start-stop">
        <button id="start_stop" onClick={() => {clearTimeout(countdown); setPlay(!play);}}>{play ? 'Pause' : 'Play'}</button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

function Pomodoro({now, setNow, sessionTime, setSessionTime, breakTime, setBreakTime, displayTime, setDisplayTime, play, setPlay}) {
  return (
    <div className="pomodoro">
      <PomoSetting sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime} setBreakTime={setBreakTime} displayTime={displayTime} setDisplayTime={setDisplayTime} play={play} />
      <Clock now={now} setNow={setNow} sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime} setBreakTime={setBreakTime} displayTime={displayTime} setDisplayTime={setDisplayTime} play={play} setPlay={setPlay}/>
    </div>
  )
}


function App() {
  const [now, setNow] = useState(false)
  const [sessionTime, setSessionTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [displayTime, setDisplayTime] = useState(1500)
  const [play, setPlay] = useState(false)


  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Pomodoro now={now} setNow={setNow} sessionTime={sessionTime} setSessionTime={setSessionTime} breakTime={breakTime} setBreakTime={setBreakTime} displayTime={displayTime} setDisplayTime={setDisplayTime} play={play} setPlay={setPlay}  />

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
      <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />      
    </div>
  )
}

export default App
