<template>
  <div class="player-actions">
    <b-button
      size="is-large"
      type="is-success"
      @click="action('hit')"
      class="player-actions__button"
    >
      Hit
    </b-button>
    <b-button
      size="is-large"
      type="is-success"
      @click="action('stand')"
      class="player-actions__button"
    >
      Stand
    </b-button>
    <b-button
      size="is-large"
      type="is-success"
      v-if="canSplit"
      @click="action('split')"
      class="player-actions__button"
    >
      Split
    </b-button>
    <b-button
      size="is-large"
      type="is-success"
      v-if="canDouble"
      @click="action('double')"
      class="player-actions__button"
    >
      Double
    </b-button>
    <b-button
      size="is-large"
      type="is-success"
      v-if="canSurrender"
      @click="action('surrender')"
      class="player-actions__button"
    >
      Surrender
    </b-button>
    <b-button
      size="is-large"
      type="is-success"
      v-if="canInsurance"
      @click="action('insurance')"
      class="player-actions__button"
    >
      Insurance
    </b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    action (actionType) {
      if (this.disabled) {
        return
      }
      this[actionType]()
      this.disabled = true
    },
    ...mapActions([
      'hit',
      'stand',
      'split',
      'double',
      'surrender',
      'insurance'
    ])
  },
  computed: mapGetters([
    'canSplit',
    'canDouble',
    'canSurrender',
    'canInsurance'
  ])
}
</script>
