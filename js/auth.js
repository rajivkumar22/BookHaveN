/**
 * Authentication functionality for BookHaven
 * Handles user registration, login, and account management
 */

// Initialize the authentication module
const authModule = (function() {
    // Private variables and functions
    let isLoginForm = true; // Track which form is currently active
    
    // Password validation function
    const validatePassword = function(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        let errors = [];
        if (password.length < minLength) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!hasUpperCase) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!hasLowerCase) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!hasSpecialChar) {
            errors.push('Password must contain at least one special character');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    };
    
    // Hash password using SHA256
    const hashPassword = function(password) {
        return CryptoJS.SHA256(password).toString();
    };
    
    // Mock authentication (using sessionStorage and hashed passwords)
    const authenticateUser = function(email, password) {
        const users = JSON.parse(localStorage.getItem('bookhavenUsers')) || [];
        const hashedPassword = hashPassword(password);
        return users.find(user => user.email === email && user.password === hashedPassword);
    };
    
    // Check if email already exists
    const emailExists = function(email) {
        const users = JSON.parse(localStorage.getItem('bookhavenUsers')) || [];
        return users.some(user => user.email === email);
    };
    
    // Generate unique user ID
    const generateUserId = function() {
        return 'user_' + Date.now() + Math.floor(Math.random() * 1000);
    };
    
    // Register a new user
    const registerUser = function(name, email, password) {
        const users = JSON.parse(localStorage.getItem('bookhavenUsers')) || [];
        
        const newUser = {
            id: generateUserId(),
            name: name,
            email: email,
            password: password, // In a real app, this should be hashed
            createdAt: new Date().toISOString(),
            address: {},
            phone: ''
        };
        
        users.push(newUser);
        localStorage.setItem('bookhavenUsers', JSON.stringify(users));
        
        return newUser;
    };
    
    // Set current user in sessionStorage
    const setCurrentUser = function(user) {
        // Remove password before storing in sessionStorage
        const userToStore = { ...user };
        delete userToStore.password;
        
        sessionStorage.setItem('currentUser', JSON.stringify(userToStore));
        
        // Update UI for logged-in state
        updateUIForLoggedInUser(userToStore);
    };
    
    // Get current user from sessionStorage
    const getCurrentUser = function() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    };
    
    // Log out current user
    const logoutUser = function() {
        sessionStorage.removeItem('currentUser');
        
        // Update UI for logged-out state
        updateUIForLoggedOutUser();
    };
    
    // Update UI for logged-in user
    const updateUIForLoggedInUser = function(user) {
        // Update user icon
        const userIcon = document.getElementById('user-icon');
        userIcon.innerHTML = `<span class="user-initial">${user.name.charAt(0)}</span>`;
        
        // Update mobile menu
        document.querySelector('.login-link').classList.add('hidden');
        document.querySelector('.dashboard-link').classList.remove('hidden');
        document.querySelector('.logout-link').classList.remove('hidden');
        
        // Add CSS for user initial
        addUserInitialStyles();
    };
    
    // Update UI for logged-out user
    const updateUIForLoggedOutUser = function() {
        // Reset user icon
        const userIcon = document.getElementById('user-icon');
        userIcon.innerHTML = `<i class="fas fa-user"></i>`;
        
        // Update mobile menu
        document.querySelector('.login-link').classList.remove('hidden');
        document.querySelector('.dashboard-link').classList.add('hidden');
        document.querySelector('.logout-link').classList.add('hidden');
    };
    
    // Add styles for user initial display
    const addUserInitialStyles = function() {
        // Check if styles already exist
        if (document.getElementById('user-initial-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'user-initial-styles';
        style.textContent = `
            .user-initial {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                background-color: var(--primary-color);
                color: white;
                border-radius: 50%;
                font-size: 14px;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    };
    
    // Switch between login and signup forms
    const switchAuthForms = function(showLogin) {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const loginTab = document.getElementById('login-tab');
        const signupTab = document.getElementById('signup-tab');
        
        if (showLogin) {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            isLoginForm = true;
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            loginTab.classList.remove('active');
            signupTab.classList.add('active');
            isLoginForm = false;
        }
    };
    
    // Handle login form submission
    const handleLoginSubmit = function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validate inputs
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        // Authenticate user
        const user = authenticateUser(email, password);
        
        if (user) {
            // Set current user
            setCurrentUser(user);
            
            // Close modal
            document.getElementById('auth-modal').classList.remove('active');
            
            // Clear form
            document.getElementById('login-form').reset();
            
            // Show success notification
            showAuthNotification(`Welcome back, ${user.name}!`, 'success');
        } else {
            showAuthNotification('Invalid email or password', 'error');
        }
    };
    
    // Handle signup form submission
    const handleSignupSubmit = function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            showAuthNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Validate password
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            const prettyMessage =
                '<strong>Password must meet the following requirements:</strong><br>' +
                '<ul style="margin:8px 0 0 18px;padding:0;text-align:left;">' +
                '<li>At least 8 characters</li>' +
                '<li>One uppercase letter (A-Z)</li>' +
                '<li>One lowercase letter (a-z)</li>' +
                '<li>One special character (e.g. !@#$%^&amp;*)</li>' +
                '</ul>';
            showAuthNotification(prettyMessage, 'error', true);
            return;
        }
        
        if (password !== confirmPassword) {
            showAuthNotification('Passwords do not match', 'error');
            return;
        }
        
        if (!agreeTerms) {
            showAuthNotification('Please agree to the terms and conditions', 'error');
            return;
        }
        
        // Check if email already exists
        if (emailExists(email)) {
            showAuthNotification('Email already exists', 'error');
            return;
        }
        
        // Hash password before storing
        const hashedPassword = hashPassword(password);
        
        // Register user with hashed password
        const newUser = registerUser(name, email, hashedPassword);
        
        // Set current user
        setCurrentUser(newUser);
        
        // Close modal
        document.getElementById('auth-modal').classList.remove('active');
        
        // Clear form
        document.getElementById('signup-form').reset();
        
        // Show success notification
        showAuthNotification(`Welcome, ${name}! Your account has been created.`, 'success');
    };
    
    // Show auth notification
    const showAuthNotification = function(message, type, isHTML) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.auth-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'auth-notification';
            document.body.appendChild(notification);
            
            // Add CSS for notification
            const style = document.createElement('style');
            style.textContent = `
                .auth-notification {
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
                
                .auth-notification.show {
                    right: 20px;
                }
                
                .auth-notification.success {
                    background-color: var(--success);
                    color: white;
                }
                
                .auth-notification.error {
                    background-color: var(--danger);
                    color: white;
                }
            `;
            document.head.appendChild(style);
        }
        // Set notification content and show it
        if (isHTML) {
            notification.innerHTML = message;
        } else {
            notification.textContent = message;
        }
        notification.className = `auth-notification ${type}`;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };
    
    // Toggle password visibility
    const togglePasswordVisibility = function(targetId) {
        const passwordInput = document.getElementById(targetId);
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle icon
        const icon = document.querySelector(`.toggle-password[data-target="${targetId}"]`);
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    };
    
    // Check if user is logged in on page load
    const checkLoggedInUser = function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
            updateUIForLoggedInUser(currentUser);
        } else {
            updateUIForLoggedOutUser();
        }
    };
    
    // Public API
    return {
        init: function() {
            // Set up auth tab switching
            document.getElementById('login-tab').addEventListener('click', () => switchAuthForms(true));
            document.getElementById('signup-tab').addEventListener('click', () => switchAuthForms(false));
            
            // Set up form submissions
            document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
            document.getElementById('signup-form').addEventListener('submit', handleSignupSubmit);
            
            // Set up password toggle buttons
            document.querySelectorAll('.toggle-password').forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    togglePasswordVisibility(targetId);
                });
            });
            
            // Check if user is already logged in
            checkLoggedInUser();
        },
        logout: logoutUser,
        isLoggedIn: function() {
            return !!sessionStorage.getItem('currentUser');
        },
        getCurrentUser: getCurrentUser,
        showLoginForm: function() {
            switchAuthForms(true);
            document.getElementById('auth-modal').classList.add('active');
        }
    };
})();

// Initialize the auth module when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    authModule.init();
});
