export default function Hint({ hintArray }) {
  return (
    <div className='game-hints'>
      {hintArray.map((hint, index) => (
        <p key={index} className='hint'>
          {hint}
        </p>
      ))}
    </div>
  )
}
