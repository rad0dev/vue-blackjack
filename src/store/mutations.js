export const clearCardsAndScore = (state) => {
  state.dealtCards.player = []
  state.dealtCards.dealer = []
  state.score.player = [0, 0]
  state.score.dealer = [0, 0]
}

export const setDeck = (state, newDeck) => {
  state.deck = newDeck
}

export const unsetFromDeck = (state, index) => {
  state.deck.splice(index, 1)
}

export const addNewCard = (state, { receiver, card }) => {
  state.dealtCards[receiver].push(card)
}

export const setScore = (state, { receiver, score }) => {
  state.score[receiver] = score
}

export const reverseDealerCard = (state) => {
  state.dealtCards.dealer[0].reversed = false
}
