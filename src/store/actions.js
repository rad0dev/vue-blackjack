export const newGame = ({ dispatch, commit, getters }) => {
  commit('setActivePhaseComponent', '')
  commit('setVerdictMsg', '')
  dispatch('cards/prepareNewDeck')
  // deal 4 cards from deck
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      let receiver = 'player'
      if (i % 2) {
        receiver = 'dealer'
      }
      dispatch('cards/drawRandomCard', receiver)
      if (i === 3) {
        dispatch('startPlayerTurn')
      }
    }, i * 600)
  }
}

export const startPlayerTurn = ({ getters, commit, dispatch }) => {
  const playerBlackjack = getters['cards/getPlayerScore'] === 21
  if (playerBlackjack) {
    return dispatch('startDealerTurn', true)
  }
  commit('setActivePhaseComponent', 'PlayerActions')
}

export const hit = ({ dispatch, getters }) => {
  dispatch('cards/drawRandomCard', 'player')
  if (getters['cards/getPlayerScore'] >= 21) {
    dispatch('startDealerTurn')
  }
}

export const startDealerTurn = ({ getters, commit, dispatch }, blackjack) => {
  commit('setActivePhaseComponent', '')
  commit('cards/reverseDealerCard')
  dispatch('cards/countScore', 'dealer')

  const dealerBlackjack = getters['cards/getDealerScore'] === 21

  if (blackjack) {
    if (dealerBlackjack) {
      return dispatch('verdict', 'push')
    }
    return dispatch('verdict', 'blackjack')
  }

  if (dealerBlackjack) {
    return dispatch('verdict', 'lose')
  }

  if (getters['cards/getPlayerScore'] > 21) {
    return dispatch('verdict', 'lose')
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
    }, 600)
  }
  drawNextCard()
}

export const checkVerdict = ({ getters, dispatch }) => {
  if (getters['cards/getDealerScore'] > 21) {
    return dispatch('verdict', 'win')
  }
  if (getters['cards/getDealerScore'] > 21) {

  } else if (getters['cards/getPlayerScore'] > 21) {

  } else {
    if (getters['cards/getDealerScore'] > getters['cards/getPlayerScore']) {
      dispatch('verdict', 'lose')
    } else if (getters['cards/getDealerScore'] === getters['cards/getPlayerScore']) {
      dispatch('verdict', 'push')
    } else {
      dispatch('verdict', 'win')
    }
  }
}

export const verdict = ({ dispatch, commit }, verdict) => {
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
  setTimeout(() => {
    commit('bets/clearBet')
    commit('cards/clearCardsAndScore')
    commit('setActivePhaseComponent', 'Bets')
  }, 4000)
}

export const verdictLose = ({ commit }) => {
  commit('setVerdictMsg', 'You Lost!')
}

export const verdictWin = ({ state, commit, getters }) => {
  commit('setVerdictMsg', 'You Won!')
  commit('bets/setCoins', state.bets.coins + getters['bets/getBetAmount'] * 2)
}

export const verdictPush = ({ state, commit, getters }) => {
  commit('setVerdictMsg', 'Push!')
  commit('bets/setCoins', state.bets.coins + getters['bets/getBetAmount'])
}

export const verdictBlackjack = ({ state, commit, getters }) => {
  commit('setVerdictMsg', 'Blackjack!')
  commit('bets/setCoins', state.bets.coins + Math.floor(getters['bets/getBetAmount'] * 2.5))
}
