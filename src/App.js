import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'
import './App.css'

const cardImages = [
  { src: '/img/pokemon1.png', matched: false },
  { src: '/img/pokemon2.png', matched: false },
  { src: '/img/pokemon3.png', matched: false },
  { src: '/img/pokemon4.png', matched: false },
  { src: '/img/pokemon5.png', matched: false },
  { src: '/img/pokemon6.png', matched: false },
  { src: '/img/pokemon7.png', matched: false },
  { src: '/img/pokemon8.png', matched: false },
  { src: '/img/pokemon9.png', matched: false },
  { src: '/img/pokemon10.png', matched: false },
]
const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }

  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className='App'>
      <h1>Pokemon Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
      <h3>Turns: {turns}</h3>
    </div>
  )
}

export default App
