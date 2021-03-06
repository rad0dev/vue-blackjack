export const newGame = ({ commit, dispatch }) => {
  commit('cards/reset')
  commit('bets/reset')
  commit('verdict/reset')
  dispatch('runBets')
}

export const newHand = ({ dispatch, commit, state }) => {
  commit('setActivePhaseComponent')
  commit('verdict/setVerdictMsg', '')
  // sort cards if less than half of deck
  if (state.cards.deck.length < 26) {
    dispatch('cards/prepareNewDeck')
  }
  dispatch('bets/countCoins')
  // deal 4 cards from deck
  for (let i = 0; i < 4; i++) {
    setTimeout(() => dispatch('cards/drawRandomCard', i % 2 ? 'dealer' : 'player'), i * 500)
  }
  setTimeout(() => dispatch('blackjacksCheck'), 2000)
}

export const runBets = ({ commit }) => {
  commit('bets/setBetPrimary', null)
  commit('cards/clearCardsAndScore', null)
  commit('setActivePhaseComponent', 'Bets')
}

export const blackjacksCheck = ({ getters, dispatch, commit }) => {
  const dealerCards = getters['cards/getDealerCards']
  const playerBj = getters['cards/getPlayerScore'] === 21
  const dealerBj =
    dealerCards.some(card => card.rank === 'ace') &&
    dealerCards.some(card => [10, 'jack', 'queen', 'king'].indexOf(card.rank) !== -1)

  if (playerBj || dealerBj) {
    commit('cards/reverseDealerCard')
    dispatch('cards/countScore', 'dealer')
    dispatch('verdict/checkVerdict')
    return
  }

  dispatch('startPlayerTurn')
}

export const startPlayerTurn = ({ getters, commit, dispatch }) => {
  if (getters['cards/getPlayerScore'] === 21 && getters['cards/hasSplittedDeckToPlay']) {
    dispatch('cards/replaceSplittedCards')
    dispatch('cards/drawRandomCard', 'player')
    dispatch('startPlayerTurn')
    return
  }

  commit('setActivePhaseComponent', 'PlayerActions')
}

export const hit = ({ dispatch, getters, commit }) => {
  commit('setActivePhaseComponent')
  dispatch('cards/drawRandomCard', 'player')

  if (getters['cards/getPlayerScore'] >= 21 && getters['cards/hasSplittedDeckToPlay']) {
    setTimeout(() => dispatch('cards/replaceSplittedCards'), 2500)
    setTimeout(() => {
      dispatch('cards/drawRandomCard', 'player')
      dispatch('startPlayerTurn')
    }, 3000)
    return
  }
  if (getters['cards/getPlayerScore'] >= 21) {
    dispatch('startDealerTurn')
    return
  }

  setTimeout(() => commit('setActivePhaseComponent', 'PlayerActions'), 500)
}

export const stand = ({ dispatch, getters, commit }) => {
  commit('setActivePhaseComponent')
  if (getters['cards/hasSplittedDeckToPlay']) {
    dispatch('cards/replaceSplittedCards')
    dispatch('cards/drawRandomCard', 'player')
    dispatch('startPlayerTurn')
    return
  }
  dispatch('startDealerTurn')
}

export const split = ({ commit, dispatch }) => {
  commit('setActivePhaseComponent')
  commit('cards/splitPlayerDecks')
  dispatch('bets/splitBet')
  dispatch('cards/drawRandomCard', 'player')
  dispatch('startPlayerTurn')
  commit('setActivePhaseComponent', 'PlayerActions')
}

export const double = ({ commit, dispatch }) => {
  commit('setActivePhaseComponent')
  dispatch('bets/doubleBet')
  dispatch('cards/drawRandomCard', 'player')
  dispatch('startDealerTurn')
}

export const surrender = ({ commit, dispatch }) => {
  commit('setActivePhaseComponent')
  commit('cards/reverseDealerCard')
  dispatch('cards/countScore', 'dealer')
  dispatch('verdict/verdict', 'surrender')
}

export const insurance = ({ commit, dispatch, getters, state }) => {
  const insuranceAmount = Math.round(state.bets.betPrimary / 2)
  commit('cards/reverseDealerCard')
  dispatch('cards/countScore', 'dealer')
  commit('bets/setFunds', state.bets.funds - insuranceAmount)
  commit('bets/setBetSecondary', insuranceAmount)

  const needToBlackjack = [10, 'jack', 'queen', 'king']
  if (needToBlackjack.indexOf(getters['cards/getDealerCards'][0].rank) !== -1) {
    commit('cards/reverseDealerCard')
    dispatch('cards/countScore', 'dealer')
    dispatch('verdict/verdict', 'insurance')
    return
  }
  dispatch('verdict/verdict', 'lose')
}

export const startDealerTurn = ({ getters, commit, dispatch }) => {
  commit('cards/reverseDealerCard')
  dispatch('cards/countScore', 'dealer')

  const notSplitted = !getters['cards/getPlayerSplittedCards'].length
  const splittedDecksPlayerBlackjacks =
    getters['cards/getPlayerSplittedCards'].length === 2 &&
    getters['cards/getPlayerSplittedScore'] === 21 &&
    getters['cards/getPlayerCards'].length === 2 &&
    getters['cards/getPlayerScore'] === 21
  const playerOver21 = getters['cards/getPlayerScore'] > 21

  if (splittedDecksPlayerBlackjacks || (playerOver21 && notSplitted)) {
    dispatch('verdict/checkVerdict')
    return
  }

  dispatch('drawDealersCards')
}

export const drawDealersCards = ({ getters, dispatch }) => {
  const drawNextCard = () => {
    setTimeout(() => {
      if (getters['cards/getDealerScore'] > 16) {
        return dispatch('verdict/checkVerdict')
      }
      dispatch('cards/drawRandomCard', 'dealer')
      drawNextCard()
    }, 600)
  }
  drawNextCard()
}
