<template>
  <svg
    width="169.075"
    height="244.640"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="cards__card"
  >
    <use
      v-bind="{'xlink:href' : cardHref }"
      x="0"
      y="0"
    />
  </svg>
</template>

<script>
import SvgCard from '../../assets/img/svg-cards.svg'

export default {
  props: ['card', 'reversed'],
  computed: {
    cardHref () {
      if (!this.card || this.reversed) return SvgCard + '#back'
      const rank = this.card.rank === 'ace' ? 1 : this.card.rank
      return SvgCard + '#' + this.card.suit + '_' + rank
    }
  }
}
</script>
