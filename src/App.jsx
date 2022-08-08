import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'

function PomoSetting () {
  return (
    <div>
      
    </div>
  )
}

function Pomodoro() {
  return (
    <div className="pomodoro">
      <PomoSetting />
    </div>
  )
}


function App() {

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Pomodoro />






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
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      
    </div>
  )
}

export default App
