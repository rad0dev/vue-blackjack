import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardsRanks: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'],
    cardsSuits: ['hearts', 'diamonds', 'clubs', 'spades'],
    deck: [],
    playerCards: [],
    dealerCards: [],
    playerCardsScore: 0,
    dealerCardsScore: 0,
    coins: 500,
    bet: 0
  },
  mutations: {
    setDeck (state, newDeck) {
      state.deck = newDeck
    },
    removeFromDeck (state, index) {
      state.deck.splice(index, 1)
    },
    putToPlayerDeck (state, card) {
      state.playerCards.push(card)
    },
    putToDealerDeck (state, card) {
      state.dealerCards.push(card)
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
    drawRandomCard ({ state, commit }) {
      const cardIndex = Math.floor(Math.random() * (state.deck.length - 1))
      commit('putToPlayerDeck', state.deck[cardIndex])
      commit('removeFromDeck', cardIndex)
    }
  }
})
