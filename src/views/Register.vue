<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">

          <form @submit.prevent="onSubmit">

            <b-field label="Email">
              <b-input
                type="email"
                v-model="email"
              >
              </b-input>
            </b-field>

            <b-field label="Nickname">
              <b-input v-model="nickname"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                type="password"
                v-model="password"
              ></b-input>
            </b-field>

            <b-field label="Confirm Password">
              <b-input
                type="password"
                v-model="confirmPassword"
              ></b-input>
            </b-field>

            <br>

            <b-button
              type="is-primary"
              native-type="submit"
              inverted
              outlined
            >Register</b-button>

          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        nickname: this.nickname,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
      this.$store.dispatch('auth/signup', formData)
    }
  }
}
</script>
