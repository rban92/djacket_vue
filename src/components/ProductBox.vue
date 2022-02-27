<template>
<div class="column is-3">
     <div class="box">
          <figure class="image mb-4">
            <img :src="product.get_thumbnail" />
          </figure>
          <h3 class="is-size 4">{{ product.name }}</h3>
          <p class="is-size-3 has-text-green">{{ product.price }}</p>
          <router-link class="button has-text-white is-black" :to="product.get_absolute_url">View Details</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
}
</script>
