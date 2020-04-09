import globalAxios from 'axios'

const state = {
  highscores: null
}

const getters = {
  getHighscoresData (state) {
    const data = []
    Object.entries(state.highscores).forEach(([key, value]) => {
      data.push(value)
    })
    data.sort((a, b) => {
      return b.highestBalance - a.highestBalance
    })
    return data
  }
}

const actions = {
  sendScore ({ rootState }, score) {
    const data = {
      nickname: rootState.auth.user.nickname,
      highestBalance: score.highestBalance,
      highestBet: score.highestBet,
      dealsWon: score.dealsWon
    }
    globalAxios.post('/scores.json' + '?auth=' + rootState.auth.idToken, data)
  },
  fetchScores ({ rootState, commit }) {
    globalAxios.get('/scores.json' + '?orderBy="highestBalance"&limitToLast=20')
      .then(res => commit('setHighscores', res.data))
      .catch(error => console.warn(error))
  }
}

const mutations = {
  setHighscores (state, highscores) {
    state.highscores = highscores
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
