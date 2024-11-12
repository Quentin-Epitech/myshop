const { createApp } = Vue

createApp({
    data() {
        return {
            isCartOpen: false,
            isMenuOpen: false,
            cart: [],
            shippingCost: 5.99,
            sortBy: 'default',
            filterCategory: 'all',
            searchQuery: '',
            categories: [
                {
                    id: 1,
                    name: 'Vêtements',
                    image: '/api/placeholder/300/200',
                    link: '#'
                },
                {
                    id: 2,
                    name: 'Chaussures',
                    image: '/api/placeholder/300/200',
                    link: '#'
                },
                {
                    id: 3,
                    name: 'Accessoires',
                    image: '/api/placeholder/300/200',
                    link: '#'
                }
            ],
            products: [
                {
                    id: 1,
                    name: "T-shirt Premium",
                    price: 29.99,
                    image: "/api/placeholder/300/300",
                    category: 1,
                    badge: "Nouveau",
                    description: "T-shirt premium en coton bio",
                    stock: 10
                },
                {
                    id: 2,
                    name: "Jean Classique",
                    price: 59.99,
                    image: "/api/placeholder/300/300",
                    category: 1,
                    description: "Jean coupe droite en denim",
                    stock: 15
                },
                {
                    id: 3,
                    name: "Sneakers Urban",
                    price: 89.99,
                    image: "/api/placeholder/300/300",
                    category: 2,
                    badge: "Promo",
                    description: "Sneakers confortables pour la ville",
                    stock: 8
                },
                {
                    id: 4,
                    name: "Sac à main Élégant",
                    price: 49.99,
                    image: "/api/placeholder/300/300",
                    category: 3,
                    description: "Sac à main en cuir synthétique",
                    stock: 12
                }
            ],
            // Animation du curseur
            cursorX: 0,
            cursorY: 0,
            cursorVisible: true
        }
    },

    computed: {
        cartItemCount() {
            return this.cart.reduce((total, item) => total + item.quantity, 0)
        },

        cartTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
        },

        filteredProducts() {
            let products = [...this.products]
            
            // Filtrage par recherche
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase()
                products = products.filter(product => 
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
                )
            }
            
            // Filtrage par catégorie
            if (this.filterCategory !== 'all') {
                products = products.filter(p => p.category === parseInt(this.filterCategory))
            }
            
            // Tri des produits
            switch(this.sortBy) {
                case 'price-low':
                    products.sort((a, b) => a.price - b.price)
                    break
                case 'price-high':
                    products.sort((a, b) => b.price - a.price)
                    break
                case 'name':
                    products.sort((a, b) => a.name.localeCompare(b.name))
                    break
            }
            
            return products
        }
    },

    methods: {
        // Gestion du panier
        toggleCart() {
            this.isCartOpen = !this.isCartOpen
            if (this.isCartOpen) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
        },

        addToCart(product, event) {
            if (product.stock <= 0) {
                this.showNotification('Produit en rupture de stock', 'error')
                return
            }

            const existingItem = this.cart.find(item => item.id === product.id)
            
            if (existingItem) {
                if (existingItem.quantity < product.stock) {
                    existingItem.quantity++
                    this.showNotification(`Quantité de ${product.name} augmentée`)
                } else {
                    this.showNotification('Stock maximum atteint', 'error')
                    return
                }
            } else {
                this.cart.push({
                    ...product,
                    quantity: 1
                })
                this.showNotification(`${product.name} ajouté au panier`)
            }

            // Animation du bouton
            if (event) {
                const button = event.currentTarget;
                button.classList.add('clicked');
                
                const originalText = button.innerHTML;
                button.innerHTML = '<span class="success-text">✓ Ajouté</span>';
                button.classList.add('added');
                
                setTimeout(() => {
                    button.classList.remove('clicked', 'added');
                    button.innerHTML = originalText;
                }, 1500);
            }

            product.stock--
            this.saveCart()
        },

        removeFromCart(item) {
            const index = this.cart.findIndex(cartItem => cartItem.id === item.id)
            if (index > -1) {
                const product = this.products.find(p => p.id === item.id)
                if (product) {
                    product.stock += item.quantity
                }
                
                this.cart.splice(index, 1)
                this.saveCart()
                this.showNotification(`${item.name} retiré du panier`)
            }
        },

        increaseQuantity(item) {
            const product = this.products.find(p => p.id === item.id)
            if (product && product.stock > 0) {
                item.quantity++
                product.stock--
                this.saveCart()
            } else {
                this.showNotification('Stock maximum atteint', 'error')
            }
        },

        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--
                const product = this.products.find(p => p.id === item.id)
                if (product) {
                    product.stock++
                }
                this.saveCart()
            } else {
                this.removeFromCart(item)
            }
        },

        // Gestion du menu mobile
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
            const navLinks = document.querySelector('.nav-links')
            if (this.isMenuOpen) {
                navLinks.classList.add('active')
            } else {
                navLinks.classList.remove('active')
            }
        },

        // Fonctions utilitaires
        formatPrice(price) {
            return price.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR'
            })
        },

        showNotification(message, type = 'success') {
            const notification = document.createElement('div')
            notification.className = `notification ${type}`
            notification.textContent = message
            
            document.body.appendChild(notification)
            
            setTimeout(() => {
                notification.classList.add('visible')
            }, 100)
            
            setTimeout(() => {
                notification.classList.remove('visible')
                setTimeout(() => {
                    notification.remove()
                }, 300)
            }, 3000)
        },

        // Gestion du localStorage
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },

        loadCart() {
            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
                this.cart = JSON.parse(savedCart)
                
                this.cart.forEach(item => {
                    const product = this.products.find(p => p.id === item.id)
                    if (product) {
                        product.stock -= item.quantity
                    }
                })
            }
        },

        // Animation du curseur personnalisé
        updateCursor(e) {
            this.cursorX = e.clientX
            this.cursorY = e.clientY
        },

        // Checkout
        checkout() {
            if (this.cart.length === 0) {
                this.showNotification('Votre panier est vide', 'error')
                return
            }

            this.showNotification('Traitement de votre commande...')
            
            setTimeout(() => {
                this.cart = []
                this.saveCart()
                this.isCartOpen = false
                this.showNotification('Commande confirmée ! Merci de votre achat.')
            }, 2000)
        }
    },

    mounted() {
        // Initialisation
        this.loadCart()

        // Event listeners
        window.addEventListener('mousemove', this.updateCursor)
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isCartOpen) {
                this.toggleCart()
            }
        })

        document.addEventListener('click', (e) => {
            if (this.isCartOpen && 
                !e.target.closest('.cart-sidebar') && 
                !e.target.closest('.cart-icon')) {
                this.toggleCart()
            }
        })

        // Gestion de la visibilité du curseur
        document.addEventListener('mouseenter', () => {
            this.cursorVisible = true
        })

        document.addEventListener('mouseleave', () => {
            this.cursorVisible = false
        })
    },

    unmounted() {
        // Nettoyage des event listeners
        window.removeEventListener('mousemove', this.updateCursor)
        window.removeEventListener('keydown', this.handleEscape)
    }
}).mount('#app')