/**
 * User Dashboard Functionality for BookHaven
 * Manages user profile, wishlist, and order history
 */

// Initialize the dashboard module
const dashboardModule = (function() {
    // Private variables and functions
    
    // Load user data from localStorage
    const loadUserData = function() {
        return JSON.parse(localStorage.getItem('currentUser'));
    };
    
    // Update user data in localStorage
    const updateUserData = function(userData) {
        // Get all users
        const users = JSON.parse(localStorage.getItem('bookhavenUsers')) || [];
        
        // Find and update the user
        const userIndex = users.findIndex(user => user.id === userData.id);
        
        if (userIndex !== -1) {
            // Preserve password when updating
            const existingPassword = users[userIndex].password;
            users[userIndex] = { ...userData, password: existingPassword };
            
            // Update users array in localStorage
            localStorage.setItem('bookhavenUsers', JSON.stringify(users));
            
            // Update current user
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            return true;
        }
        
        return false;
    };
    
    // Switch between dashboard tabs
    const switchDashboardTab = function(tabId) {
        // Update active tab
        document.querySelectorAll('.dashboard-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
        
        // Show corresponding panel and hide others
        document.querySelectorAll('.dashboard-panel').forEach(panel => {
            panel.classList.add('hidden');
        });
        
        const panelId = tabId.replace('tab', 'panel');
        document.getElementById(panelId).classList.remove('hidden');
    };
    
    // Load user profile data into form
    const loadProfileData = function(userData) {
        if (!userData) return;
        
        // Set form values
        document.getElementById('profile-name').value = userData.name || '';
        document.getElementById('profile-email').value = userData.email || '';
        document.getElementById('profile-phone').value = userData.phone || '';
        document.getElementById('profile-address').value = userData.address?.street || '';
        document.getElementById('profile-city').value = userData.address?.city || '';
        document.getElementById('profile-state').value = userData.address?.state || '';
        document.getElementById('profile-zip').value = userData.address?.zip || '';
        document.getElementById('profile-country').value = userData.address?.country || '';
    };
    
    // Handle profile form submission
    const handleProfileFormSubmit = function(e) {
        e.preventDefault();
        
        const userData = loadUserData();
        if (!userData) {
            alert('You need to be logged in to update your profile');
            return;
        }
        
        // Get form values
        const name = document.getElementById('profile-name').value.trim();
        const email = document.getElementById('profile-email').value.trim();
        const phone = document.getElementById('profile-phone').value.trim();
        const street = document.getElementById('profile-address').value.trim();
        const city = document.getElementById('profile-city').value.trim();
        const state = document.getElementById('profile-state').value.trim();
        const zip = document.getElementById('profile-zip').value.trim();
        const country = document.getElementById('profile-country').value.trim();
        
        // Validate required fields
        if (!name || !email) {
            alert('Name and email are required');
            return;
        }
        
        // Update user data
        const updatedUserData = {
            ...userData,
            name,
            email,
            phone,
            address: {
                street,
                city,
                state,
                zip,
                country
            }
        };
        
        // Save updated user data
        if (updateUserData(updatedUserData)) {
            // Show success notification
            showDashboardNotification('Profile updated successfully', 'success');
            
            // Update header UI with new name
            const userIcon = document.getElementById('user-icon');
            userIcon.innerHTML = `<span class="user-initial">${name.charAt(0)}</span>`;
        } else {
            showDashboardNotification('Failed to update profile', 'error');
        }
    };
    
    // Add book to wishlist
    const addToWishlist = function(bookId) {
        const userData = loadUserData();
        
        if (!userData) {
            // Show login modal if user is not logged in
            document.getElementById('auth-modal').classList.add('active');
            return;
        }
        
        // Get wishlist from localStorage
        let wishlist = JSON.parse(localStorage.getItem(`wishlist_${userData.id}`)) || [];
        
        // Check if book is already in wishlist
        if (wishlist.includes(bookId)) {
            showDashboardNotification('Book is already in your wishlist', 'info');
            return;
        }
        
        // Add book to wishlist
        wishlist.push(bookId);
        localStorage.setItem(`wishlist_${userData.id}`, JSON.stringify(wishlist));
        
        // Show success notification
        showDashboardNotification('Book added to wishlist', 'success');
    };
    
    // Remove book from wishlist
    const removeFromWishlist = function(bookId) {
        const userData = loadUserData();
        
        if (!userData) return;
        
        // Get wishlist from localStorage
        let wishlist = JSON.parse(localStorage.getItem(`wishlist_${userData.id}`)) || [];
        
        // Remove book from wishlist
        wishlist = wishlist.filter(id => id !== bookId);
        localStorage.setItem(`wishlist_${userData.id}`, JSON.stringify(wishlist));
        
        // Reload wishlist display
        loadWishlistItems();
        
        // Show notification
        showDashboardNotification('Book removed from wishlist', 'info');
    };
    
    // Load wishlist items
    const loadWishlistItems = function() {
        const userData = loadUserData();
        const wishlistContainer = document.getElementById('wishlist-items');
        
        if (!userData || !wishlistContainer) return;
        
        // Get wishlist from localStorage
        const wishlist = JSON.parse(localStorage.getItem(`wishlist_${userData.id}`)) || [];
        
        // Clear container
        wishlistContainer.innerHTML = '';
        
        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = `
                <div class="empty-wishlist">
                    <i class="far fa-heart"></i>
                    <p data-i18n="wishlist_empty">Your wishlist is empty</p>
                    <button id="start-shopping-wishlist" class="secondary-btn" data-i18n="wishlist_start_shopping">Start Shopping</button>
                </div>
            `;
            
            // Add event listener to start shopping button
            const startShoppingBtn = document.getElementById('start-shopping-wishlist');
            if (startShoppingBtn) {
                startShoppingBtn.addEventListener('click', () => {
                    document.getElementById('dashboard-modal').classList.remove('active');
                    document.querySelector('.book-listings').scrollIntoView({ behavior: 'smooth' });
                });
            }
            
            return;
        }
        
        // Create wishlist items HTML
        wishlist.forEach(bookId => {
            const book = booksModule.getBookById(bookId);
            
            if (book) {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'wishlist-item';
                wishlistItem.innerHTML = `
                    <div class="wishlist-image" style="background-color: ${book.coverColor}">
                        <div class="wishlist-cover-container">
                            <img class="wishlist-cover-image" 
                                 src="" 
                                 alt="${book.title}" 
                                 style="display: none;" 
                                 loading="lazy">
                            <div class="wishlist-image-placeholder">
                                <i class="fas fa-book"></i>
                            </div>
                        </div>
                    </div>
                    <div class="wishlist-info">
                        <h3 class="wishlist-title">${book.title}</h3>
                        <p class="wishlist-author">${book.author}</p>
                        <p class="wishlist-price">$${book.price.toFixed(2)}</p>
                        <div class="wishlist-actions">
                            <button class="wishlist-add" data-id="${book.id}">
                                <i class="fas fa-shopping-cart"></i> <span data-i18n="wishlist_add_to_cart">Add to Cart</span>
                            </button>
                            <button class="wishlist-remove" data-id="${book.id}">
                                <i class="fas fa-trash-alt"></i> <span data-i18n="wishlist_remove">Remove</span>
                            </button>
                        </div>
                    </div>
                `;
                
                // Load cover image for wishlist item
                const loadWishlistCover = async () => {
                    const coverImage = wishlistItem.querySelector('.wishlist-cover-image');
                    const placeholder = wishlistItem.querySelector('.wishlist-image-placeholder');
                    
                    try {
                        const coverUrl = await booksModule.loadCoverImage(book.id, book.title, book.author);
                        
                        if (coverUrl) {
                            const img = new Image();
                            img.onload = () => {
                                coverImage.src = coverUrl;
                                coverImage.style.display = 'block';
                                placeholder.style.display = 'none';
                            };
                            img.onerror = () => {
                                placeholder.style.display = 'flex';
                            };
                            img.src = coverUrl;
                        } else {
                            placeholder.style.display = 'flex';
                        }
                    } catch (error) {
                        console.warn('Error loading wishlist cover:', error);
                        placeholder.style.display = 'flex';
                    }
                };
                
                // Load cover with delay
                setTimeout(loadWishlistCover, Math.random() * 300);
                
                wishlistContainer.appendChild(wishlistItem);
            }
        });
        
        // Add event listeners for wishlist actions
        document.querySelectorAll('.wishlist-add').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookId = this.getAttribute('data-id');
                cartModule.addToCart(bookId);
            });
        });
        
        document.querySelectorAll('.wishlist-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookId = this.getAttribute('data-id');
                removeFromWishlist(bookId);
            });
        });
        
        // Apply translations if i18n is initialized
        if (typeof i18nModule !== 'undefined' && typeof i18nModule.translateElements === 'function') {
            i18nModule.translateElements(wishlistContainer);
        }
    };
    
    // Load order history
    const loadOrderHistory = function() {
        const userData = loadUserData();
        const ordersContainer = document.getElementById('orders-list');
        
        if (!userData || !ordersContainer) return;
        
        // Get orders from localStorage
        const orders = JSON.parse(localStorage.getItem(`orders_${userData.id}`)) || [];
        
        // Clear container
        ordersContainer.innerHTML = '';
        
        if (orders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="empty-orders">
                    <i class="fas fa-shopping-bag"></i>
                    <p data-i18n="orders_empty">You haven't placed any orders yet</p>
                </div>
            `;
            return;
        }
        
        // Sort orders by date (newest first)
        orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Create order cards HTML
        orders.forEach(order => {
            const orderDate = new Date(order.date);
            const formattedDate = orderDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            });
            
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            
            // Create order items HTML
            let orderItemsHTML = '';
            
            order.items.forEach(item => {
                orderItemsHTML += `
                    <div class="order-card-item">
                        <div class="order-card-item-title">${item.title} (x${item.quantity})</div>
                        <div class="order-card-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `;
            });
            
            // Determine status class and text
            let statusClass, statusText;
            const daysSinceOrder = Math.floor((new Date() - orderDate) / (1000 * 60 * 60 * 24));
            
            if (daysSinceOrder < 2) {
                statusClass = 'status-processing';
                statusText = 'Processing';
            } else if (daysSinceOrder < 5) {
                statusClass = 'status-shipped';
                statusText = 'Shipped';
            } else {
                statusClass = 'status-delivered';
                statusText = 'Delivered';
            }
            
            orderCard.innerHTML = `
                <div class="order-card-header">
                    <div class="order-card-number">Order #${order.orderId}</div>
                    <div class="order-card-date">${formattedDate}</div>
                </div>
                <div class="order-card-items">
                    ${orderItemsHTML}
                </div>
                <div class="order-card-total">Total: $${order.total.toFixed(2)}</div>
                <div class="order-card-status ${statusClass}" data-i18n="order_status_${statusText.toLowerCase()}">${statusText}</div>
            `;
            
            ordersContainer.appendChild(orderCard);
        });
        
        // Apply translations if i18n is initialized
        if (typeof i18nModule !== 'undefined' && typeof i18nModule.translateElements === 'function') {
            i18nModule.translateElements(ordersContainer);
        }
    };
    
    // Load all dashboard data
    const loadDashboard = function() {
        const userData = loadUserData();
        
        if (!userData) {
            alert('You need to be logged in to view your dashboard');
            document.getElementById('auth-modal').classList.add('active');
            return;
        }
        
        // Load profile data
        loadProfileData(userData);
        
        // Load wishlist
        loadWishlistItems();
        
        // Load order history
        loadOrderHistory();
    };
    
    // Show dashboard notification
    const showDashboardNotification = function(message, type) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.dashboard-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'dashboard-notification';
            document.body.appendChild(notification);
            
            // Add CSS for notification
            const style = document.createElement('style');
            style.textContent = `
                .dashboard-notification {
                    position: fixed;
                    top: 20px;
                    right: -300px;
                    padding: 15px 20px;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-md);
                    z-index: 1000;
                    transition: right 0.3s ease-in-out;
                    max-width: 300px;
                }
                
                .dashboard-notification.show {
                    right: 20px;
                }
                
                .dashboard-notification.success {
                    background-color: var(--success);
                    color: white;
                }
                
                .dashboard-notification.error {
                    background-color: var(--danger);
                    color: white;
                }
                
                .dashboard-notification.info {
                    background-color: var(--info);
                    color: white;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Set notification content and show it
        notification.textContent = message;
        notification.className = `dashboard-notification ${type}`;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };
    
    // Public API
    return {
        init: function() {
            // Set up dashboard tab switching
            document.getElementById('profile-tab').addEventListener('click', () => switchDashboardTab('profile-tab'));
            document.getElementById('wishlist-tab').addEventListener('click', () => switchDashboardTab('wishlist-tab'));
            document.getElementById('orders-tab').addEventListener('click', () => switchDashboardTab('orders-tab'));
            
            // Set up profile form submission
            document.getElementById('profile-form').addEventListener('submit', handleProfileFormSubmit);
            
            // Set up logout button
            document.getElementById('logout-btn').addEventListener('click', function() {
                // Close dashboard modal first
                document.getElementById('dashboard-modal').classList.remove('active');
                
                // Call logout function from auth module
                if (typeof authModule !== 'undefined' && authModule.logout) {
                    authModule.logout();
                    
                    // Show logout notification
                    if (typeof showDashboardNotification === 'function') {
                        showDashboardNotification('You have been logged out successfully', 'info');
                    }
                }
            });
            
            // Set up dashboard link in mobile menu
            document.querySelector('.dashboard-link a').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('mobile-menu').classList.remove('active');
                loadDashboard();
                document.getElementById('dashboard-modal').classList.add('active');
            });
        },
        loadDashboard: loadDashboard,
        addToWishlist: addToWishlist,
        removeFromWishlist: removeFromWishlist
    };
})();

// Initialize the dashboard module when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    dashboardModule.init();
});
