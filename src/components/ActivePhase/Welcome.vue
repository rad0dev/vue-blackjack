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
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    newGame () {
      if (this.disabled) {
        return
      }
      this.$store.dispatch('newGame')
      this.disabled = true
    }
  }
}
</script>
