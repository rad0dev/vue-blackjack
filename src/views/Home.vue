<template>
  <section class="section">
    <div class="container">
      <router-link
        class="button is-primary"
        :to="{ path: '/game' }"
      >
        Play game
      </router-link>
      <router-link
        class="button is-primary"
        :to="{ path: '/highscores' }"
      >
        Highscores
      </router-link>
    </div>
  </section>
</template>
