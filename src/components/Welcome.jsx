import '../styles/Welcome.css'
import mainCard from '../assets/card-10.png'

export default function Welcome({ startGame }) {
  return (
    <>
      <div>
        <a
          href='https://github.com/columk1/odin-memory-card'
          alt='Github link - Image by rawppixel.com on FreePik'
          target='_blank'
          rel='noreferrer'
        >
          <img src={mainCard} className='logo' alt='Logo' />
        </a>
      </div>
      <h1>Memory Card</h1>

      <div className='startBtn'>
        <button className='btn' onClick={startGame}>
          Start Game
        </button>
      </div>
      <p className='description'>A React project assignment from The Odin Project</p>
    </>
  )
}
