import { useEffect, useState } from 'react'
import settingicon from './assets/cog-outline.png'
import './App.css'

function TimerControl({type, label, length, setLength, displayTime, setDisplayTime, play }) {
  return (    
      <div className="timer-control">
        <h3 id={`${type}-label`}>{label}</h3>
        <div className="plus-minus">
          <button disabled={play} id={`${type}-decrement`} onClick={() => {
            if (length > 1 && type === 'session') {
              setLength(prev => prev - 1)
              setDisplayTime(prev => prev - 60)
            } else if (length > 1) {
              setLength(prev => prev - 1)
            }
          }}>-</button>
          <span id={`${type}-length`}>{length}</span>
          <button disabled={play} id={`${type}-increment`} onClick={() => {
            if (length < 60 && type === 'session') {
              setLength(prev => prev + 1)
              setDisplayTime(prev => prev + 60)
            } else if (length < 60) {
              setLength(prev => prev + 1)
            }
          }}>+</button>
        </div>
      </div>
  )
}

function App() {
  const [now, setNow] = useState('Session')
  const [sessionTime, setSessionTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [displayTime, setDisplayTime] = useState(1500)
  const [play, setPlay] = useState(false)
  const [style, setStyle] = useState(false)
  
  // const audio = document.getElementById("beep");
  //   if (!displayTime && now === false ){
  //       setDisplayTime(breakTime * 60)
  //       setNow(!now);
  //       audio.play()
  //     }
  //   if (!displayTime && now === true){
  //     setDisplayTime(sessionTime * 60)
  //     setNow(!now);
  //     audio.pause()
  //     audio.currentTime = 0;
  // }
    useEffect(() => {
      if (play && displayTime > 0) {
        const interval = setInterval(() => setDisplayTime(prev => prev - 1), 1000)
        return () => clearInterval(interval)
      }
    }, [play, displayTime])
    
    const handleReset = () => {
      setPlay(false);
      setDisplayTime(1500);
      setBreakTime(5);
      setSessionTime(25);
      setNow('Session')
      const audio = document.getElementById("beep");
      audio.pause()
      audio.currentTime = 0;
    }

    const timeFormatter = (time) => {
      let minutes = Math.floor(time / 60)
      let seconds = time % 60
      const mins = minutes < 10 ? '0' + minutes : minutes;
      const secs = seconds < 10 ? '0' + seconds : seconds;
    return `${mins}:${secs}`;
    }

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
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
      <div className={style ? 'clock-break' : 'clock'}>
        <h2 id="timer-label">{now}</h2>
        <div id="timer-left" className="clock-layout">{timeFormatter(displayTime)}</div>
        <div className="start-stop">
          <button id="start_stop" onClick={() => setPlay(!play)}>{play ? 'Pause' : 'Play'}</button>
          <button id="reset" onClick={handleReset}>Reset</button>
        </div>
      </div>      
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
