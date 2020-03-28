export default () => ({
  cardsRanks: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'],
  cardsSuits: ['heart', 'diamond', 'club', 'spade'],
  deck: [],
  dealtCards: {
    dealer: [],
    player: []
  },
  score: {
    dealer: 0,
    player: 0
  },
  coins: 500,
  verdict: ''
})
