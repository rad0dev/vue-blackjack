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
      console.log('i', i)
      if (i === 3) {
        commit('setActivePhaseComponent', 'PlayerActions')
      }
    }, i * 500)
  }
}

export const dealerTurn = ({ getters, commit, dispatch }) => {
  commit('reverseDealerCard')
  dispatch('countScore', 'dealer')
  const nextDealerCard = () => {
    setTimeout(() => {
      if (getters.getDealerScore < getters.getPlayerScore && getters.getDealerScore < 17) {
        dispatch('drawRandomCard', 'dealer')
        nextDealerCard()
      } else {
        dispatch('verdict')
      }
    }, 500)
  }
  nextDealerCard()
}

export const verdict = ({ getters, dispatch, commit }) => {
  if (getters.getDealerScore > 21) {
    dispatch('winBet')
  } else if (getters.getPlayerScore > 21) {
    dispatch('loseBet')
  } else {
    if (getters.getDealerScore > getters.getPlayerScore) {
      dispatch('loseBet')
    } else if (getters.getDealerScore === getters.getPlayerScore) {
      dispatch('pushBet')
    } else {
      dispatch('winBet')
    }
  }
  commit('setActivePhaseComponent', 'Verdict')
  setTimeout(() => {
    commit('clearBet')
    commit('clearCardsAndScore')
    commit('setActivePhaseComponent', 'Bets')
  }, 4000)
}

export const makeDeal = ({ dispatch }) => {
  dispatch('newGame')
}

export const raiseBet = ({ state, commit }, amount) => {
  commit('raiseBet', amount)
  commit('setCoins', state.coins - amount)
}

export const reduceBet = ({ state, commit }) => {
  const amount = state.bet[state.bet.length - 1]
  commit('reduceBet')
  commit('setCoins', state.coins + amount)
}

export const loseBet = ({ state }) => {
  state.verdictMsg = 'You Lost!'
}

export const winBet = ({ state, commit, getters }) => {
  state.verdictMsg = 'You Won!'
  commit('setCoins', state.coins + getters.getBetAmount * 2)
}

export const pushBet = ({ state, commit, getters }) => {
  state.verdictMsg = 'Push!'
  commit('setCoins', state.coins + getters.getBetAmount)
}
