<template>
  <div class="page-search">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="is-size-24 has-text-centered">Searched for: "{{ query }}"</h1>
      </div>
      <ProductBox
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductBox from "@/components/ProductBox.vue";
export default {
  name: "Search",
  data() {
    return {
      products: [],
      query: " ",
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    document.title = "Search | Djackets";
    let url = window.location.search.substring(1);
    let params = new URLSearchParams(url);
    if (params.get("query")) {
      this.query = params.get("query");
      this.performSearch();
    }
  },
  methods: {
    async performSearch() {
      console.log('Fetching products from search')
      await axios
        .post('/api/v1/products/search/', {'query': this.query})
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>