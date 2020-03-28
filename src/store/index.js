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
      dealer: 0,
      player: 0
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
    },
    getCoins (state) {
      return state.coins
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
    setScore (state, { receiver, score }) {
      state.score[receiver] = score
    },
    reverseDealerCard (state) {
      state.dealtCards.dealer[0].reversed = false
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
    drawRandomCard ({ state, commit, dispatch }, receiver) {
      const cardIndex = Math.floor(Math.random() * (state.deck.length - 1))
      const payload = {
        receiver,
        card: state.deck[cardIndex]
      }
      if (!state.dealtCards.dealer.length && receiver === 'dealer') {
        payload.card.reversed = true
      }

      commit('addNewCard', payload)
      dispatch('countScore', receiver)
      commit('unsetFromDeck', cardIndex)
    },
    countScore ({ state, commit, dispatch }, receiver) {
      let scoreSpread = [0]
      let score = 0

      for (const card of state.dealtCards[receiver]) {
        if (card.reversed) {
          continue
        }
        if (card.rank === 'Ace') {
          const newScoreSpread = []
          scoreSpread.forEach((element) => {
            newScoreSpread.push(element + 11, element + 1)
          })
          scoreSpread = newScoreSpread
          continue
        }
        if (typeof card.rank !== 'number') {
          scoreSpread = scoreSpread.map((element) => {
            return element + 10
          })
          continue
        }
        scoreSpread = scoreSpread.map((element) => {
          return element + card.rank
        })
      }

      for (let i = 0; i <= scoreSpread.length; i++) {
        if (scoreSpread[i] <= 21 || i === scoreSpread.length - 1) {
          score = scoreSpread[i]
          break
        }
      }

      commit('setScore', {
        receiver,
        score
      })
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
    },
    showDealerCards ({ commit, dispatch }) {
      commit('reverseDealerCard')
      dispatch('countScore', 'dealer')
    }
  }
})
