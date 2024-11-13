<template>
  <div id="app">
    <header>
      <h1>Site d'e-commerce de MYSHOP</h1>
    </header>

    <!-- Section affichant les produits -->
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
  name: 'App',
  data() {
    return {
      // Liste des produits à afficher sur la page d'accueil
      products: [
        { id: 1, name: 'Produit 1', price: 20, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Produit 2', price: 25, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Produit 3', price: 30, image: 'https://via.placeholder.com/150' },
      ]
    };
  },
  methods: {
    // Ajouter un produit au panier (pour l'instant, cette méthode ne fait que loguer l'action)
    addToCart(product) {
      console.log('Produit ajouté au panier :', product);
      // À ce stade, nous afficherons juste dans la console l'ajout au panier
    }
  }
};
</script>

<style>
/* Styles pour la page d'accueil */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

header {
  background-color: #333;
  color: white;
  padding: 10px;
}

.products {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
