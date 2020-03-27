<template>
  <div>
    <h1>Game page</h1>
    <h6>{{ status }}</h6>
    <div v-if="status === 'welcome'">
      <b-button @click="startGame">Start Game</b-button>
    </div>
    <div v-if="status === 'bets'">
      <input v-model="bet" type="number">
      <b-button @click="placeBet">Bet</b-button>
    </div>
    <div v-if="status === 'dealing'">
      dealing...
    </div>
    <div v-if="status === 'actions'">
      <b-button @click="hit">Hit</b-button>
      <b-button @click="stand">Stand</b-button>
    </div>
    <div v-if="status === 'dealing-player'">
      dealing...
    </div>
    <div v-if="status === 'dealing-dealer'">
      dealing...
    </div>
    <div v-if="status === 'verdict'">
      You {{ verdict }}
    </div>
    <div v-if="
    status === 'dealing' ||
    status === 'actions' ||
    status === 'dealing-player' ||
    status === 'dealing-dealer'
    ">
      <div>dealer: {{ dealerScore | display-score }} | {{ dealerCards }}</div>
      <div>player: {{ playerScore | display-score }} | | {{ playerCards }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    playerCards: 'getPlayerCards',
    dealerCards: 'getDealerCards',
    playerScore: 'getPlayerScore',
    dealerScore: 'getDealerScore',
    coins: 'getCoins'
  }),
  data () {
    return {
      /*
        statuses:
        welcome
        bets
        dealing
        actions
        dealing-player
        actions-dealer
        dealing-dealer
        verdict
       */
      status: 'welcome',
      bet: 0,
      rate: 0,
      verdict: ''
    }
  },
  methods: {
    startGame () {
      this.$store.dispatch('newGame')
      this.status = 'bets'
    },
    placeBet () {
      if (this.bet <= this.coins) {
        this.rate = this.bet
        this.dealing()
      }
    },
    dealing () {
      this.status = 'dealing'
      setTimeout(() => {
        this.status = 'actions'
      }, 3000)
    },
    hit () {
      this.$store.dispatch('drawRandomCard', 'player')
      this.status = this.checkScore()
    },
    stand () {
      this.status = 'actions-dealer'
    },
    checkScore () {
      if (this.playerScore[0] === this.playerScore[1]) {
        if (this.playerScore[0] > 21) {
          return 'dealing-dealer'
        }
      } else {
        if (this.playerScore[0] > 21 && this.playerScore[1] > 21) {
          this.gameLost()
          return 'dealing-dealer'
        }
      }
      return 'actions'
    },
    gameLost () {
      console.log('gameLost')
      this.status = 'dealing-dealer'
    },
    gameWon () {
      console.log('gameWon')
    }
  }
}
</script>
