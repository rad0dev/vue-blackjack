<template>
  <div class="coins">
    <div
      @click="raiseBet(1)"
      class="coin"
      v-if="coins >= 1"
    >
      <span>1</span>
    </div>
    <div
      @click="raiseBet(10)"
      class="coin coin__blue"
      v-if="coins >= 10"
    >
      <span>10</span>
    </div>
    <div
      @click="raiseBet(100)"
      class="coin coin__green"
      v-if="coins >= 100"
    >
      <span>100</span>
    </div>
    <div
      @click="raiseBet(500)"
      class="coin coin__red"
      v-if="coins >= 500"
    >
      <span>500</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    coins () {
      return this.$store.state.bets.coins
    }
  },
  methods: {
    raiseBet (amount) {
      this.$store.dispatch('bets/raiseBet', amount)
    }
  }
}
</script>
