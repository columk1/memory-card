export default function Card({ id, imgUrl, onClick }) {
  return (
    <>
      <button className='card' onClick={onClick}>
        <img src={imgUrl} alt={`card-${id}`} id={id} />
      </button>
    </>
  )
}
