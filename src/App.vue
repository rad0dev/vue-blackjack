<template>
  <div>
    <app-navbar></app-navbar>
    <router-view/>
    <svg-card style="position:absolute; width:0; height:0; overflow:hidden; z-index:-1;"></svg-card><!-- prevent lazy card loading by preload -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import SvgCard from './components/Reusables/SvgCard'

export default {
  created () {
    this.$store.dispatch('auth/tryAutoLogin')
  },
  components: {
    SvgCard,
    appNavbar: Navbar
  }
}
</script>
