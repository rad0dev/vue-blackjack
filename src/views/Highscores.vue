<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <b-table
            class="highscoresTable"
            :data="highscores"
            :columns="columns"
          >
          </b-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('highscores/fetchScores')
  },
  computed: {
    highscores () {
      return this.$store.getters['highscores/getHighscoresData']
    }
  },
  data () {
    return {
      columns: [
        {
          field: 'nickname',
          label: 'Nick'
        }, {
          field: 'highestBalance',
          label: 'Highest Balance'
        }, {
          field: 'highestBet',
          label: 'Highest Bet'
        }, {
          field: 'dealsWon',
          label: 'Deals Won'
        }
      ]
    }
  }
}
</script>
