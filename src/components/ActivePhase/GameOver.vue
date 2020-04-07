<template>
  <div class="game-over">
    <h2>Game over</h2>
    <div class="columns is-vcentered">
      <div class="column is-three-fifths">
        <ul class="game-over__scorelist">
          <li>Highest balance: <strong>${{ highestBalance || 0 }}</strong></li>
          <li>Highest bet: <strong>${{ highestBet || 0 }}</strong></li>
          <li>Deals won: <strong>{{ dealsWon || 0 }}</strong></li>
        </ul></div>
      <div class="column">
        <b-button
          size="is-large"
          type="is-success"
          @click="newGame"
        >
          Play again
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // computed: mapState('module/verdict', ['highestBalance', 'highestBid', 'dealsWon']),
  computed: mapState({
    highestBalance: state => state.verdict.highestBalance,
    highestBet: state => state.verdict.highestBet,
    dealsWon: state => state.verdict.dealsWon
  }),
  methods: {
    newGame () {
      this.$store.dispatch('newGame')
    }
  }
}
</script>
