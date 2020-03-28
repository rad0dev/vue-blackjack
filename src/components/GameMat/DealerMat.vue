<template>
  <div class="game-mat">
    <h1>Dealer</h1>
    <score :score="score"></score>
    <cards :cards="cards"></cards>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Score from './Score'
import Cards from './Cards'

export default {
  components: { Score, Cards },
  computed: mapGetters({
    cards: 'getDealerCards',
    score: 'getDealerScore'
  })
}
</script>
