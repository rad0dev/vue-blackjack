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
              label="Nickname"
              :type="{'is-danger': $v.nickname.$error}"
              :message="{'Choose a nickname with 6-18 characters.': $v.nickname.$error}"
            >
              <b-input
                v-model="nickname"
                @blur="$v.nickname.$touch()"
              ></b-input>
            </b-field>

            <b-field
              label="Password"
              :type="{'is-danger': $v.password.$error}"
              :message="{'Password must be a combination of 6-18 numbers, letters, and punctation marks': $v.password.$error}"
            >
              <b-input
                type="password"
                v-model="password"
                @blur="$v.password.$touch()"
              ></b-input>
            </b-field>

            <br>

            <b-button
              type="is-primary"
              native-type="submit"
              inverted
              outlined
              :disabled="$v.$invalid"
            >Register</b-button>

          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      nickname: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        nickname: this.nickname,
        password: this.password
      }
      this.$store.dispatch('auth/signup', formData)
    }
  },
  validations: {
    email: {
      required,
      email
    },
    nickname: {
      required,
      minLen: minLength(6),
      maxLen: maxLength(18)
    },
    password: {
      required,
      minLen: minLength(6),
      maxLen: maxLength(18),
      strongPassword (password) {
        return (
          /[a-z]/.test(password) &&
          /[0-9]/.test(password) &&
          /\W|_/.test(password)
        )
      }
    }
  }
}
</script>
