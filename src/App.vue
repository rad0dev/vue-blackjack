<template>
  <div>
    <app-navbar></app-navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  created () {
    this.$store.dispatch('auth/tryAutoLogin')
  },
  components: {
    appNavbar: Navbar
  }
}
</script>
