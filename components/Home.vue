<template>
    <div class="home">
      <h1>Nos produits</h1>
      <div class="products">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image" alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}€</p>
          <button @click="addToCart(product)">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { id: 1, name: 'Produit 1', price: 20, image: 'https://via.placeholder.com/150' },
          { id: 2, name: 'Produit 2', price: 25, image: 'https://via.placeholder.com/150' },
          { id: 3, name: 'Produit 3', price: 30, image: 'https://via.placeholder.com/150' },
        ],
      };
    },
    methods: {
      addToCart(product) {
        this.$emit('add-to-cart', product); // Envoie l'événement avec le produit
      },
    },
  };
  </script>
  
  <style scoped>
  .home {
    text-align: center;
  }
  
  .products {
    display: flex;
    justify-content: space-around;
  }
  
  .product-card {
    border: 1px solid #ddd;
    padding: 10px;
    width: 150px;
  }
  </style>
  