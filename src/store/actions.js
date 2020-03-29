/* eslint-disable no-unmodified-loop-condition */
export const prepareNewDeck = ({ state, commit }) => {
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
}

export const drawRandomCard = ({ state, commit, dispatch }, receiver) => {
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
}

export const countScore = ({ state, commit, dispatch }, receiver) => {
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
}

export const hit = ({ dispatch, getters }) => {
  dispatch('drawRandomCard', 'player')
  if (getters.getPlayerScore >= 21) {
    dispatch('dealerTurn', 'player')
  }
}

export const newGame = ({ dispatch, commit, state }) => {
  state.verdictMsg = ''
  commit('setActivePhaseComponent', 'PlayerActions')
  dispatch('prepareNewDeck')
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      let receiver = 'player'
      if (i % 2) {
        receiver = 'dealer'
      }
      dispatch('drawRandomCard', receiver)
    }, i * 500)
  }
}

export const dealerTurn = ({ getters, commit, dispatch }) => {
  commit('reverseDealerCard')
  setTimeout(() => {
    dispatch('countScore', 'dealer')
    if (getters.getPlayerScore <= 21) {
      while (getters.getDealerScore < getters.getPlayerScore && getters.getDealerScore < 21) {
        dispatch('drawRandomCard', 'dealer')
      }
    }
    dispatch('verdict')
  }, 500)
}

export const verdict = ({ state, commit, dispatch, getters }) => {
  if (getters.getDealerScore > 21) {
    state.verdictMsg = 'You Won!'
  } else if (getters.getPlayerScore > 21) {
    state.verdictMsg = 'You Lost!'
  } else {
    if (getters.getDealerScore > getters.getPlayerScore) {
      state.verdictMsg = 'You Lost!'
    } else if (getters.getDealerScore === getters.getPlayerScore) {
      state.verdictMsg = 'Push!'
    } else {
      state.verdictMsg = 'You Won!'
    }
  }
  commit('setActivePhaseComponent', 'Verdict')
  setTimeout(() => {
    commit('clearCardsAndScore')
    commit('setActivePhaseComponent', 'Welcome')
  }, 4000)
}
