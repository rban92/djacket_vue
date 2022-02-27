<template>
  <div class="page-category">
    <div class="column is-multiline">
      <div class="column is-12">
        <div class="is-size-2 has-text-centered">{{ category.name }}</div>
      </div>
      <ProductBox
        v-for="product in category.products"
        v-bind:key="product.id"
        v-bind:product="product"/>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import ProductBox from '@/components/ProductBox'
export default {
  name: "Category",
  data() {
    return {
      category: {
        products: [],
      },
    };
  },
  components: {
      ProductBox
  },
  mounted() {
    this.getProductsByCategory();
  },
  watch: {
      $route(to, from){
          if(to.name === 'Category'){
              this.getProductsByCategory();
          }
      }
  },
  methods: {
    async getProductsByCategory() {
      console.log("Fetching products by category..")
      const categorySlug = this.$route.params.category_slug
      console.log(categorySlug)
      await axios.get(`/api/v1/products/${categorySlug}/`).then((response) => {
        this.category = response.data;
        if (response.status === "200") {
          console.log("Products fetched!");
        }
      });
    },
  },
};
</script>