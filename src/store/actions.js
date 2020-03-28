export const prepareNewDeck = ({ state, commit }) => {
  const newDeck = []
  for (const suit of state.cardsSuits) {
    for (const rank of state.cardsRanks) {
      newDeck.push({
        rank,
        suit
      })
    }
  }
  commit('setDeck', newDeck)
}

export const drawRandomCard = ({ state, commit, dispatch }, receiver) => {
  const cardIndex = Math.floor(Math.random() * (state.deck.length - 1))
  const payload = {
    receiver,
    card: state.deck[cardIndex]
  }
  if (!state.dealtCards.dealer.length && receiver === 'dealer') {
    payload.card.reversed = true
  }
  commit('addNewCard', payload)
  dispatch('countScore', receiver)
  commit('unsetFromDeck', cardIndex)
}

export const countScore = ({ state, commit, dispatch }, receiver) => {
  let scoreSpread = [0]
  let score = 0

  for (const card of state.dealtCards[receiver]) {
    if (card.reversed) {
      continue
    }
    if (card.rank === 'ace') {
      const newScoreSpread = []
      scoreSpread.forEach((element) => {
        newScoreSpread.push(element + 11, element + 1)
      })
      scoreSpread = newScoreSpread
      continue
    }
    if (typeof card.rank !== 'number') {
      scoreSpread = scoreSpread.map((element) => {
        return element + 10
      })
      continue
    }
    scoreSpread = scoreSpread.map((element) => {
      return element + card.rank
    })
  }

  for (let i = 0; i <= scoreSpread.length; i++) {
    if (scoreSpread[i] <= 21 || i === scoreSpread.length - 1) {
      score = scoreSpread[i]
      break
    }
  }

  commit('setScore', {
    receiver,
    score
  })
}

export const newGame = ({ dispatch, commit }) => {
  commit('clearCardsAndScore')
  dispatch('prepareNewDeck')
  for (let i = 0; i < 4; i++) {
    let receiver = 'player'
    if (i % 2) {
      receiver = 'dealer'
    }
    dispatch('drawRandomCard', receiver)
  }
}

export const showDealerCards = ({ commit, dispatch }) => {
  commit('reverseDealerCard')
  dispatch('countScore', 'dealer')
}

export const dealerTurn = () => {
  this.$store.dispatch('showDealerCards')
  if (this.playerScore <= 21) {
    while (this.dealerScore < this.playerScore && this.dealerScore < 21) {
      this.$store.dispatch('drawRandomCard', 'dealer')
    }
  }
  this.verdict()
}

export const verdict = () => {
  if (this.dealerScore > 21) {
    this.verdictMsg = 'You Won'
  } else if (this.playerScore > 21) {
    this.verdictMsg = 'You Lose'
  } else {
    if (this.dealerScore > this.playerScore) {
      this.verdictMsg = 'You Lose'
    } else if (this.dealerScore === this.playerScore) {
      this.verdictMsg = 'Push'
    } else {
      this.verdictMsg = 'You Won'
    }
  }
}
