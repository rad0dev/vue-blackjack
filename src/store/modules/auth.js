import globalAxios from 'axios'
import authAxios from '../../utils/axiosAuth'
import router from '../../router'

const state = {
  idToken: null,
  userId: null,
  user: null
}

const getters = {
  user (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.idToken !== null
  }
}

const actions = {
  setLogoutTimer ({ commit }, expirationTime) {
    setTimeout(() => {
      commit('clearAuthData')
    }, expirationTime * 1000)
  },
  signup ({ commit, dispatch }, authData) {
    authAxios.post('/accounts:signUp?key=AIzaSyB4wPOMwY95PRaeUY6ub4JmD0HYmMFRGow', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(res => {
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        const userData = {
          email: authData.email,
          nickname: authData.nickname
        }
        dispatch('storeUser', { [res.data.localId]: userData })
        commit('storeUser', userData)
        dispatch('setLogoutTimer', res.data.expiresIn)
        router.replace('/')
      })
      .catch(() => {})
  },
  login ({ commit, dispatch }, authData) {
    authAxios.post('/accounts:signInWithPassword?key=AIzaSyB4wPOMwY95PRaeUY6ub4JmD0HYmMFRGow', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(res => {
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
        dispatch('fetchUser')
        dispatch('setLogoutTimer', res.data.expiresIn)
        router.replace('/')
      })
      .catch(() => {})
  },
  tryAutoLogin ({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date()
    if (now >= expirationDate) {
      return
    }
    const userId = localStorage.getItem('userId')
    commit('authUser', {
      token: token,
      userId: userId
    })
  },
  logout ({ commit }) {
    commit('clearAuthData')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.replace('/login')
  },
  storeUser ({ commit, state }, userData) {
    if (!state.idToken) {
      return
    }
    globalAxios.patch(`/users.json?auth=${state.idToken}`, userData)
      .then(() => {})
      .catch(() => {})
  },
  fetchUser ({ commit, state }) {
    if (!(state.userId && state.idToken)) {
      return
    }
    globalAxios.get(`/users/${state.userId}.json?auth=${state.idToken}`)
      .then(res => {
        commit('storeUser', res.data)
      })
      .catch(() => {})
  }
}

const mutations = {
  authUser (state, userData) {
    state.idToken = userData.token
    state.userId = userData.userId
  },
  storeUser (state, user) {
    state.user = user
  },
  clearAuthData (state) {
    state.user = null
    state.idToken = null
    state.userId = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
