<template>
  <div class="game-container">
    <dealer-mat></dealer-mat>
    <game-interface></game-interface>
    <player-mat></player-mat>
  </div>
</template>

<script>
import PlayerMat from '../components/GameMat/PlayerMat'
import DealerMat from '../components/GameMat/DealerMat'
import GameInterface from '../components/GameInterface'

export default {
  components: {
    DealerMat,
    PlayerMat,
    GameInterface
  }
}
</script>
