import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import bets from './modules/bets'
import cards from './modules/cards'
import verdict from './modules/verdict'
import * as mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    bets,
    cards,
    verdict
  }
})
