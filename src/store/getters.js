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
