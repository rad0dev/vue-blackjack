<template>
  <div>
    <h1>Game page</h1>
    <b-button @click="startGame">StartGame</b-button>
    <b-button @click="hit">Hit</b-button>
    <div>{{ dealerScore }} | {{ dealerCards }}</div>
    <div>{{ playerScore }} | {{ playerCards }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    playerCards: 'getPlayerCards',
    dealerCards: 'getDealerCards',
    playerScore: 'getPlayerScore',
    dealerScore: 'getDealerScore'
  }),
  methods: {
    startGame () {
      this.$store.dispatch('newGame')
    },
    hit () {
      this.$store.dispatch('drawRandomCard', 'player')
    }
  }
}
</script>
