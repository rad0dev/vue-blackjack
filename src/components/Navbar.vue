<template>
  <b-navbar transparent="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          class="logo"
          src="../assets/img/blackjack.svg"
          alt="VueJs BlackJack Card Game"
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/game' }">
        Game
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped >
  .logo {
    height: 100%;
    width: 100%;
  }

  .navbar {
    background: transparent;
  }

  .navbar-item,
  .navbar-link {
    color: #fff;

    &:hover,
    &:active,
    &:focus {
      color: #ddd;
    }
  }
</style>
