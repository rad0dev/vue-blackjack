<template>
  <div class="score" :class="'score__' + member">
    <span class="score__member">{{ member }}</span> <span class="score__ammount">{{ score }}</span><br>
    <span v-if="member === 'player'" class="score__coins">${{ funds }}</span>
  </div>
</template>

<script>
export default {
  props: ['score', 'member'],
  computed: {
    funds () {
      return this.$store.state.bets.funds
    }
  }
}
</script>
