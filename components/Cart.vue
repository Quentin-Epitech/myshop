<template>
    <div class="cart">
      <h1>Votre Panier</h1>
      <div v-if="cart.length === 0">
        <p>Votre panier est vide.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="item in cart" :key="item.id">
            {{ item.name }} - {{ item.price }}€
          </li>
        </ul>
        <p>Total: {{ total }}€</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['cart'], // Reçoit le panier en prop
    computed: {
      total() {
        // Calcule le total du panier
        return this.cart.reduce((sum, item) => sum + item.price, 0);
      },
    },
  };
  </script>
  
  <style scoped>
  .cart {
    text-align: center;
  }
  </style>
  