<template>
  <div class="splitted-cards">
    <svg-card
      v-for="(card, index) in cards"
      :card="card"
      :key="'svgvard' + index"
      :reversed="card.reversed"
    ></svg-card>
  </div>
</template>

<script>
import SvgCard from '../../assets/img/svg-cards.svg'

export default {
  components: { SvgCard },
  computed: {
    cards () {
      return this.$store.getters['cards/getPlayerSplittedCards']
    }
  }
}
</script>
