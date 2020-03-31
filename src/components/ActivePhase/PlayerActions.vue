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
      @click="startDealerTurn()"
      class="player-actions__button"
    >
      Stand
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'hit',
      'startDealerTurn'
    ])
  }
}
</script>
