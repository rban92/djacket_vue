<template>
  <div class="page-checkout">
    <div class="column is-multiline">
      <div class="column is-12">
        <h2 class="title">Checkout</h2>
      </div>
      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.items" v-bind:key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>{{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td>{{ cartTotalLength }}</td>
              <td>{{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="column is-12 box">
      <h2 class="subtitle">Shipping details</h2>
      <p class="has-text-grey mb-4">* All fields must be provided</p>
      <div class="columns-is-multiline">
        <div class="column-is-4">
          <div class="field">
            <label>First name</label>
            <div class="control">
              <input type="text" class="input" v-model="firstName" />
            </div>
          </div>
          <div class="field">
            <label>Last name</label>
            <div class="control">
              <input type="text" class="input" v-model="lastName" />
            </div>
          </div>
          <div class="field">
            <label>Email address</label>
            <div class="control">
              <input type="text" class="input" v-model="email" />
            </div>
          </div>
          <div class="field">
            <label>Phone number</label>
            <div class="control">
              <input type="text" class="input" v-model="phone" />
            </div>
          </div>
          <div class="field">
            <label>Address</label>
            <div class="control">
              <input type="text" class="input" v-model="address" />
            </div>
          </div>
          <div class="field">
            <label>Zipcode name</label>
            <div class="control">
              <input type="text" class="input" v-model="zipcode" />
            </div>
          </div>
          <div class="field">
            <label>Place name</label>
            <div class="control">
              <input type="text" class="input" v-model="place" />
            </div>
          </div>
        </div>
      </div>
      <div class="notification is-danger mt-4" v-if="errors.length">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
      <hr />
      <div id="card-element" class="mt-4">
        <template v-if="cartTotalLength">
          <hr />
          <button class="button is-dark" @click="submitForm">
            Pay with stripe
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: [],
      },
      stripe: {},
      card: {},
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      zipcode: "",
      place: "",
      errors: [],
    };
  },
  mounted() {
    console.log('Checkout page has been mounted.')
    document.title = "Checkout | Djacket";
    this.cart = this.$store.state.cart
    console.log(this.cart.length)
    if (this.cartTotalLength > 0){
      this.stripe = Stripe('pk_test_51KX5HuSJGBLQVgYjrGbMRQLY4kLyNBLNvqxInbhaO9fDg47AC0tdZK8WMlsoQAjxYPGZmV4HoavierueCZqhRWZo00V5Ol3fKU')
      elements = this.stripe.elements();
      this.card = elements.create('card',{hidePostalCode: true})
      this.card.mount('#card-element')
    }
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];
      console.log("submitForm is called");
      if (this.firstName === "") {
        this.errors.push("First name must be provided.");
      }
      if (this.lastName === "") {
        this.errors.push("Last name must be provided.");
      }
      if (this.email === "") {
        this.errors.push("Email must be provided.");
      }
      if (this.phone === "") {
        this.errors.push("Phone number must be provided.");
      }
      if (this.address === "") {
        this.errors.push("Address must be provided.");
      }
      if (this.zipcode === "") {
        this.errors.push("Zipcode must be provided.");
      }
      if (this.place === "") {
        this.errors.push("Place must be provided.");
      }
      if (!this.errors.length) {
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            console.log(error)
            this.errors.push("Something went wrong, please try again later");
          } else {
            this.stripeTokenHandler(result.token)
          }
        });
      }
    },
    async stripeTokenHandler(token) {
      const items = []
      for (let i= 0; i > this.cart.items.length; i++){
        const item = this.cart.items[i]
        const object = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity
        }
        items.push(object)
      }
      const data = {
        'first_name': this.firstName,
        'last_name': this.lastName,
        'email': this.email,
        'address': this.address,
        'zipcode': this.zipcode,
        'place': this.place,
        'items': items,
        'stripe_token': token.id
      }
      await axios.post('/api/v1/checkout/', data)
      .then((res)=> {
        this.$router.push('/cart/success')
      })
      .catch((error)=> {
        console.log(error)
      })
    }
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curItem) => {
        return (acc += curItem.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curItem) => {
        return (acc += curItem.quantity * curItem.product.price);
      }, 0);
    },
  },
};
</script>