const state = {
  verdictMsg: ''
}

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
  verdict: ({ dispatch, commit, rootGetters }, verdict) => {
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
    }
    commit('setActivePhaseComponent', 'Verdict', { root: true })

    if (rootGetters['cards/getPlayerSplittedCards'].length) {
      setTimeout(() => {
        commit('bets/setBetSecondary', null, { root: true })
        dispatch('cards/replaceSplittedCards', null, { root: true })
        dispatch('cards/countScore', 'player', { root: true })
        commit('cards/setPlayerSplittedDealtCards', null, { root: true })
        commit('setActivePhaseComponent', null, { root: true })
        dispatch('checkVerdict')
      }, 3000)
      return
    }

    setTimeout(() => {
      commit('bets/setBetPrimary', null, { root: true })
      commit('cards/clearCardsAndScore', null, { root: true })
      commit('setActivePhaseComponent', 'Bets', { root: true })
    }, 3000)
  },
  verdictLose: ({ commit }) => {
    commit('setVerdictMsg', 'You Lost!')
  },
  verdictWin: ({ rootState, rootGetters, commit }) => {
    commit('setVerdictMsg', 'You Won!')
    commit('bets/setFunds', rootState.bets.funds + rootGetters['bets/getBet'] * 2, { root: true })
  },
  verdictPush: ({ rootState, rootGetters, commit }) => {
    commit('setVerdictMsg', 'Push!')
    commit('bets/setFunds', rootState.bets.funds + rootGetters['bets/getBet'], { root: true })
  },
  verdictBlackjack: ({ rootState, rootGetters, commit }) => {
    commit('setVerdictMsg', 'Blackjack!')
    commit('bets/setFunds', rootState.bets.funds + Math.floor(rootGetters['bets/getBet'] * 2.5), { root: true })
  },
  verdictSurrender: ({ rootState, rootGetters, commit }) => {
    commit('setVerdictMsg', 'Surrender')
    commit('bets/setFunds', rootState.bets.funds + Math.floor(rootGetters['bets/getBet'] / 2), { root: true })
  }
}

const mutations = {
  setVerdictMsg: (state, msg) => {
    state.verdictMsg = msg
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
