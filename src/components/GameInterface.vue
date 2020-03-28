<template>
  <div>
    <b-button @click="startGame">Start Game</b-button>
    <b-button @click="hit">Hit</b-button>
    <b-button @click="stand">Stand</b-button>
    {{ verdictMsg }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      verdictMsg: ''
    }
  },
  methods: {
    ...mapActions([
      'newGame',
      'drawRandomCard'
    ]),
    startGame () {
      this.verdictMsg = ''
      this.newGame()
    },
    hit () {
      this.drawRandomCard('player')
      if (this.playerScore >= 21) {
        this.verdict()
      }
    },
    stand () {
      this.dealerTurn()
    }
  }
}
</script>
