<template>
  <div class="cards">
    <transition-group name="deal" mode="out-in">
      <svg-card
        v-for="(card, index) in cards"
        :key="'svgCard' + index"
        :card="card"
        :reversed="!!card.reversed"
      ></svg-card>
    </transition-group>
  </div>
</template>

<script>
import SvgCard from '../Reusables/SvgCard'

export default {
  components: { SvgCard },
  props: ['cards']
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
