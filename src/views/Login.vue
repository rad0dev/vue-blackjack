<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-one-quarter">

          <form @submit.prevent="onSubmit">

            <b-field
              label="Email"
              :type="{'is-danger': $v.email.$error}"
              :message="{'This email is invalid': $v.email.$error}"
            >
              <b-input
                type="email"
                v-model="email"
                @blur="$v.email.$touch()"
              >
              </b-input>
            </b-field>

            <b-field
              label="Password"
            >
              <b-input
                type="password"
                v-model="password"
              ></b-input>
            </b-field>

            <br>

            <b-button
              type="is-primary"
              native-type="submit"
              inverted
              outlined
            >Login</b-button>

          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('auth/login', formData)
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>
