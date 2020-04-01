<template>
  <div class="cards">
    <transition-group name="deal" mode="out-in">
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
    </transition-group>
  </div>
</template>

<script>
import SvgCard from '../../assets/img/svg-cards.svg'
export default {
  props: ['cards'],
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

<style>
  .deal-enter {
    opacity: 0;
  }

  .deal-enter-active {
    animation: deal-in .5s ease-out forwards;
    transition: opacity .5s;
  }

  .deal-leave-active {
    animation: deal-out .5s ease-out forwards;
    transition: opacity .2s;
    opacity: 0;
  }

  .deal-move {
    transition: transform 1s;
  }

  @keyframes deal-in {
    from {
      transform: translateX(200px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes deal-out {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-200px);
    }
  }
</style>
