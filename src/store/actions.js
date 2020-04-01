export const newGame = ({ dispatch, commit }) => {
  commit('setActivePhaseComponent')
  commit('verdict/setVerdictMsg', '')
  dispatch('cards/prepareNewDeck')
  dispatch('bets/countCoins')
  // deal 4 cards from deck
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      dispatch('cards/drawRandomCard', i % 2 ? 'dealer' : 'player')
      if (i === 3) {
        dispatch('startPlayerTurn')
      }
    }, i * 500)
  }
}

export const startPlayerTurn = ({ getters, commit, dispatch }) => {
  if (getters['cards/getPlayerScore'] === 21 && getters['cards/hasSplittedDeckToPlay']) {
    dispatch('cards/replaceSplittedCards')
    dispatch('cards/drawRandomCard', 'player')
    dispatch('startPlayerTurn')
    return
  }

  if (getters['cards/getPlayerScore'] === 21) {
    dispatch('startDealerTurn')
    return
  }

  commit('setActivePhaseComponent', 'PlayerActions')
}

export const hit = ({ dispatch, getters, commit }) => {
  commit('setActivePhaseComponent')
  dispatch('cards/drawRandomCard', 'player')
  if (getters['cards/getPlayerScore'] >= 21 && getters['cards/hasSplittedDeckToPlay']) {
    setTimeout(() => {
      dispatch('cards/replaceSplittedCards')
    }, 2500)
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

  setTimeout(() => {
    commit('setActivePhaseComponent', 'PlayerActions')
  }, 500)
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
  dispatch('bets/doubleBet')
  dispatch('cards/drawRandomCard', 'player')
  dispatch('startPlayerTurn')
  commit('setActivePhaseComponent', 'PlayerActions')
}

export const startDealerTurn = ({ getters, commit, dispatch }) => {
  commit('cards/reverseDealerCard')
  dispatch('cards/countScore', 'dealer')

  const splitted = !!getters['cards/getPlayerSplittedCards'].length
  const singleDeckPlayerBlackjack =
    !getters['cards/getPlayerSplittedCards'].length &&
    getters['cards/getPlayerCards'].length === 2 &&
    getters['cards/getPlayerScore'] === 21
  const splittedDecksPlayerBlackjacks =
    getters['cards/getPlayerSplittedCards'].length === 2 &&
    getters['cards/getPlayerSplittedScore'] === 21 &&
    getters['cards/getPlayerCards'].length === 2 &&
    getters['cards/getPlayerScore'] === 21
  const playerOver21 = getters['cards/getPlayerScore'] > 21
  const dealerBlackjack = getters['cards/getDealerScore'] === 21

  if (
    singleDeckPlayerBlackjack ||
    splittedDecksPlayerBlackjacks ||
    dealerBlackjack ||
    (playerOver21 && !splitted)
  ) {
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
    }, 500)
  }
  drawNextCard()
}
