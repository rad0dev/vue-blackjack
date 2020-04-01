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
