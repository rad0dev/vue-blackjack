import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import state from './state'
import bets from './modules/bets'
import cards from './modules/cards'
import verdict from './modules/verdict'
import auth from './modules/auth'
import highscores from './modules/highscores'
import * as mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vue-blackjack',
  storage: window.localStorage,
  reducer: (state) => ({
    activePhaseComponent: state.activePhaseComponent,
    bets: {
      funds: state.bets.funds,
      betCoins: state.bets.betCoins,
      betPrimary: state.bets.betPrimary,
      betSecondary: state.bets.betSecondary
    },
    cards: {
      deck: state.cards.deck,
      dealtCards: state.cards.dealtCards,
      score: state.cards.score
    }
  })
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    bets,
    cards,
    verdict,
    auth,
    highscores
  },
  plugins: [vuexLocalStorage.plugin]
})
