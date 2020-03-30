export const hit = ({ dispatch, getters }) => {
  dispatch('cards/drawRandomCard', 'player')
  if (getters['cards/getPlayerScore'] >= 21) {
    dispatch('dealerTurn', 'player')
  }
}

export const newGame = ({ dispatch, commit, state }) => {
  commit('setActivePhaseComponent', '')
  state.verdictMsg = ''
  dispatch('cards/prepareNewDeck')
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      let receiver = 'player'
      if (i % 2) {
        receiver = 'dealer'
      }
      dispatch('cards/drawRandomCard', receiver)
      if (i === 3) {
        commit('setActivePhaseComponent', 'PlayerActions')
      }
    }, i * 600)
  }
}

export const dealerTurn = ({ getters, commit, dispatch }) => {
  commit('cards/reverseDealerCard')
  dispatch('cards/countScore', 'dealer')
  const nextDealerCard = () => {
    setTimeout(() => {
      if (getters['cards/getDealerScore'] < getters['cards/getPlayerScore'] &&
        getters['cards/getDealerScore'] < 17 &&
        getters['cards/getPlayerScore'] < 21) {
        dispatch('cards/drawRandomCard', 'dealer')
        nextDealerCard()
      } else {
        dispatch('verdict')
      }
    }, 600)
  }
  nextDealerCard()
}

export const verdict = ({ getters, dispatch, commit }) => {
  if (getters['cards/getDealerScore'] > 21) {
    dispatch('bets/winBet')
  } else if (getters['cards/getPlayerScore'] > 21) {
    dispatch('bets/loseBet')
  } else {
    if (getters['cards/getDealerScore'] > getters['cards/getPlayerScore']) {
      dispatch('bets/loseBet')
    } else if (getters['cards/getDealerScore'] === getters['cards/getPlayerScore']) {
      dispatch('bets/pushBet')
    } else {
      dispatch('bets/winBet')
    }
  }
  commit('setActivePhaseComponent', 'Verdict')
  setTimeout(() => {
    commit('bets/clearBet')
    commit('cards/clearCardsAndScore')
    commit('setActivePhaseComponent', 'Bets')
  }, 4000)
}
