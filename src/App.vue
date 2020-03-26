<template>
  <div class="container">
    <app-navbar></app-navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    appNavbar: Navbar
  },
  created () {
    this.$store.dispatch('prepareNewDeck')
  }
}
</script>
