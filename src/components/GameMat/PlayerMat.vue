<template>
  <div class="game-mat">
    <score
      member="player"
      :score="score"
    ></score>
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

export default {
  components: { Score, Cards, Coins },
  computed: {
    ...mapGetters({
      cards: 'cards/getPlayerCards',
      score: 'cards/getPlayerScore'
    }),
    activePhase () {
      return this.$store.state.activePhaseComponent
    }
  }
}
</script>
