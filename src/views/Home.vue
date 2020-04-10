<template>
  <div class="container">
    <div class="homepage page-container">
      <router-link
        class="button is-success is-large"
        :to="{ path: '/game' }"
      >
        Play game
      </router-link>
      <router-link
        class="button is-success is-large"
        :to="{ path: '/highscores' }"
      >
        Highscores
      </router-link>
    </div>
  </div>
</template>
