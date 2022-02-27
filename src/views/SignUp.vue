<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign up</h1>
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
          <div class="field">
            <label>Repeat password</label>
            <div class="control">
              <input type="password" v-model="password2" class="input" />
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="field">
          <div class="control">
            <button class="button is-dark">Sign up</button>
          </div>
          <router-link to="/log-in">Click here</router-link> to login
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  methods: {
    submitData() {
      console.log('Submit data called.')
      if (username === "") {
        this.errors.push("Username must be provided.");
      }
      if (password === "") {
        this.errors.push("Password is too short");
      }
      if (password !== password2) {
        this.errors.push("Passwords doesn't match");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };
        axios
          .post("api/v1/users/", formData)
          .then((response) => {
              toast({
                message: "Account created, please log in.",
                type: "is-success",
                dismissible: true,
                duration: 2000,
                position: "bottom-right",
                pauseOnHover: true,
              });
              this.$router.push("/log-in");
            }
          )
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property} : ${error.response.data[property]}`
                );
              }
              JSON.stringify(error.response.data);
            } else if (error.message) {
              this.errors.push("Something wen't wrong!");
              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
  //   mounted () {
  //       console.log('Sign up page rendered.')
  //   }
};
</script>