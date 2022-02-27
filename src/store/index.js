import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: []
    },
    isAuthienticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    initializeStore () {
      if (localStorage.getItem('cart')){
        state.cart.items = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
      if(localStorage.getItem('token')){
        this.state.token = localStorage.getItem('token')
        this.state.isAuthienticated = true
      }
    },
    addToCart(state, item){
      const exists = state.cart.items.filter(state => state.product.id === item.product.id)
      if (exists.length){
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setLoadingState(state, status) {
      state.isLoading = status
      console.log('setLoading called!')
    },
    setToken (state, token) {
      state.token = token
      state.isAuthienticated = true
    },
    removeToken(state){
      state.token = ''
      state.isAuthienticated = false
    },
    // clearState(state){
    //   state.cart = {items: []}
    //   localStorage.setItem('cart', JSON.stringify(state.cart))
    // }
  
  },
  actions: {
  },
  modules: {
  }
})
