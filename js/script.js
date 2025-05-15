/**
 * Main script file for BookHaven website
 * Handles initialization and global event listeners
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize book-related components
    booksModule.initializeGenreFilter();
    booksModule.initializeCategoriesSection();
    booksModule.initializeOffersBanner();
    booksModule.initializeBooksSection();
    booksModule.updateRecentlyViewedSection();

    // Global event listeners for modals
    setupModalEventListeners();

    // Event delegation for book cards and modals
    setupBookCardEvents();

    // Mobile menu interactions
    setupMobileMenu();

    // Set up category card click events
    setupCategoryCardEvents();

    // Subscribe to newsletter
    setupNewsletterForm();

    // Initialize internationalization
    initializeLanguageSelector();
});

/**
 * Set up event listeners for modals
 */
function setupModalEventListeners() {
    // Book preview modal
    document.getElementById('close-book-preview').addEventListener('click', () => {
        document.getElementById('book-preview-modal').classList.remove('active');
    });

    // Authentication modal
    document.getElementById('close-auth-modal').addEventListener('click', () => {
        document.getElementById('auth-modal').classList.remove('active');
    });

    // Cart modal
    document.getElementById('close-cart-modal').addEventListener('click', () => {
        document.getElementById('cart-modal').classList.remove('active');
    });

    document.getElementById('continue-shopping').addEventListener('click', () => {
        document.getElementById('cart-modal').classList.remove('active');
    });

    // Checkout modal
    document.getElementById('close-checkout-modal').addEventListener('click', () => {
        document.getElementById('checkout-modal').classList.remove('active');
    });

    // Order confirmation modal
    document.getElementById('close-confirmation-modal').addEventListener('click', () => {
        document.getElementById('order-confirmation-modal').classList.remove('active');
    });

    document.getElementById('continue-shopping-after-order').addEventListener('click', () => {
        document.getElementById('order-confirmation-modal').classList.remove('active');
    });

    // User dashboard modal
    document.getElementById('close-dashboard-modal').addEventListener('click', () => {
        document.getElementById('dashboard-modal').classList.remove('active');
    });

    // Newsletter modal
    document.getElementById('close-newsletter-modal').addEventListener('click', () => {
        document.getElementById('newsletter-modal').classList.remove('active');
    });

    document.getElementById('close-newsletter-btn').addEventListener('click', () => {
        document.getElementById('newsletter-modal').classList.remove('active');
    });

    // Close modals when clicking outside of modal content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Global ESC key to close active modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

/**
 * Set up event delegation for book cards
 */
function setupBookCardEvents() {
    // Delegate clicks for the book cards and their buttons
    document.addEventListener('click', (e) => {
        // Quick preview button
        if (e.target.closest('.preview-btn')) {
            const bookId = e.target.closest('.preview-btn').getAttribute('data-id');
            booksModule.createBookPreviewContent(bookId);
            document.getElementById('book-preview-modal').classList.add('active');
        }
        
        // Add to wishlist button
        if (e.target.closest('.wishlist-btn')) {
            const bookId = e.target.closest('.wishlist-btn').getAttribute('data-id');
            dashboardModule.addToWishlist(bookId);
        }
        
        // Add to cart button
        if (e.target.closest('.add-to-cart')) {
            const bookId = e.target.closest('.add-to-cart').getAttribute('data-id');
            cartModule.addToCart(bookId);
        }
    });

    // Cart icon click
    document.getElementById('cart-icon').addEventListener('click', () => {
        cartModule.displayCart();
        document.getElementById('cart-modal').classList.add('active');
    });

    // User icon click
    document.getElementById('user-icon').addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            dashboardModule.loadDashboard();
            document.getElementById('dashboard-modal').classList.add('active');
        } else {
            document.getElementById('auth-modal').classList.add('active');
        }
    });
}

/**
 * Set up mobile menu interaction
 */
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Login link in mobile menu
    document.querySelector('.mobile-nav .login-link').addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenu.classList.remove('active');
        document.getElementById('auth-modal').classList.add('active');
    });
}

/**
 * Set up category card click events
 */
function setupCategoryCardEvents() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const genre = card.getAttribute('data-genre');
            if (genre) {
                // Set the genre filter value and trigger the change event
                const genreFilter = document.getElementById('filter-genre');
                genreFilter.value = genre;
                
                // Create and dispatch a change event
                const event = new Event('change');
                genreFilter.dispatchEvent(event);

                // Scroll to books section
                document.querySelector('.book-listings').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Set up newsletter form submission
 */
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();
        
        if (email === '') {
            document.getElementById('newsletter-message').textContent = 'Please enter your email address';
            return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('newsletter-message').textContent = 'Please enter a valid email address';
            return;
        }
        
        // Store in localStorage
        let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        
        // Check if already subscribed
        if (subscribers.includes(email)) {
            document.getElementById('newsletter-message').textContent = 'You are already subscribed!';
            return;
        }
        
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        
        // Clear form and show success message
        emailInput.value = '';
        document.getElementById('newsletter-message').textContent = 'Successfully subscribed!';
        
        // Show confirmation modal
        document.getElementById('newsletter-modal').classList.add('active');
    });
}

/**
 * Initialize language selector
 */
function initializeLanguageSelector() {
    const languageSelector = document.getElementById('language-selector');
    
    // Set initial value from localStorage or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelector.value = savedLanguage;
    
    // Apply the language
    i18nModule.setLanguage(savedLanguage);
    
    // Handle language change
    languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        i18nModule.setLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
    });
}

/**
 * Function to handle scroll to element
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Export public functions
window.appModule = {
    scrollToElement
};
