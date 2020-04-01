const state = {
  cardsRanks: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'],
  cardsSuits: ['heart', 'diamond', 'club', 'spade'],
  deck: [],
  dealtCards: {
    dealer: [],
    player: [],
    playerSplitted: []
  },
  score: {
    dealer: 0,
    player: 0
  }
}

const getters = {
  getPlayerCards: (state) => {
    return state.dealtCards.player
  },
  getDealerCards: (state) => {
    return state.dealtCards.dealer
  },
  getPlayerSplittedCards: (state) => {
    return state.dealtCards.playerSplitted
  },
  getPlayerScore: (state) => {
    return state.score.player
  },
  getDealerScore: (state) => {
    return state.score.dealer
  },
  hasSplittedDeckToPlay: (state) => {
    return state.dealtCards.playerSplitted.length === 1
  }
}

const actions = {
  prepareNewDeck: ({ state, commit }) => {
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
  drawRandomCard: ({ state, commit, dispatch }, receiver) => {
    const cardIndex = Math.floor(Math.random() * (state.deck.length - 1))
    const payload = {
      receiver,
      card: state.deck[cardIndex]
    }
    if (state.dealtCards.dealer.length === 1 && receiver === 'dealer') {
      payload.card.reversed = true
    }
    commit('addNewCard', payload)
    dispatch('countScore', receiver)
    commit('unsetFromDeck', cardIndex)
  },
  countScore: ({ state, commit, dispatch }, receiver) => {
    let scoreSpread = [0]
    let score = 0
    for (const card of state.dealtCards[receiver]) {
      if (card.reversed) {
        continue
      }
      if (card.rank === 'ace') {
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
  replaceSplittedCards: ({ state, commit }) => {
    const cards = state.dealtCards.player
    commit('setPlayerDealtCards', state.dealtCards.playerSplitted)
    commit('setPlayerSplittedDealtCards', cards)
  }
}

const mutations = {
  clearCardsAndScore: (state) => {
    state.dealtCards.player = []
    state.dealtCards.playerSplitted = []
    state.dealtCards.dealer = []
    state.score.player = 0
    state.score.dealer = 0
  },
  setDeck: (state, newDeck) => {
    state.deck = newDeck
  },
  unsetFromDeck: (state, index) => {
    state.deck.splice(index, 1)
  },
  addNewCard: (state, { receiver, card }) => {
    state.dealtCards[receiver].push(card)
  },
  reverseDealerCard: (state) => {
    const reversedCard = state.dealtCards.dealer.pop()
    reversedCard.reversed = false
    state.dealtCards.dealer.push(reversedCard)
  },
  setScore: (state, { receiver, score }) => {
    state.score[receiver] = score
  },
  splitPlayerDecks: (state) => {
    state.dealtCards.playerSplitted.push(
      state.dealtCards.player.pop()
    )
  },
  setPlayerDealtCards: (state, cards) => {
    state.dealtCards.player = cards || []
  },
  setPlayerSplittedDealtCards: (state, cards) => {
    state.dealtCards.playerSplitted = cards || []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
