<template>
  <div class="player-actions">
    <b-button
      size="is-large"
      type="is-success"
      @click="hit"
      class="player-actions__button"
    >
      Hit
    </b-button>
    <b-button
      size="is-large"
      type="is-success"
      @click="stand"
      class="player-actions__button"
    >
      Stand
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'drawRandomCard',
      'dealerTurn',
      'verdict'
    ]),
    hit () {
      this.drawRandomCard('player')
      if (this.$store.getters.getPlayerScore >= 21) {
        this.verdict()
      }
    },
    stand () {
      this.dealerTurn()
    }
  }
}
</script>
