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
  const levelOneDeck = fullDeck.slice(0, fullDeck.length / 2)
  const levelTwoDeck = fullDeck.slice(fullDeck.length / 2)

  const [deck, setDeck] = useState(levelOneDeck)
  const [level, setLevel] = useState(1)
  const [levelModalOpen, setLevelModalOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const shuffleDeck = (deck) => {
    console.log('shuffling')
    const random = deck.map(Math.random)
    const copy = [...deck].sort((a, b) => random[a.id] - random[b.id])
    console.log(copy.slice(0, 4))
    if (allCardsSelected(copy.slice(0, 4))) {
      return shuffleDeck(copy)
    } else {
      return setDeck(copy)
    }
    // return allCardsSelected(copy.slice(0, 4)) ? shuffleDeck(copy) : setDeck(copy)
  }

  const allCardsSelected = (deck) => deck.every((card) => card.selected)

  const nextLevel = (currentDeck) => {
    if (level === 1) {
      setLevel(2)
      setLevelModalOpen(true)
      shuffleDeck(currentDeck.concat(levelTwoDeck))
      let deckContainer = document.querySelector('.deck')
      deckContainer.classList.add('level-2')
    } else {
      setIsGameOver(true)
    }
  }

  // Click handler for card selection
  const selectCard = (cardId) => {
    console.log(deck)
    let updatedDeck = deck.map((card) => {
      card = JSON.parse(JSON.stringify(card))
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
    if (allCardsSelected(updatedDeck)) {
      console.log('All Cards Selected')
      nextLevel(updatedDeck)
    } else {
      shuffleDeck(updatedDeck)
    }
  }

  const handleClick = (e) => {
    const id = parseInt(e.target.id)
    selectCard(id)
  }

  const resetGame = () => {
    setDeck(levelOneDeck)
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
        <div className='game-instructions'>
          {level === 1 ? (
            <>
              <p className='read-the-docs'>
                Test your memory by only selecting cards that you haven't been previously selected.
              </p>
              <p className='read-the-docs'>The game will end if you click the same image twice</p>
            </>
          ) : (
            <p className='read-the-docs'>
              Same again, but don't forget what you have already clicked
            </p>
          )}
        </div>
        <p className='score'>Score: {score}</p>
      </div>
      <Modal openModal={isGameOver} closeModal={resetGame} buttonText='Play Again?'>
        <h2>{score !== 16 ? 'GAME OVER' : 'YOU WIN'}</h2>
        <p>Score: {score}</p>
      </Modal>
      <Modal
        openModal={levelModalOpen}
        closeModal={() => setLevelModalOpen(false)}
        buttonText='Continue'
      >
        <h2>Level {level}</h2>
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
