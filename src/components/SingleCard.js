import './SingleCard.css'
const SingleCard = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice(card)
  }
  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : 'cardImg'}>
        <img className='front' src={card.src} alt='card front' />
        <img
          className='back'
          src='/img/logo.png'
          onClick={handleClick}
          alt='card back'
        />
      </div>
    </div>
  )
}

export default SingleCard
