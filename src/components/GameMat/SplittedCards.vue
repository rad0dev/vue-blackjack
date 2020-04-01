<template>
  <div class="splitted-cards">
    <svg
      width="169.075"
      height="244.640"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      v-for="(card, index) in cards"
      :key="'svgCard' + index"
      class="cards__card"
    >
      <use
        v-if="card.reversed"
        v-bind="{'xlink:href' : SvgCard + '#back' }"
        x="0"
        y="0"
      />
      <use
        v-else
        v-bind="{'xlink:href' : makeCardHref(card) }"
        x="0"
        y="0"
      />
    </svg>
  </div>
</template>

<script>
import SvgCard from '../../assets/img/svg-cards.svg'
export default {
  computed: {
    cards () {
      return this.$store.getters['cards/getPlayerSplittedCards']
    }
  },
  data () {
    return {
      SvgCard
    }
  },
  methods: {
    makeCardHref (card) {
      if (card.reversed) return SvgCard + '#back'
      const rank = card.rank === 'ace' ? 1 : card.rank
      return SvgCard + '#' + card.suit + '_' + rank
    }
  }
}
</script>
