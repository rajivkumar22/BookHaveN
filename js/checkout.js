/**
 * Checkout functionality for BookHaven
 * Handles the checkout process, form validation, and order confirmation
 */

// Initialize the checkout module
const checkoutModule = (function() {
    // Private variables and functions
    let currentOrderDetails = null;
    
    // Initialize checkout form
    const initCheckout = function() {
        // Check if user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Please log in to checkout');
            document.getElementById('checkout-modal').classList.remove('active');
            document.getElementById('auth-modal').classList.add('active');
            return;
        }
        
        // Get cart items
        const cartItems = cartModule.getCart();
        if (cartItems.length === 0) {
            alert('Your cart is empty');
            document.getElementById('checkout-modal').classList.remove('active');
            return;
        }
        
        // Fill checkout form with user data if available
        fillCheckoutForm(currentUser);
        
        // Display checkout summary
        displayCheckoutSummary(cartItems);
        
        // Set up form submission
        document.getElementById('checkout-form').onsubmit = handleCheckoutSubmit;
    };
    
    // Fill checkout form with user data
    const fillCheckoutForm = function(userData) {
        if (!userData) return;
        
        // Fill shipping information
        document.getElementById('checkout-name').value = userData.name || '';
        document.getElementById('checkout-email').value = userData.email || '';
        document.getElementById('checkout-address').value = userData.address?.street || '';
        document.getElementById('checkout-city').value = userData.address?.city || '';
        document.getElementById('checkout-state').value = userData.address?.state || '';
        document.getElementById('checkout-zip').value = userData.address?.zip || '';
        document.getElementById('checkout-country').value = userData.address?.country || '';
    };
    
    // Display checkout summary
    const displayCheckoutSummary = function(cartItems) {
        const checkoutSummary = document.getElementById('checkout-summary');
        
        if (!checkoutSummary) return;
        
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05; // 5% tax
        const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping for orders over $50
        const total = subtotal + tax + shipping;
        
        // Generate HTML for checkout summary
        let summaryHTML = `
            <h3 data-i18n="checkout_summary_title">Order Summary</h3>
            <div class="checkout-summary-items">
        `;
        
        // Add items to summary
        cartItems.forEach(item => {
            summaryHTML += `
                <div class="checkout-item">
                    <div class="checkout-item-image" style="background-color: ${item.coverColor}">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="checkout-item-info">
                        <div class="checkout-item-title">${item.title}</div>
                        <div class="checkout-item-detail">${item.author} (x${item.quantity})</div>
                    </div>
                    <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `;
        });
        
        // Add totals
        summaryHTML += `
            </div>
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
        
        checkoutSummary.innerHTML = summaryHTML;
        
        // Apply translations if i18n is initialized
        if (typeof i18nModule !== 'undefined' && typeof i18nModule.translateElements === 'function') {
            i18nModule.translateElements(checkoutSummary);
        }
    };
    
    // Handle checkout form submission
    const handleCheckoutSubmit = function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateCheckoutForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('checkout-name').value.trim(),
            email: document.getElementById('checkout-email').value.trim(),
            address: {
                street: document.getElementById('checkout-address').value.trim(),
                city: document.getElementById('checkout-city').value.trim(),
                state: document.getElementById('checkout-state').value.trim(),
                zip: document.getElementById('checkout-zip').value.trim(),
                country: document.getElementById('checkout-country').value.trim()
            },
            payment: {
                cardName: document.getElementById('card-name').value.trim(),
                cardNumber: document.getElementById('card-number').value.trim(),
                cardExpiry: document.getElementById('card-expiry').value.trim(),
                cardCvv: document.getElementById('card-cvv').value.trim()
            }
        };
        
        // Process order
        processOrder(formData);
    };
    
    // Validate checkout form
    const validateCheckoutForm = function() {
        // Shipping information validation
        const name = document.getElementById('checkout-name').value.trim();
        const email = document.getElementById('checkout-email').value.trim();
        const address = document.getElementById('checkout-address').value.trim();
        const city = document.getElementById('checkout-city').value.trim();
        const state = document.getElementById('checkout-state').value.trim();
        const zip = document.getElementById('checkout-zip').value.trim();
        const country = document.getElementById('checkout-country').value.trim();
        
        // Payment information validation
        const cardName = document.getElementById('card-name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const cardExpiry = document.getElementById('card-expiry').value.trim();
        const cardCvv = document.getElementById('card-cvv').value.trim();
        
        // Basic required field validation
        if (!name || !email || !address || !city || !state || !zip || !country ||
            !cardName || !cardNumber || !cardExpiry || !cardCvv) {
            alert('Please fill in all required fields');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        // Card number validation (basic check for 16 digits)
        const cardNumberClean = cardNumber.replace(/\s+/g, '');
        if (!/^\d{16}$/.test(cardNumberClean)) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }
        
        // Card expiry validation (MM/YY format)
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            alert('Please enter a valid expiry date in MM/YY format');
            return false;
        }
        
        // CVV validation (3 or 4 digits)
        if (!/^\d{3,4}$/.test(cardCvv)) {
            alert('Please enter a valid CVV (3 or 4 digits)');
            return false;
        }
        
        return true;
    };
    
    // Process order
    const processOrder = function(formData) {
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Please log in to complete your order');
            document.getElementById('checkout-modal').classList.remove('active');
            document.getElementById('auth-modal').classList.add('active');
            return;
        }
        
        // Get cart items
        const cartItems = cartModule.getCart();
        
        // Calculate order totals
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05; // 5% tax
        const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping for orders over $50
        const total = subtotal + tax + shipping;
        
        // Generate order ID (random alphanumeric string)
        const orderId = generateOrderId();
        
        // Create order object
        const order = {
            orderId: orderId,
            userId: currentUser.id,
            date: new Date().toISOString(),
            items: cartItems,
            subtotal: subtotal,
            tax: tax,
            shipping: shipping,
            total: total,
            shippingAddress: formData.address,
            paymentMethod: {
                cardType: getCardType(formData.payment.cardNumber),
                lastFour: formData.payment.cardNumber.slice(-4)
            },
            status: 'processing'
        };
        
        // Save current order details for confirmation page
        currentOrderDetails = order;
        
        // Save order to localStorage
        saveOrder(order);
        
        // Update user profile with address if not already set
        updateUserWithAddress(currentUser, formData);
        
        // Clear cart
        cartModule.clearCart();
        
        // Close checkout modal and show order confirmation
        document.getElementById('checkout-modal').classList.remove('active');
        displayOrderConfirmation();
    };
    
    // Generate a random order ID
    const generateOrderId = function() {
        const timestamp = new Date().getTime().toString().slice(-8);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `BH${timestamp}${random}`;
    };
    
    // Determine card type based on first digit
    const getCardType = function(cardNumber) {
        const firstDigit = cardNumber.charAt(0);
        
        switch (firstDigit) {
            case '3': return 'AMEX';
            case '4': return 'VISA';
            case '5': return 'MASTERCARD';
            case '6': return 'DISCOVER';
            default: return 'CREDIT CARD';
        }
    };
    
    // Save order to localStorage
    const saveOrder = function(order) {
        // Get existing orders for this user
        let orders = JSON.parse(localStorage.getItem(`orders_${order.userId}`)) || [];
        
        // Add new order
        orders.push(order);
        
        // Save to localStorage
        localStorage.setItem(`orders_${order.userId}`, JSON.stringify(orders));
    };
    
    // Update user profile with address if not already set
    const updateUserWithAddress = function(user, formData) {
        // Only update if the user doesn't have an address yet
        if (!user.address || !user.address.street) {
            // Get all users
            const users = JSON.parse(localStorage.getItem('bookhavenUsers')) || [];
            
            // Find the user
            const userIndex = users.findIndex(u => u.id === user.id);
            
            if (userIndex !== -1) {
                // Update user address
                users[userIndex].address = formData.address;
                
                // Save updated users array
                localStorage.setItem('bookhavenUsers', JSON.stringify(users));
                
                // Update current user in localStorage
                user.address = formData.address;
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        }
    };
    
    // Display order confirmation
    const displayOrderConfirmation = function() {
        if (!currentOrderDetails) {
            console.error('No order details available');
            return;
        }
        
        const orderDetails = document.getElementById('order-details');
        if (!orderDetails) return;
        
        // Format date
        const orderDate = new Date(currentOrderDetails.date);
        const formattedDate = orderDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
        
        // Generate order details HTML
        let detailsHTML = `
            <div class="order-info">
                <div class="order-info-row">
                    <span class="order-info-label" data-i18n="order_id">Order ID:</span>
                    <span class="order-info-value">${currentOrderDetails.orderId}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-info-label" data-i18n="order_date">Date:</span>
                    <span class="order-info-value">${formattedDate}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-info-label" data-i18n="order_payment">Payment:</span>
                    <span class="order-info-value">${currentOrderDetails.paymentMethod.cardType} ending in ${currentOrderDetails.paymentMethod.lastFour}</span>
                </div>
            </div>
            <div class="order-items">
                <h3 data-i18n="order_items">Order Items:</h3>
        `;
        
        // Add items to summary
        currentOrderDetails.items.forEach(item => {
            detailsHTML += `
                <div class="order-item">
                    <div class="order-item-title">${item.title} (x${item.quantity})</div>
                    <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `;
        });
        
        // Add totals
        detailsHTML += `
            </div>
            <div class="order-info-row">
                <span class="order-info-label" data-i18n="cart_subtotal">Subtotal:</span>
                <span class="order-info-value">$${currentOrderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div class="order-info-row">
                <span class="order-info-label" data-i18n="cart_tax">Tax (5%):</span>
                <span class="order-info-value">$${currentOrderDetails.tax.toFixed(2)}</span>
            </div>
            <div class="order-info-row">
                <span class="order-info-label" data-i18n="cart_shipping">Shipping:</span>
                <span class="order-info-value">${currentOrderDetails.shipping === 0 ? '<span data-i18n="cart_free_shipping">Free</span>' : '$' + currentOrderDetails.shipping.toFixed(2)}</span>
            </div>
            <div class="order-info-row">
                <span class="order-info-label" data-i18n="cart_total">Total:</span>
                <span class="order-info-value order-total">$${currentOrderDetails.total.toFixed(2)}</span>
            </div>
        `;
        
        orderDetails.innerHTML = detailsHTML;
        
        // Show confirmation modal
        document.getElementById('order-confirmation-modal').classList.add('active');
        
        // Apply translations if i18n is initialized
        if (typeof i18nModule !== 'undefined' && typeof i18nModule.translateElements === 'function') {
            i18nModule.translateElements(document.getElementById('order-confirmation-modal'));
        }
    };
    
    // Format input fields during typing
    const setupFormattingEventListeners = function() {
        // Format card number with spaces after every 4 digits
        document.getElementById('card-number').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            
            if (value.length > 16) {
                value = value.substr(0, 16);
            }
            
            // Add space after every 4 digits
            const parts = value.match(/\d{1,4}/g);
            e.target.value = parts ? parts.join(' ') : '';
        });
        
        // Format expiry date as MM/YY
        document.getElementById('card-expiry').addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 4) {
                value = value.substr(0, 4);
            }
            
            if (value.length > 2) {
                e.target.value = value.substr(0, 2) + '/' + value.substr(2);
            } else {
                e.target.value = value;
            }
        });
        
        // Limit CVV to 3 or 4 digits
        document.getElementById('card-cvv').addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 4) {
                value = value.substr(0, 4);
            }
            
            e.target.value = value;
        });
    };
    
    // Public API
    return {
        init: function() {
            // Set up formatting event listeners for payment fields
            setupFormattingEventListeners();
        },
        initCheckout: initCheckout,
        displayOrderConfirmation: displayOrderConfirmation
    };
})();

// Initialize the checkout module when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    checkoutModule.init();
});
