<template>
    <div class="product-detail">
      <h1>{{ product.name }}</h1>
      <img :src="product.image" alt="product.name" />
      <p>Prix: {{ product.price }}€</p>
      <button @click="addToCart(product)">Ajouter au panier</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['product'],
    methods: {
      addToCart(product) {
        this.$emit('add-to-cart', product);
      },
    },
  };
  </script>
  
  <style scoped>
  .product-detail {
    text-align: center;
  }
  </style>
  