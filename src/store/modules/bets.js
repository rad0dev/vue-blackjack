const state = {
  coins: 500,
  bet: []
}

const getters = {
  getBetAmount: (state) => {
    if (!state.bet.length) {
      return 0
    }
    const score = state.bet.reduce((a, b) => {
      return a + b
    })
    return score
  }
}

const actions = {
  makeDeal ({ dispatch }) {
    return dispatch('newGame', null, { root: true })
  },
  raiseBet ({ state, commit }, amount) {
    commit('raiseBet', amount)
    commit('setCoins', state.coins - amount)
  },
  reduceBet ({ state, commit }) {
    const amount = state.bet[state.bet.length - 1]
    commit('reduceBet')
    commit('setCoins', state.coins + amount)
  }
}

const mutations = {
  raiseBet (state, bet) {
    state.bet.push(parseInt(bet))
  },
  reduceBet (state) {
    state.bet.pop()
  },
  clearBet (state) {
    state.bet = []
  },
  setCoins (state, coins) {
    state.coins = parseInt(coins)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
