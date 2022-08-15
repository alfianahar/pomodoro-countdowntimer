import { useEffect, useState } from 'react'
import settingicon from './assets/cog-outline.png'
import './App.css'

{/* <div className="timer-control">
            <h3 id='break-label'>Break Length</h3>
            <div className="plus-minus">
              <button id='break-decrement' onClick={() => {
                if (!play) {
                  if (breakTime > 1) {
                    setBreakTime(prev => prev > 1 ? prev - 1 : 1)
                  }
                }
              }}>-</button>
              <span id='break-length'>{breakTime}</span>
              <button id='break-increment' onClick={() => {
                if (!play) {
                  if (breakTime < 60) {
                    setBreakTime(prev => prev < 60 ? prev + 1 : 60)
                  }
                }
              }}>+</button>
            </div>
          </div>
          
          <div className="timer-control">
            <h3 id='session-label'>Session Length</h3>
            <div className="plus-minus">
              <button id='session-decrement' onClick={() => {
                if (!play) {
                  if (sessionTime >= 1) {
                    setSessionTime(prev => prev > 1 ? prev - 1 : 1)
                    setDisplayTime(prev => prev > 60 ? prev - 60 : 60)
                  }
                }
              }}>-</button>
              <span id='session-length'>{sessionTime}</span>
              <button id='session-increment' onClick={() => {
                if (!play) {
                  if (sessionTime < 60) {
                    setSessionTime(prev => prev < 60 ? prev + 1 : 60)
                    setDisplayTime(prev => prev < 3600 ? prev + 60 : 3600)
                  }
                }
              }}>+</button>
            </div>
          </div> */}

function TimerControl({type, label, length, setLength, displayTime, setDisplayTime, play }) {
  return (    
      <div className="timer-control">
        <h3 id={`${type}-label`}>{label}</h3>
        <div className="plus-minus">
          <button id={`${type}-decrement`} onClick={() => {
            if (!play) {
              if (length >= 1 && type == 'session') {
                setLength(prev => prev > 1 ? prev - 1 : 1)
                setDisplayTime(prev => prev > 60 ? prev - 60 : 60)
              } else if (length > 1) {
                setLength(prev => prev > 1 ? prev - 1 : 1)
              }
            }
          }}>-</button>
          <span id={`${type}-length`}>{length}</span>
          <button id={`${type}-increment`} onClick={() => {
            if (!play) {
              if (length < 60 && type == 'session') {
                setLength(prev => prev < 60 ? prev + 1 : 60)
                setDisplayTime(prev => prev < 3600 ? prev + 60 : 3600)
              } else if (length < 60) {
                setLength(prev => prev < 60 ? prev + 1 : 60)
              }
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
  
  const audio = document.getElementById("beep");

  // else if (play && displayTime == 0 && now == 'Session' ) {
  //   const interval = setInterval(() => {
  //     setDisplayTime(prev => prev * 60)
  //     setNow('Break');
  //     setStyle(!style)
  //     audio.play()        
  //   }, 1000)
  //   return () => clearInterval(interval)
  //   } else if (play && displayTime == 0 && now == 'Break'){
  //     const interval = setInterval(() => {
  //       setDisplayTime(prev => prev * 60)
  //       setNow('Session');
  //       setStyle(!style)
  //       audio.pause()
  //       audio.currentTime = 0;
  //     }, 1000)
  //     return () => clearInterval(interval)
  //   }
   

  //   if (displayTime <= 0 && now === 'session' ){
  //       setDisplayTime(breakTime * 60)
  //       setNow('break');
  //       setStyle(!style)
  //       audio.play()
  //     }
  //   if (displayTime <= 0 && now === 'break'){
  //     setDisplayTime(sessionTime * 60)
  //     setNow('session');
  //     setStyle(!style)
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
      setStyle(false)
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
          <TimerControl type="break" label="Break Length" length={breakTime} setLength={setBreakTime} play={play} setDisplayTime={setDisplayTime}/>
          <TimerControl type="session" label="Session Length" length={sessionTime} setLength={setSessionTime} play={play} displayTime={displayTime} setDisplayTime={setDisplayTime}/>
        </div>
      </div>
      <div className={style ? 'clock-break' : 'clock'}>
        <h2 id="timer-label">{now}</h2>
        <div id="time-left" className="clock-layout">{timeFormatter(displayTime)}</div>
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
