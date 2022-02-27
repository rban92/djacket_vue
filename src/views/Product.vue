<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mb-6">
          <img v-bind:src="product.get_image" />
        </figure>
        <h1 class="title">{{ product.name }}</h1>
        <p>{{ product.description }}</p>
      </div>
      <div class="column is-3">
        <h2 class="subtitle">Information</h2>
        <p>
          <strong
            >Price: <strong>{{ product.price }}</strong></strong
          >
        </p>
        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" v-model="quantity" />
          </div>
          <div class="contr">
            <div class="button is-dark" @click="addToCart">Add to cart</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Product",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
    
  },
  methods: {
    async getProduct() {
      this.$store.commit("setLoadingState", true);
      console.log(this.$route.name);
      const category_Slug = this.$route.params.category_slug;
      const product_Slug = this.$route.params.product_slug;
      console.log(category_Slug);
      console.log(product_Slug);
      await axios
        .get(`api/v1/products/${category_Slug}/${product_Slug}/`)
        .then((response) => {
          this.product = response.data;
          document.title = this.product.title
          console.log(product);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setLoadingState", false);
    },
    addToCart() {
      const item = {
        product: this.product,
        quantity: this.quantity,
      };
      this.$store.commit("addToCart", item);
      toast({
        message: "The product has been added to the cart.",
        type: "is-success",
        dismissible: true,
        duration: 2000,
        position: "bottom-right",
        pauseOnHover: true,
      });
    },
  },
};
</script>