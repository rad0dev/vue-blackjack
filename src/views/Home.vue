<template>
  <div class="container">
    <div class="page-container">
      <router-link
        class="button is-success is-large"
        :to="{ path: '/game' }"
      >
        Play game
      </router-link>
      <br>
      <router-link
        class="button is-success is-large"
        :to="{ path: '/highscores' }"
      >
        Highscores
      </router-link>
    </div>
  </div>
</template>
