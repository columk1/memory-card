import { useState } from 'react'
import reactLogo from './assets/react.svg'
import mainCard from './assets/card-10.png'
import cards from './assets/data.js'
import Modal from './components/Modal'
import './App.css'

function Welcome({ startGame }) {
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={mainCard} className='logo' alt='Vite logo' />
        </a>
      </div>
      <h1>Memory Card</h1>
      <div className='startBtn'>
        <button className='btn' onClick={startGame}>
          Start Game
        </button>
        <p>Test your memory by only selecting cards that you haven't selected yet.</p>
      </div>
      <p className='read-the-docs'>A React project assignment from The Odin Project</p>
    </>
  )
}

const CardFactory = (id, name, imgUrl, selected = false) => {
  const getId = () => index
  const getName = () => name
  const getImgUrl = () => imgUrl

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

function Game({ cards }) {
  const fullDeck = cards.map((card, index) => CardFactory(index, card.name, card.url))
  const startingDeck = fullDeck.slice(0, fullDeck.length / 2)

  const [deck, setDeck] = useState(startingDeck)
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const shuffleDeck = () => {
    const random = deck.map(Math.random)
    const copy = [...deck].sort((a, b) => random[a.id] - random[b.id])
    setDeck(copy)
  }

  const isLevelComplete = () => deck.some((card) => !card.selected)

  // Click handler for card selection
  const selectCard = (cardId) => {
    let updatedDeck = deck.map((card) => {
      if (card.id === cardId) {
        if (card.selected) {
          console.log('game over')
          setIsGameOver(true)
          return card
        } else {
          setScore(() => score + 1)
          card.selected = true
          return card
        }
      } else {
        return card
      }
    })
    shuffleDeck(updatedDeck)
  }

  const handleClick = (e) => {
    const id = parseInt(e.target.id)
    selectCard(id)
  }

  const resetGame = () => {
    setDeck(startingDeck)
    setLevel(1)
    setScore(0)
    setIsGameOver(false)
    console.log('game reset')
    console.log(isGameOver)
  }

  return (
    <>
      <div className='game'>
        <div className='deck'>
          {deck.map((card) => (
            <Card id={card.id} imgUrl={card.imgUrl} onClick={handleClick} key={card.id} />
          ))}
        </div>
      </div>
      <div className='startBtn'>
        <button className='btn' onClick={shuffleDeck}>
          Start Game
        </button>
        <p>Score: {score}</p>
      </div>
      <p className='read-the-docs'>A React project assignment from The Odin Project</p>
      <Modal openModal={isGameOver} closeModal={resetGame} buttonText='Play Again?'>
        <h2>GAME OVER</h2>
        <p>Score: {score}</p>
      </Modal>
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
