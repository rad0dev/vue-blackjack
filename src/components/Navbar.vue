<template>
  <div class="container">
    <b-navbar :transparent="true">
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
          :to="{ path: '/' }"
        >
          Home
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/game' }"
        >
          Game
        </b-navbar-item>
      </template>
      <template slot="end" v-if="isAuthenticated">
        <b-navbar-item tag="div">
          <a
            class="button is-light"
            @click="logout"
          >
            Logout
          </a>
        </b-navbar-item>
      </template>
      <template slot="end" v-else>
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link
              class="button is-primary is-inverted is-outlined"
              :to="{ path: '/login' }"
            >
              <strong>Login</strong>
            </router-link>
            <router-link
              class="button is-primary is-inverted"
              :to="{ path: '/register' }"
            >
              Register
            </router-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
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
