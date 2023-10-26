import cards from './assets/data.js'
import { useState } from 'react'
import './App.css'
import Game from './components/Game.jsx'
import mainCard from './assets/card-10.png'

function Welcome({ startGame }) {
  return (
    <>
      <div>
        <a href='https://github.com/columk1/odin-memory-card' target='_blank'>
          <img src={mainCard} className='logo' alt='Logo' />
        </a>
      </div>
      <h1>Memory Card</h1>

      <div className='startBtn'>
        <button className='btn' onClick={startGame}>
          Start Game
        </button>
      </div>
      <p className='read-the-docs'>A React project assignment from The Odin Project</p>
    </>
  )
}

const CardFactory = (id, name, imgUrl, selected = false) => {
  function select() {
    this.selected = true
  }

  return { id, name, imgUrl, selected, select }
}

function Card({ id, imgUrl, onClick }) {
  return (
    <>
      <button className='card' onClick={onClick}>
        <img src={imgUrl} alt={`card-${id}`} id={id} />
      </button>
    </>
  )
}

function App() {
  const [start, setStart] = useState(false)

  return (
    <>
      {start ? (
        <>
          <Game cards={cards}></Game>
        </>
      ) : (
        <Welcome startGame={() => setStart(true)} />
      )}
    </>
  )
}

export default App
