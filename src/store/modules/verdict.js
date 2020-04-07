const initialState = () => {
  return {
    verdictMsg: '',
    highestBalance: 500,
    highestBet: 0,
    dealsWon: 0
  }
}

const state = initialState()

const actions = {
  checkVerdict: ({ rootGetters, dispatch }) => {
    const playerOver21 = rootGetters['cards/getPlayerScore'] > 21
    const playerBlackjack =
      rootGetters['cards/getPlayerScore'] === 21 &&
      rootGetters['cards/getPlayerCards'].length === 2
    const dealerOver21 = rootGetters['cards/getDealerScore'] > 21
    const dealerBlackjack =
      rootGetters['cards/getDealerScore'] === 21 &&
      rootGetters['cards/getDealerCards'].length === 2

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

    if (rootGetters['cards/getDealerScore'] < rootGetters['cards/getPlayerScore']) {
      dispatch('verdict', 'win')
      return
    }

    if (rootGetters['cards/getDealerScore'] === rootGetters['cards/getPlayerScore']) {
      dispatch('verdict', 'push')
      return
    }

    dispatch('verdict', 'lose')
  },
  verdict: ({ dispatch, commit, rootGetters, rootState }, verdict) => {
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
      case 'surrender':
        dispatch('verdictSurrender')
        break
      case 'insurance':
        dispatch('verdictInsurance')
        break
    }
    commit('setActivePhaseComponent', 'Verdict', { root: true })

    if (rootGetters['cards/getPlayerSplittedCards'].length) {
      setTimeout(() => dispatch('runSplittedDeckVerdict'), 3000)
      return
    }

    if (!rootState.bets.funds > 0) {
      setTimeout(() => dispatch('runGameOver'), 3000)
      return
    }

    setTimeout(() => dispatch('runBets', null, { root: true }), 3000)
  },
  runSplittedDeckVerdict: ({ commit, dispatch }) => {
    commit('bets/setBetSecondary', null, { root: true })
    dispatch('cards/replaceSplittedCards', null, { root: true })
    dispatch('cards/countScore', 'player', { root: true })
    commit('cards/setPlayerSplittedDealtCards', null, { root: true })
    commit('setActivePhaseComponent', null, { root: true })
    dispatch('checkVerdict')
  },
  runGameOver: ({ commit }) => {
    commit('bets/setBetPrimary', null, { root: true })
    commit('cards/clearCardsAndScore', null, { root: true })
    commit('setActivePhaseComponent', 'GameOver', { root: true })
  },
  verdictLose: ({ commit }) => {
    commit('setVerdictMsg', 'You Lost!')
  },
  verdictWin: ({ rootState, rootGetters, commit, dispatch }) => {
    commit('dealsWonIncrement')
    commit('setVerdictMsg', 'You Won!')
    dispatch('bets/setFundsAndHighscore', rootState.bets.funds + rootGetters['bets/getBet'] * 2, { root: true })
  },
  verdictPush: ({ rootState, rootGetters, commit, dispatch }) => {
    commit('setVerdictMsg', 'Push!')
    dispatch('bets/setFundsAndHighscore', rootState.bets.funds + rootGetters['bets/getBet'], { root: true })
  },
  verdictBlackjack: ({ rootState, rootGetters, commit, dispatch }) => {
    commit('dealsWonIncrement')
    commit('setVerdictMsg', 'Blackjack!')
    dispatch('bets/setFundsAndHighscore', rootState.bets.funds + Math.floor(rootGetters['bets/getBet'] * 2.5), { root: true })
  },
  verdictSurrender: ({ rootState, rootGetters, commit, dispatch }) => {
    commit('setVerdictMsg', 'Surrender')
    dispatch('bets/setFundsAndHighscore', rootState.bets.funds + Math.floor(rootGetters['bets/getBet'] / 2), { root: true })
  },
  verdictInsurance: ({ rootState, commit, dispatch }) => {
    commit('setVerdictMsg', 'Insurance paid')
    dispatch('bets/setFundsAndHighscore', rootState.bets.funds + rootState.bets.betPrimary, { root: true })
  }
}

const mutations = {
  setVerdictMsg (state, msg) {
    state.verdictMsg = msg
  },
  setHighestBet (state, bet) {
    state.highestBet = bet
  },
  setHighestBalance (state, balance) {
    state.highestBalance = balance
  },
  dealsWonIncrement (state) {
    state.dealsWon += 1
  },
  reset (state) {
    Object.assign(state, initialState())
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
