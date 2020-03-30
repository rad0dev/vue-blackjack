<template>
  <div class="game-mat">
    <score
      member="player"
      :score="score"
    ></score>
    <cards
      v-if="activePhase != 'Bets'"
      :cards="cards"
    ></cards>
    <coins
      v-else
    ></coins>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Score from './Score'
import Cards from './Cards'
import Coins from './Coins'

export default {
  components: { Score, Cards, Coins },
  computed: {
    ...mapGetters({
      cards: 'getPlayerCards',
      score: 'getPlayerScore'
    }),
    activePhase () {
      return this.$store.state.activePhaseComponent
    }
  }
}
</script>
