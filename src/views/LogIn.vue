<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log up</h1>
        <form @submit.prevent="submitData">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" v-model="username" class="input" />
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" v-model="password" class="input" />
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="field">
          <div class="control">
            <button class="button is-dark">Log in</button>
          </div>
          <router-link to="/sign-in">Click here</router-link> to Sign up
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "LogIn",
  data() {
    return {
      username: "",
      password: "",
      errors: []
    };
  },
  mounted() {
    document.title = "Login | Djacket";
  },
  methods: {
      async submitData () {
        console.log('Submit Data called')
          localStorage.removeItem('token')
          axios.defaults.headers.common['Authorization'] = ''
          const formData = {
              username: this.username,
              password: this.password
          }
          axios.post('/api/v1/token/login/', formData)
          .then((response)=> {
              const token = response.data.auth_token
              console.log(token)
              localStorage.setItem('token', token)
              this.$store.commit('setToken', token)
            
              axios.defaults.headers.common['Authorization'] = "Token" + token
              const toPath= this.$route.query.to || '/cart'
              this.$router.push(toPath)
          }).catch((error)=> {
              console.log(error)
          })
      }
  }

};
</script>