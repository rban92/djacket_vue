<template>
  <div class="column is-multiline">
    <div class="column is-12">
      <h1 class="title">Cart</h1>
    </div>
    <div class="column is-12 box">
      <table class="table is-fullwidth" v-if="cartTotalLength">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
            <CartItem
            v-for="item in cart.items"
            v-bind:key="item.product.id"
            v-bind:initialItem="item"
            v-on:removeItemFromCart="removeItemFromCart"
            />
        </tbody>
      </table>
      <p class="subtitle" v-else>"Sorry, you have any products in cart.</p>
    </div>
    <div class="column is-12 box">
      <h2 class="title">Summary</h2>
      <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items
      <hr>
      <router-link to="/cart/checkout/" class="button is-dark">Proceed to chekout</router-link>
    </div>
  </div>
</template>
<script>
import CartItem from '@/components/CartItem'
export default {
  name: "Cart",
  data() {
    return {
        cart: {
            items: []
        }
    };
  },
  mounted () {
      this.cart = this.$store.state.cart

  },
  components: {
    CartItem
  },
  methods: {
      removeItemFromCart (item){
        this.cart.items = this.cart.items.filter(i=> i.product.id !== item.product.id)
      }
  },
  computed: {
    cartTotalLength () {
      return this.cart.items.reduce((acc, curItem)=> {
        return acc += curItem.quantity
      },0)
      },
      cartTotalPrice () {
      return this.cart.items.reduce((acc, curItem)=> {
        return acc += curItem.quantity * curItem.product.price
      }, 0)
      },
    
  }
};
</script>