<template>
  <div class="coins">
    <div
      @click="tossACoin(1)"
      class="coin"
      v-if="funds >= 1"
    >
      <span>1</span>
    </div>
    <div
      @click="tossACoin(10)"
      class="coin coin__blue"
      v-if="funds >= 10"
    >
      <span>10</span>
    </div>
    <div
      @click="tossACoin(100)"
      class="coin coin__green"
      v-if="funds >= 100"
    >
      <span>100</span>
    </div>
    <div
      @click="tossACoin(500)"
      class="coin coin__red"
      v-if="funds >= 500"
    >
      <span>500</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    funds () {
      return this.$store.state.bets.funds
    }
  },
  methods: {
    tossACoin (amount) {
      this.$store.dispatch('bets/tossACoin', amount)
    }
  }
}
</script>
