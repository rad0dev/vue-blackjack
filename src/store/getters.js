export const canSplit = (state) => {
  if (
    !state.cards.dealtCards.playerSplitted.length &&
    state.cards.dealtCards.player.length === 2 &&
    state.cards.dealtCards.player[0].rank === state.cards.dealtCards.player[1].rank &&
    state.bets.funds >= state.bets.betPrimary
  ) {
    return true
  }
  return false
}

export const canDouble = (state) => {
  if (
    !state.cards.dealtCards.playerSplitted.length &&
    state.cards.dealtCards.player.length === 2 &&
    state.bets.funds >= state.bets.betPrimary
  ) {
    return true
  }
  return false
}

export const canSurrender = (state) => {
  if (
    !state.cards.dealtCards.playerSplitted.length &&
    state.cards.dealtCards.player.length === 2
  ) {
    return true
  }
  return false
}

export const canInsurance = (state) => {
  if (
    !state.cards.dealtCards.playerSplitted.length &&
    state.cards.dealtCards.player.length === 2 &&
    state.cards.dealtCards.dealer[1].rank === 'ace' &&
    state.bets.funds >= Math.round(state.bets.betPrimary)
  ) {
    return true
  }
  return false
}
