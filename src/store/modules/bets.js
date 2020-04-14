const initialState = () => {
  return {
    funds: 500,
    betCoins: [],
    betPrimary: 0,
    betSecondary: 0
  }
}

const state = initialState()

const getters = {
  getBet (state) {
    return state.betSecondary || state.betPrimary
  }
}

const actions = {
  countCoins ({ state, commit, dispatch }) {
    let bet = 0
    if (state.betCoins.length) {
      bet = state.betCoins.reduce((a, b) => {
        return a + b
      })
    }
    commit('verdict/setHighestBet', bet, { root: true })
    dispatch('setBetPrimaryAndHighscore', bet)
    commit('clearBetCoins')
  },
  tossACoin ({ state, commit }, amount) {
    commit('pushCoin', amount)
    commit('setFunds', state.funds - amount)
  },
  pickupACoin ({ state, commit }) {
    const amount = state.betCoins[state.betCoins.length - 1]
    commit('popCoin')
    commit('setFunds', state.funds + amount)
  },
  splitBet ({ state, commit }) {
    commit('setFunds', state.funds - state.betPrimary)
    commit('setBetSecondary', state.betPrimary)
  },
  doubleBet ({ state, commit, dispatch }) {
    commit('setFunds', state.funds - state.betPrimary)
    dispatch('setBetPrimaryAndHighscore', state.betPrimary * 2)
  },
  setFundsAndHighscore ({ rootState, commit }, funds) {
    if (funds > rootState.verdict.highestBalance) {
      commit('verdict/setHighestBalance', funds, { root: true })
    }
    commit('setFunds', funds)
  },
  setBetPrimaryAndHighscore ({ rootState, commit }, bet) {
    if (bet > rootState.verdict.highestBet) {
      commit('verdict/setHighestBet', bet, { root: true })
    }
    commit('setBetPrimary', bet)
  }
}

const mutations = {
  reset (state) {
    Object.assign(state, initialState())
  },
  pushCoin (state, bet) {
    state.betCoins.push(parseInt(bet))
  },
  popCoin (state) {
    state.betCoins.pop()
  },
  clearBetCoins (state) {
    state.betCoins = []
  },
  setFunds (state, funds) {
    state.funds = parseInt(funds)
  },
  setBetPrimary (state, bet) {
    state.betPrimary = parseInt(bet || 0)
  },
  setBetSecondary (state, bet) {
    state.betSecondary = parseInt(bet || 0)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
