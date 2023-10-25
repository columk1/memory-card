const CARDS = [
  { name: 'Ace', url: '.assets/react.svg' },
  { name: 'King', url: '.assets/react.svg' },
  { name: 'Queen', url: '.assets/react.svg' },
  { name: 'Jack', url: '.assets/react.svg' },
]

const Card = (id, name, imgUrl, selected = false) => {
  const getId = () => index
  const getName = () => name
  const getImgUrl = () => imgUrl

  function select() {
    this.selected = true
  }

  return { id, name, imgUrl, selected, select }
}

const Game = (cards) => {
  let deck = cards.map((card, index) => Card(index, card.name, card.url))
  let playerTurn = true

  const shuffleDeck = () => {
    const random = deck.map(Math.random)
    return deck.sort((a, b) => random[a.id] - random[b.id])
  }
  const selectCard = (cardId) => {
    deck.forEach((card) => {
      if (card.id === cardId) {
        console.log(card)
        card.selected ? console.log('game over') : (card.selected = true)
      }
    })
  }

  const startGame = () => {
    while (deck.some((card) => !card.selected)) {
      if (playerTurn) {
        let cardId = parseInt(prompt('Select a card'))
        selectCard(cardId)
        shuffleDeck()
      } else {
        setTimeout(() => {
          playerTurn = !playerTurn
        }, 2000)
      }
    }
    console.log('You Win!')
  }

  return { deck, shuffleDeck, selectCard, startGame }
}
