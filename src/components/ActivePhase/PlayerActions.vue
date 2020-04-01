<template>
  <div class="player-actions">
    <b-button
      size="is-large"
      type="is-success"
      @click="hit()"
      class="player-actions__button"
    >
      Hit
    </b-button>
    <b-button
      size="is-large"
      type="is-success"
      @click="stand()"
      class="player-actions__button"
    >
      Stand
    </b-button>
    <b-button
      size="is-large"
      type="is-success"
      v-if="canSplit"
      @click="split()"
      class="player-actions__button"
    >
      Split
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: mapActions([
    'hit',
    'stand',
    'split'
  ]),
  computed: {
    canSplit () {
      return this.$store.getters.canSplit
    }
  }
}
</script>
