/**
 * Shopping Cart Functionality for BookHaven
 * Manages cart operations like adding, removing items and updating cart display
 */

// Initialize the cart module
const cartModule = (function() {
    // Private variables and functions
    let cart = [];

    // Load cart data from localStorage
    const loadCart = function() {
        const savedCart = localStorage.getItem('bookhavenCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        updateCartCount();
    };

    // Save cart data to localStorage
    const saveCart = function() {
        localStorage.setItem('bookhavenCart', JSON.stringify(cart));
        updateCartCount();
    };

    // Update the cart count badge
    const updateCartCount = function() {
        const cartCount = document.getElementById('cart-count');
        
        // Calculate total quantity of items in cart
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartCount.textContent = totalItems;
        
        // Add animation class
        cartCount.classList.add('animate-pulse');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            cartCount.classList.remove('animate-pulse');
        }, 1000);
    };

    // Find item in cart by bookId
    const findCartItem = function(bookId) {
        return cart.find(item => item.bookId === bookId);
    };

    // Add a book to the cart
    const addToCart = function(bookId, quantity = 1) {
        const book = booksModule.getBookById(bookId);
        
        if (!book) {
            console.error('Book not found:', bookId);
            return;
        }
        
        const existingItem = findCartItem(bookId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                bookId: bookId,
                title: book.title,
                author: book.author,
                price: book.price,
                coverColor: book.coverColor,
                quantity: quantity
            });
        }
        
        saveCart();
        
        // Show notification
        showAddToCartNotification(book.title);
    };

    // Show "Added to Cart" notification
    const showAddToCartNotification = function(bookTitle) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.cart-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'cart-notification';
            document.body.appendChild(notification);
        }
        
        // Set notification content and show it
        notification.textContent = `"${bookTitle}" added to cart`;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };

    // Remove a book from the cart
    const removeFromCart = function(bookId) {
        cart = cart.filter(item => item.bookId !== bookId);
        saveCart();
    };

    // Update quantity of a book in the cart
    const updateQuantity = function(bookId, quantity) {
        const item = findCartItem(bookId);
        
        if (item) {
            if (quantity > 0) {
                item.quantity = quantity;
            } else {
                removeFromCart(bookId);
            }
            
            saveCart();
        }
    };

    // Calculate cart total
    const calculateCartTotal = function() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Clear the cart
    const clearCart = function() {
        cart = [];
        saveCart();
    };

    // Generate HTML for cart items
    const generateCartItemsHTML = function() {
        if (cart.length === 0) {
            return `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p data-i18n="cart_empty">Your cart is empty</p>
                    <button id="start-shopping" class="secondary-btn" data-i18n="cart_start_shopping">Start Shopping</button>
                </div>
            `;
        }
        
        let html = '';
        
        cart.forEach(item => {
            html += `
                <div class="cart-item" data-id="${item.bookId}">
                    <div class="cart-item-image" style="background-color: ${item.coverColor}">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="cart-item-info">
                        <h3 class="cart-item-title">${item.title}</h3>
                        <p class="cart-item-author">${item.author}</p>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <div class="quantity-btn quantity-decrease" data-id="${item.bookId}">
                            <i class="fas fa-minus"></i>
                        </div>
                        <span class="quantity-value">${item.quantity}</span>
                        <div class="quantity-btn quantity-increase" data-id="${item.bookId}">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                    <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-remove" data-id="${item.bookId}">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
            `;
        });
        
        return html;
    };

    // Generate HTML for cart summary
    const generateCartSummaryHTML = function() {
        const subtotal = calculateCartTotal();
        const tax = subtotal * 0.05; // 5% tax
        const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping for orders over $50
        const total = subtotal + tax + shipping;
        
        return `
            <div class="cart-summary-row">
                <span class="cart-summary-label" data-i18n="cart_subtotal">Subtotal:</span>
                <span class="cart-summary-value">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row">
                <span class="cart-summary-label" data-i18n="cart_tax">Tax (5%):</span>
                <span class="cart-summary-value">$${tax.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row">
                <span class="cart-summary-label" data-i18n="cart_shipping">Shipping:</span>
                <span class="cart-summary-value">${shipping === 0 ? '<span data-i18n="cart_free_shipping">Free</span>' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row">
                <span class="cart-summary-label" data-i18n="cart_total">Total:</span>
                <span class="cart-summary-value cart-total">$${total.toFixed(2)}</span>
            </div>
        `;
    };

    // Display the cart
    const displayCart = function() {
        const cartItems = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        
        cartItems.innerHTML = generateCartItemsHTML();
        
        if (cart.length > 0) {
            cartSummary.innerHTML = generateCartSummaryHTML();
            document.getElementById('checkout-btn').style.display = 'block';
        } else {
            cartSummary.innerHTML = '';
            document.getElementById('checkout-btn').style.display = 'none';
        }
        
        // Set up event listeners for cart items
        setupCartItemEvents();
        
        // Apply translations if i18n is initialized
        if (typeof i18nModule !== 'undefined' && typeof i18nModule.translateElements === 'function') {
            i18nModule.translateElements(document.getElementById('cart-modal'));
        }
    };

    // Set up event listeners for cart items
    const setupCartItemEvents = function() {
        // Start shopping button (shown when cart is empty)
        const startShoppingBtn = document.getElementById('start-shopping');
        if (startShoppingBtn) {
            startShoppingBtn.addEventListener('click', () => {
                document.getElementById('cart-modal').classList.remove('active');
                document.querySelector('.book-listings').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // Quantity decrease buttons
        document.querySelectorAll('.quantity-decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const bookId = btn.getAttribute('data-id');
                const item = findCartItem(bookId);
                if (item) {
                    updateQuantity(bookId, item.quantity - 1);
                    displayCart();
                }
            });
        });
        
        // Quantity increase buttons
        document.querySelectorAll('.quantity-increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const bookId = btn.getAttribute('data-id');
                const item = findCartItem(bookId);
                if (item) {
                    updateQuantity(bookId, item.quantity + 1);
                    displayCart();
                }
            });
        });
        
        // Remove item buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const bookId = btn.getAttribute('data-id');
                removeFromCart(bookId);
                displayCart();
            });
        });
        
        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                // Check if user is logged in
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                
                if (!currentUser) {
                    alert('Please log in to checkout');
                    document.getElementById('cart-modal').classList.remove('active');
                    document.getElementById('auth-modal').classList.add('active');
                    return;
                }
                
                document.getElementById('cart-modal').classList.remove('active');
                checkoutModule.initCheckout();
                document.getElementById('checkout-modal').classList.add('active');
            });
        }
    };

    // Public API
    return {
        init: function() {
            loadCart();
        },
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateQuantity: updateQuantity,
        clearCart: clearCart,
        displayCart: displayCart,
        getCart: function() { return [...cart]; },
        getCartTotal: calculateCartTotal
    };
})();

// Initialize cart module when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    cartModule.init();
    
    // Add CSS for cart notification
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            top: 20px;
            right: -300px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-md);
            z-index: 1000;
            transition: right 0.3s ease-in-out;
            max-width: 280px;
        }
        
        .cart-notification.show {
            right: 20px;
        }
    `;
    document.head.appendChild(style);
});
