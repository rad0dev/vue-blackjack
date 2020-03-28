<template>
  <div>
    <h1>Game page</h1>
    <div>
      <b-button @click="startGame">Start Game</b-button>
    </div>
    <div>
      <b-button @click="hit">Hit</b-button>
      <b-button @click="stand">Stand</b-button>
    </div>
    <div>
      {{ verdictMsg }}
    </div>
    <div>
      <div style="margin-top: 30px; margin-bottom: 30px">
        <h1>Dealer</h1>
        Wynik: {{ dealerScore }} <br>
        Karty:
        <span v-for="(card, index) in dealerCards"  :key="index">
          <template v-if="!card.inverted">
            {{card.rank}}
            <span v-if="card.suit == 'hearts'">♥ </span>
            <span v-if="card.suit == 'spades'">♠ </span>
            <span v-if="card.suit == 'clubs'">♣ </span>
            <span v-if="card.suit == 'diamonds'">♦ </span>
          </template>
          <template v-else>
            ?
          </template>
        </span>
      </div>
      <div>
        <h1>Player</h1>
        Wynik: {{ playerScore }} <br>
        Karty:
        <span v-for="(card, index) in dealerCards"  :key="index">
          {{card.rank}}
          <span v-if="card.suit == 'hearts'">♥ </span>
          <span v-if="card.suit == 'spades'">♠ </span>
          <span v-if="card.suit == 'clubs'">♣ </span>
          <span v-if="card.suit == 'diamonds'">♦ </span>
        </span>
      </div>
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
      bet: 0,
      rate: 0,
      verdictMsg: ''
    }
  },
  methods: {
    startGame () {
      this.verdictMsg = ''
      this.$store.dispatch('newGame')
    },
    placeBet () {
      if (this.bet <= this.coins) {
        this.rate = this.bet
      }
    },
    hit () {
      this.$store.dispatch('drawRandomCard', 'player')
      if (this.playerScore >= 21) {
        this.verdict()
      }
    },
    stand () {
      this.dealerTurn()
    },
    dealerTurn () {
      if (this.playerScore <= 21) {
        while (this.dealerScore < this.playerScore && this.dealerScore < 21) {
          this.$store.dispatch('drawRandomCard', 'dealer')
        }
      }
      this.verdict()
    },
    verdict () {
      if (this.dealerScore > 21) {
        this.verdictMsg = 'You Won'
      } else if (this.playerScore > 21) {
        this.verdictMsg = 'You Lose'
      } else {
        if (this.dealerScore > this.playerScore) {
          this.verdictMsg = 'You Lose'
        } else if (this.dealerScore === this.playerScore) {
          this.verdictMsg = 'Push'
        } else {
          this.verdictMsg = 'You Won'
        }
      }
    }
  }
}
</script>
