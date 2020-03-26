import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardsRanks: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'],
    cardsSuits: ['hearts', 'diamonds', 'clubs', 'spades'],
    deck: [],
    dealtCards: {
      dealer: [],
      player: []
    },
    score: {
      dealer: [],
      player: []
    },
    coins: 500,
    bet: 0
  },
  getters: {
    getPlayerCards (state) {
      return state.dealtCards.player
    },
    getDealerCards (state) {
      return state.dealtCards.dealer
    },
    getPlayerScore (state) {
      return state.score.player
    },
    getDealerScore (state) {
      return state.score.dealer
    }
  },
  mutations: {
    clearCardsAndScore (state) {
      state.dealtCards.player = []
      state.dealtCards.dealer = []
      state.score.player = [0, 0]
      state.score.dealer = [0, 0]
    },
    setDeck (state, newDeck) {
      state.deck = newDeck
    },
    unsetFromDeck (state, index) {
      state.deck.splice(index, 1)
    },
    addNewCard (state, { receiver, card }) {
      state.dealtCards[receiver].push(card)
    },
    addToScore (state, { receiver, card }) {
      if (typeof card.rank !== 'number') {
        if (card.rank === 'Ace') {
          state.score[receiver][0] += 11
          state.score[receiver][1] += 1
        } else {
          state.score[receiver][0] += 10
          state.score[receiver][1] += 10
        }
      } else {
        state.score[receiver][0] += card.rank
        state.score[receiver][1] += card.rank
      }
    }
  },
  actions: {
    prepareNewDeck ({ state, commit }) {
      const newDeck = []
      for (const suit of state.cardsSuits) {
        for (const rank of state.cardsRanks) {
          newDeck.push({
            rank,
            suit
          })
        }
      }
      commit('setDeck', newDeck)
    },
    drawRandomCard ({ state, commit }, receiver) {
      const cardIndex = Math.floor(Math.random() * (state.deck.length - 1))
      const payload = {
        receiver,
        card: state.deck[cardIndex]
      }
      commit('addNewCard', payload)
      commit('addToScore', payload)
      commit('unsetFromDeck', cardIndex)
    },
    newGame ({ dispatch, commit }) {
      commit('clearCardsAndScore')
      dispatch('prepareNewDeck')
      for (let i = 0; i < 4; i++) {
        let receiver = 'player'
        if (i % 2) {
          receiver = 'dealer'
        }
        dispatch('drawRandomCard', receiver)
      }
    }
  }
})
