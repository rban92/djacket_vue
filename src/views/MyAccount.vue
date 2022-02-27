<template>
  <div class="page-my-account">
    <div class="columns is-multline">
      <div class="column is-12">
          <h1 class="title">My Account</h1>
      </div>
      <div class="column is-12">
        <button @click="logOut()" class="button is-danger">Log out</button>
      </div>
      <OrderSummary
      v-for="order in orders"
      v-bind:key="order.id"
      v-bind:order="order"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import OrderSummary from '../components/OrderSummary.vue';
export default {
  name: "MyAccount",
  data() {
    return {
      orders: []
    };
  },
  components: {
    OrderSummary
  },
   mounted () {
      document.title = 'My Account | Djacket'
      this.getOrders()
  },
  methods: {
    logOut() {
      axios.defaults.headers.common["Authorization"] = "";
      this.$store.commit("removeToken");
      localStorage.removeItem("token"),
      localStorage.removeItem("username"),
      localStorage.removeItem("userId");
      this.$router.push('/')
    },
    async getOrders (){
      await axios.get('/api/v1/orders/')
      .then((res)=> {
        this.orders = res.data
      })
    }
  },
};
</script>
