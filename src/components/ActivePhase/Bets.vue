<template>
  <div class="bet">
    <div class="bet__coins">
      <div
        v-for="(coin, index) in bet"
        @click="reduceBet()"
        class="coin"
        :class="{
          'coin__blue': coin === 10,
          'coin__green': coin === 100,
          'coin__red': coin === 500
        }"
        :style="{ marginLeft: '-' + index + 'px', marginTop: '-' + index / 2 + 'px' }"
        :key="index"
      >
        <span>{{ coin }}</span>
      </div>
    </div>
    <div class="bet__score">
      <div class="bet__score__amount">${{ betAmount }}</div>
    </div>
    <div class="bet__actions">
      <b-button
        size="is-large"
        type="is-success"
        @click="makeDeal"
        class="bet__actions__button"
        v-if="betAmount > 0"
      >
        Deal
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    bet () {
      return this.$store.state.bet
    },
    betAmount () {
      return this.$store.getters.getBetAmount
    }
  },
  methods: {
    reduceBet () {
      this.$store.dispatch('reduceBet')
    },
    makeDeal () {
      this.$store.dispatch('makeDeal')
    }
  }
}
</script>
