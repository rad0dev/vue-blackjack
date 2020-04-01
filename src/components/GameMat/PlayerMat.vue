<template>
  <div class="game-mat">
    <score
      member="player"
      :score="score"
    ></score>
    <splitted-cards
      v-if="splittedCards.length"></splitted-cards>
    <coins
      v-if="activePhase === 'Bets'"
    ></coins>
    <cards
      v-else
      :cards="cards"
    ></cards>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Score from './Score'
import Cards from './Cards'
import Coins from './Coins'
import SplittedCards from './SplittedCards'

export default {
  components: { Score, Cards, Coins, SplittedCards },
  computed: {
    ...mapGetters({
      cards: 'cards/getPlayerCards',
      splittedCards: 'cards/getPlayerSplittedCards',
      score: 'cards/getPlayerScore'
    }),
    activePhase () {
      return this.$store.state.activePhaseComponent
    }
  }
}
</script>
