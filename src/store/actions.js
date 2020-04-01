export const newGame = ({ dispatch, commit }) => {
  commit('setActivePhaseComponent')
  commit('setVerdictMsg', '')
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
    dispatch('checkVerdict')
    return
  }

  dispatch('drawDealersCards')
}

export const drawDealersCards = ({ getters, dispatch }) => {
  const drawNextCard = () => {
    setTimeout(() => {
      if (getters['cards/getDealerScore'] > 16) {
        return dispatch('checkVerdict')
      }
      dispatch('cards/drawRandomCard', 'dealer')
      drawNextCard()
    }, 500)
  }
  drawNextCard()
}

export const checkVerdict = ({ getters, dispatch }) => {
  const playerOver21 = getters['cards/getPlayerScore'] > 21
  const playerBlackjack =
    getters['cards/getPlayerScore'] === 21 &&
    getters['cards/getPlayerCards'].length === 2
  const dealerOver21 = getters['cards/getDealerScore'] > 21
  const dealerBlackjack =
    getters['cards/getDealerScore'] === 21 &&
    getters['cards/getDealerCards'].length === 2

  if (playerOver21) {
    dispatch('verdict', 'lose')
    return
  }

  if (dealerOver21) {
    dispatch('verdict', 'win')
    return
  }

  if (playerBlackjack && dealerBlackjack) {
    dispatch('verdict', 'push')
    return
  }

  if (playerBlackjack) {
    dispatch('verdict', 'blackjack')
    return
  }

  if (dealerBlackjack) {
    dispatch('verdict', 'lose')
    return
  }

  if (getters['cards/getDealerScore'] < getters['cards/getPlayerScore']) {
    dispatch('verdict', 'win')
    return
  }

  if (getters['cards/getDealerScore'] === getters['cards/getPlayerScore']) {
    dispatch('verdict', 'push')
    return
  }

  dispatch('verdict', 'lose')
}

export const verdict = ({ dispatch, commit, getters }, verdict) => {
  switch (verdict) {
    case 'lose':
      dispatch('verdictLose')
      break
    case 'win':
      dispatch('verdictWin')
      break
    case 'blackjack':
      dispatch('verdictBlackjack')
      break
    case 'push':
      dispatch('verdictPush')
      break
  }
  commit('setActivePhaseComponent', 'Verdict')

  if (getters['cards/getPlayerSplittedCards'].length) {
    setTimeout(() => {
      commit('bets/setBetSecondary')
      dispatch('cards/replaceSplittedCards')
      dispatch('cards/countScore', 'player')
      commit('cards/setPlayerSplittedDealtCards')
      commit('setActivePhaseComponent')
      dispatch('checkVerdict')
    }, 3000)
    return
  }

  setTimeout(() => {
    commit('bets/setBetPrimary')
    commit('cards/clearCardsAndScore')
    commit('setActivePhaseComponent', 'Bets')
  }, 3000)
}

export const verdictLose = ({ commit }) => {
  commit('setVerdictMsg', 'You Lost!')
}

export const verdictWin = ({ state, commit, getters }) => {
  commit('setVerdictMsg', 'You Won!')
  commit('bets/setFunds', state.bets.funds + getters['bets/getBet'] * 2)
}

export const verdictPush = ({ state, commit, getters }) => {
  commit('setVerdictMsg', 'Push!')
  commit('bets/setFunds', state.bets.funds + getters['bets/getBet'])
}

export const verdictBlackjack = ({ state, commit, getters }) => {
  commit('setVerdictMsg', 'Blackjack!')
  commit('bets/setFunds', state.bets.funds + Math.floor(getters['bets/getBet'] * 2.5))
}
