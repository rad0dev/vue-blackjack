<template>
  <div class="game-mat">
    <score
      member="dealer"
      :score="score"
    ></score>
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
    cards: 'cards/getDealerCards',
    score: 'cards/getDealerScore'
  })
}
</script>
