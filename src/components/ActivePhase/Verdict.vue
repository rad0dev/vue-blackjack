<template>
  <div class="verdict">
    <h2>{{ verdictMsg }}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    verdictMsg () {
      return this.$store.state.verdict.verdictMsg
    }
  },
  methods: {
    newGame () {
      this.$store.dispatch('newGame')
    }
  }
}
</script>
