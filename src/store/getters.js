export const getPlayerCards = (state) => {
  return state.dealtCards.player
}

export const getDealerCards = (state) => {
  return state.dealtCards.dealer
}

export const getPlayerScore = (state) => {
  return state.score.player
}

export const getDealerScore = (state) => {
  return state.score.dealer
}

export const getBetAmount = (state) => {
  if (!state.bet.length) {
    console.log('jee')
    return 0
  }
  console.log('dalyj')
  const score = state.bet.reduce((a, b) => {
    return a + b
  })
  return score
}
