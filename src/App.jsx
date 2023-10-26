import cards from './assets/data.js'
import { useState } from 'react'
import './App.css'
import Welcome from './components/Welcome.jsx'
import Game from './components/Game.jsx'

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
