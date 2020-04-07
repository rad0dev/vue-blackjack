<template>
  <div class="bet">
    <div class="bet__coins">
      <div
        v-for="(coin, index) in betCoins"
        @click="pickupACoin()"
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
      <div class="bet__score__amount">${{ betCoinsAmount }}</div>
    </div>
    <div class="bet__actions">
      <b-button
        size="is-large"
        type="is-success"
        @click="makeDeal"
        class="bet__actions__button"
        v-if="betCoinsAmount > 0"
      >
        Deal
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    betCoins () {
      return this.$store.state.bets.betCoins
    },
    betCoinsAmount () {
      if (!this.betCoins.length) {
        return 0
      }
      return this.betCoins.reduce((a, b) => {
        return a + b
      })
    }
  },
  methods: {
    pickupACoin () {
      this.$store.dispatch('bets/pickupACoin')
    },
    makeDeal () {
      this.$store.dispatch('newHand')
    }
  }
}
</script>
