import '../styles/Game.css'
import { useMemo, useRef, useState, useEffect } from 'react'
import Card from './Card'
import Hint from './Hint'
import Modal from './Modal'

const CardFactory = (id, name, imgUrl, selected = false) => {
  return { id, name, imgUrl, selected }
}

const shuffleDeck = (deck) => {
  // hello
  const random = deck.map(Math.random)
  const copy = [...deck].sort((a, b) => random[a.id] - random[b.id])
  // Recursive return statement to reshuffle when no unselected cards are visible
  return allCardsSelected(copy.slice(0, copy.length / 2)) ? shuffleDeck(copy) : copy
}

const allCardsSelected = (deck) => deck.every((card) => card.selected)

export default function Game({ cards }) {
  // localStorage.clear()
  const fullDeck = useMemo(
    () => cards.map((card, index) => CardFactory(index, card.name, card.url)),
    [cards]
  )
  const levelOneDeck = fullDeck.slice(0, fullDeck.length / 2)
  const levelTwoDeck = fullDeck.slice(fullDeck.length / 2)

  const [deck, setDeck] = useState(shuffleDeck(levelOneDeck))
  const [level, setLevel] = useState(1)
  const [levelModalOpen, setLevelModalOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [hasWon, setHasWon] = useState(false)

  const deckRef = useRef(deck)
  let timeBonus = 5

  useEffect(() => {
    const bonusTimer = setInterval(() => {
      timeBonus--
    }, 200)
    return () => clearInterval(bonusTimer)
  }, [deck])

  const nextLevel = (currentDeck) => {
    if (level === 1) {
      setLevel(2)
      setLevelModalOpen(true)
      setDeck(shuffleDeck(currentDeck.concat(levelTwoDeck)))
      deckRef.current.classList.add('level-2')
    } else {
      setHasWon(true)
      setIsGameOver(true)
    }
  }

  // Main gameplay function, called by click handler
  const selectCard = (cardId) => {
    let updatedDeck = deck.map((card) => {
      // Deep copy each card object so that the original deck is not modified
      card = JSON.parse(JSON.stringify(card))
      if (card.id === cardId) {
        if (card.selected) {
          setIsGameOver(true)
          return card
        } else {
          setScore(() => score + 1 + Math.max(0, timeBonus))
          card.selected = true
          return card
        }
      } else {
        return card
      }
    })
    if (allCardsSelected(updatedDeck)) {
      nextLevel(updatedDeck)
    } else {
      setDeck(shuffleDeck(updatedDeck))
    }
  }

  const handleClick = (e) => {
    selectCard(parseInt(e.target.id))
  }

  const resetGame = () => {
    deckRef.current.classList.remove('level-2')
    setLevel(1)
    setScore(0)
    setIsGameOver(false)
    setDeck(shuffleDeck(levelOneDeck))
    saveHighScore()
  }

  const saveHighScore = () => {
    if (score > highScore) {
      localStorage.setItem('highScore', score)
      setHighScore(score)
    }
  }

  return (
    <>
      <div className='game'>
        <div className='deck' ref={deckRef}>
          {deck.map((card) => (
            <Card id={card.id} imgUrl={card.imgUrl} onClick={handleClick} key={card.id} />
          ))}
        </div>
      </div>

      <div className='game-info'>
        {level === 1 ? (
          <Hint
            hintArray={[
              `Test your memory by only selecting cards that you haven't been previously selected`,
              `The game will end if you click the same image twice`,
            ]}
          />
        ) : (
          <Hint hintArray={[`Same again, but don't forget what you have already clicked`]} />
        )}
        <p className='score'>Score: {score}</p>
        <p className='hint'>High Score: {highScore}</p>
      </div>
      <Modal openModal={isGameOver} closeModal={resetGame} buttonText='Play Again?'>
        <h2>{hasWon ? 'YOU WIN' : 'GAME OVER'}</h2>
        <p>Score: {score}</p>
      </Modal>
      <Modal
        openModal={levelModalOpen}
        closeModal={() => setLevelModalOpen(false)}
        buttonText={level === 1 ? 'Begin' : 'Continue'}
      >
        <h2>Level {level}</h2>
      </Modal>
    </>
  )
}
