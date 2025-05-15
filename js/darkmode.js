/**
 * Dark Mode functionality for BookHaven
 * Handles toggling between light and dark themes with localStorage persistence
 */

// Initialize the dark mode module
const darkModeModule = (function() {
    // Private variables and functions
    let isDarkMode = false;
    
    // Enable dark mode
    const enableDarkMode = function() {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
        isDarkMode = true;
        localStorage.setItem('darkMode', 'enabled');
    };
    
    // Disable dark mode
    const disableDarkMode = function() {
        document.body.classList.remove('dark-mode');
        updateDarkModeIcon(false);
        isDarkMode = false;
        localStorage.setItem('darkMode', 'disabled');
    };
    
    // Toggle dark mode
    const toggleDarkMode = function() {
        if (isDarkMode) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    };
    
    // Update dark mode icon
    const updateDarkModeIcon = function(isDark) {
        const darkModeBtn = document.getElementById('dark-mode-btn');
        
        if (darkModeBtn) {
            if (isDark) {
                darkModeBtn.classList.remove('fa-moon');
                darkModeBtn.classList.add('fa-sun');
            } else {
                darkModeBtn.classList.remove('fa-sun');
                darkModeBtn.classList.add('fa-moon');
            }
        }
    };
    
    // Check and apply user's saved dark mode preference
    const checkDarkModePreference = function() {
        const darkMode = localStorage.getItem('darkMode');
        
        if (darkMode === 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    };
    
    // Check for system preference if no saved preference
    const checkSystemPreference = function() {
        if (!localStorage.getItem('darkMode')) {
            // Check if user prefers dark mode
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                enableDarkMode();
            }
            
            // Watch for changes in system preference
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('darkMode')) {
                    if (e.matches) {
                        enableDarkMode();
                    } else {
                        disableDarkMode();
                    }
                }
            });
        }
    };
    
    // Enhance user experience with dark mode transition
    const addDarkModeTransitionStyles = function() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                transition: background-color 0.3s ease, color 0.3s ease;
            }
            
            @media (prefers-reduced-motion: reduce) {
                body {
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Public API
    return {
        init: function() {
            // Add transition styles for smooth toggling
            addDarkModeTransitionStyles();
            
            // Check saved preference
            checkDarkModePreference();
            
            // Check system preference if no saved preference
            checkSystemPreference();
            
            // Add event listener to dark mode toggle button
            const darkModeBtn = document.getElementById('dark-mode-btn');
            if (darkModeBtn) {
                darkModeBtn.addEventListener('click', toggleDarkMode);
            }
        },
        toggle: toggleDarkMode,
        enable: enableDarkMode,
        disable: disableDarkMode,
        isDarkMode: function() {
            return isDarkMode;
        }
    };
})();

// Initialize the dark mode module when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    darkModeModule.init();
});
