<template>
  <div class="score" :class="'score__' + member">
    <span class="score__member">{{ member }}</span> <span class="score__ammount">{{ score }}</span>
  </div>
</template>

<script>
export default {
  props: ['score', 'member']
}
</script>
