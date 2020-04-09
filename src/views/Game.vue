<template>
  <div class="container">
    <div class="page-container">
      <dealer-mat></dealer-mat>
      <transition
        name="fade"
        mode="out-in"
      >
        <component
          class="middle-mat"
          :is="activePhaseComponent || 'Empty'"
        ></component>
      </transition>
      <player-mat></player-mat>
    </div>
  </div>
</template>

<script>
import PlayerMat from '../components/GameMat/PlayerMat'
import DealerMat from '../components/GameMat/DealerMat'
import PlayerActions from '../components/ActivePhase/PlayerActions'
import Verdict from '../components/ActivePhase/Verdict'
import Welcome from '../components/ActivePhase/Welcome'
import Bets from '../components/ActivePhase/Bets'
import Empty from '../components/ActivePhase/Empty'
import GameOver from '../components/ActivePhase/GameOver'

export default {
  computed: {
    activePhaseComponent () {
      return this.$store.state.activePhaseComponent
    }
  },
  components: {
    DealerMat,
    PlayerMat,
    PlayerActions,
    Verdict,
    Welcome,
    Bets,
    Empty,
    GameOver
  }
}
</script>

<style scoped>
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity .35s;
  }

  .fade-leave-active {
    transition: opacity .35s;
    opacity: 0;
  }
</style>
