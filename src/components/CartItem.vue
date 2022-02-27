<template>
  <tr>
    <td><router-link :to="item.product.get_absolute_url">{{ item.product.name }}</router-link></td>
    <td>{{ item.product.price }}</td>
    <td>${{ item.quantity }}</td>
    <a @click="increamentQuantity(item)">+</a>
    <a @click="decreamentQuantity(item)">-</a>
    <td>{{ item.name }}</td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeItemFromCart(item)"></button></td>
  </tr>
</template>
<script>
export default {
  name: 'CartItem',
  props: {
    initialItem: Object
  },
  data () {
    return {
      item: this.initialItem
    }
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    increamentQuantity (item) {
      item.quantity += 1
      this.updateCart()
      
    },
    decreamentQuantity (item) {
      item.quantity -= 1
      if (item.quantity === 0){
        this.$emit('removeItemFromCart', item)
      }
      this.updateCart()
    },
    updateCart () {
      localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
    },
    removeItemFromCart (item) {
      this.$emit('removeItemFromCart', item)
    }
  }
}

</script>
