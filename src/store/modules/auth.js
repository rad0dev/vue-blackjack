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
    return new Promise((resolve, reject) => {
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
          const expirationTime = now.getTime() + res.data.expiresIn * 1000
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationTime', expirationTime)
          const userData = {
            email: authData.email,
            nickname: authData.nickname
          }
          dispatch('storeUser', { [res.data.localId]: userData })
          commit('storeUser', userData)
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/')
          resolve(true)
        })
        .catch(error => reject(error))
    })
  },
  login ({ commit, dispatch }, authData) {
    return new Promise((resolve, reject) => {
      authAxios.post('/accounts:signInWithPassword?key=AIzaSyB4wPOMwY95PRaeUY6ub4JmD0HYmMFRGow', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          const now = new Date()
          const expirationTime = now.getTime() + res.data.expiresIn * 1000
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationTime', expirationTime)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('fetchUser')
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/')
          resolve(true)
        })
        .catch(error => reject(error))
    })
  },
  tryAutoLogin ({ commit }) {
    const token = localStorage.getItem('token')
    const expirationTime = localStorage.getItem('expirationTime')
    const userId = localStorage.getItem('userId')
    if (!token || !expirationTime || !userId) {
      return
    }
    const expirationDate = new Date(parseInt(expirationTime))
    const now = new Date()
    if (now >= expirationDate) {
      return
    }
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
