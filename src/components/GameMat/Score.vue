<template>
  <div class="score" :class="'score__' + member">
    <span class="score__member">{{ member }}</span> <span class="score__ammount">{{ score }}</span><br>
    <span v-if="member === 'player'" class="score__coins">${{ coins }}</span>
  </div>
</template>

<script>
export default {
  props: ['score', 'member'],
  computed: {
    coins () {
      return this.$store.state.coins
    }
  }
}
</script>
