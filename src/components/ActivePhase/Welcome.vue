<template>
  <div>
    <b-button
      size="is-large"
      type="is-success"
      @click="newGame"
    >
      Start Game
    </b-button>
  </div>
</template>

<script>
export default {
  methods: {
    newGame () {
      this.$store.dispatch('newGame')
    }
  }
}
</script>
