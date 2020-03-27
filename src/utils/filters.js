import Vue from 'vue'

Vue.filter('display-score', function (score) {
  if (score[0] === score[1]) {
    return score[0]
  }
  return `${score[0]}/${score[1]}`
})
