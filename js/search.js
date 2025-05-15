/**
 * Search Functionality for BookHaven
 * Handles search bar, autocomplete, and filtering books based on search queries
 */

// Initialize the search module
const searchModule = (function() {
    // Private variables
    let searchTimeout = null;
    let lastSearchQuery = '';
    
    // Function to handle search input and show suggestions
    const handleSearchInput = function(e) {
        const searchInput = e.target;
        const query = searchInput.value.trim().toLowerCase();
        const suggestionsContainer = document.getElementById('search-suggestions');
        
        // Clear previous timeout to debounce search
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Clear suggestions if query is empty
        if (query === '') {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // Set timeout for debouncing (300ms)
        searchTimeout = setTimeout(() => {
            // Get suggestions based on query
            const suggestions = getSearchSuggestions(query);
            
            // Display suggestions
            displaySearchSuggestions(suggestions, query);
        }, 300);
    };
    
    // Function to get search suggestions based on query
    const getSearchSuggestions = function(query) {
        // Search through books data to find matches
        return booksModule.booksData.filter(book => {
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.genre.toLowerCase().includes(query) ||
                book.subgenre.toLowerCase().includes(query)
            );
        }).slice(0, 5); // Limit to 5 suggestions
    };
    
    // Function to display search suggestions
    const displaySearchSuggestions = function(suggestions, query) {
        const suggestionsContainer = document.getElementById('search-suggestions');
        
        // Clear suggestions container
        suggestionsContainer.innerHTML = '';
        
        if (suggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // Create suggestions HTML
        suggestions.forEach(book => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'search-suggestion-item';
            suggestionItem.setAttribute('data-id', book.id);
            
            // Highlight matching text
            const titleHtml = highlightMatchingText(book.title, query);
            const authorHtml = highlightMatchingText(book.author, query);
            
            suggestionItem.innerHTML = `
                <div class="suggestion-content">
                    <div class="suggestion-title">${titleHtml}</div>
                    <div class="suggestion-author">by ${authorHtml}</div>
                </div>
                <div class="suggestion-genre">${book.genre}</div>
            `;
            
            // Add event listener to suggestion item
            suggestionItem.addEventListener('click', () => {
                // Clear search input and hide suggestions
                document.getElementById('search-input').value = '';
                suggestionsContainer.style.display = 'none';
                
                // Show book preview
                booksModule.createBookPreviewContent(book.id);
                document.getElementById('book-preview-modal').classList.add('active');
            });
            
            suggestionsContainer.appendChild(suggestionItem);
        });
        
        // Show suggestions container
        suggestionsContainer.style.display = 'block';
        
        // Add CSS if not already added
        addSearchSuggestionsCSS();
    };
    
    // Function to highlight matching text in search results
    const highlightMatchingText = function(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    };
    
    // Function to add CSS for search suggestions
    const addSearchSuggestionsCSS = function() {
        // Check if style is already added
        if (document.getElementById('search-suggestions-style')) {
            return;
        }
        
        // Create style element
        const style = document.createElement('style');
        style.id = 'search-suggestions-style';
        
        // Add CSS
        style.textContent = `
            .search-suggestion-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                cursor: pointer;
                border-bottom: 1px solid var(--gray-light);
            }
            
            .search-suggestion-item:last-child {
                border-bottom: none;
            }
            
            .search-suggestion-item:hover {
                background-color: var(--light);
            }
            
            .suggestion-content {
                flex: 1;
            }
            
            .suggestion-title {
                font-weight: 500;
                margin-bottom: 3px;
            }
            
            .suggestion-author {
                font-size: 0.9rem;
                color: var(--gray-medium);
            }
            
            .suggestion-genre {
                font-size: 0.8rem;
                background-color: var(--primary-light);
                color: var(--white);
                padding: 3px 8px;
                border-radius: 12px;
                margin-left: 10px;
            }
            
            .highlight {
                background-color: rgba(255, 255, 0, 0.3);
                font-weight: bold;
            }
        `;
        
        // Add style to head
        document.head.appendChild(style);
    };
    
    // Function to handle search form submission
    const handleSearchSubmit = function(e) {
        e.preventDefault();
        
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        
        if (query === '') {
            return;
        }
        
        // Hide suggestions
        document.getElementById('search-suggestions').style.display = 'none';
        
        // Perform search
        performSearch(query);
        
        // Save search to history
        saveSearchToHistory(query);
    };
    
    // Function to perform search
    const performSearch = function(query) {
        // Store last search query
        lastSearchQuery = query;
        
        // Filter books based on search query
        const filteredBooks = booksModule.booksData.filter(book => {
            return (
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()) ||
                book.genre.toLowerCase().includes(query.toLowerCase()) ||
                book.subgenre.toLowerCase().includes(query.toLowerCase()) ||
                book.description.toLowerCase().includes(query.toLowerCase())
            );
        });
        
        // Update book display with filtered books
        booksModule.displayBooks(filteredBooks, 1);
        
        // Scroll to books section
        document.querySelector('.book-listings').scrollIntoView({ behavior: 'smooth' });
        
        // Update search result heading
        updateSearchResultHeading(query, filteredBooks.length);
    };
    
    // Function to update search result heading
    const updateSearchResultHeading = function(query, resultCount) {
        const sectionTitle = document.querySelector('.book-listings .section-title');
        
        if (sectionTitle) {
            const resultText = resultCount === 1 ? 'result' : 'results';
            sectionTitle.textContent = `Search Results for "${query}" (${resultCount} ${resultText})`;
            
            // Add clear search button if not already present
            let clearButton = document.querySelector('.clear-search-btn');
            
            if (!clearButton) {
                clearButton = document.createElement('button');
                clearButton.className = 'clear-search-btn';
                clearButton.innerHTML = '<i class="fas fa-times"></i> Clear Search';
                clearButton.addEventListener('click', clearSearch);
                
                sectionTitle.parentNode.appendChild(clearButton);
                
                // Add CSS for clear button
                const style = document.createElement('style');
                style.textContent = `
                    .clear-search-btn {
                        background-color: var(--gray-light);
                        color: var(--dark);
                        border: none;
                        padding: 8px 15px;
                        border-radius: var(--button-radius);
                        cursor: pointer;
                        margin-left: 15px;
                        font-size: 0.9rem;
                        transition: background-color var(--transition-fast);
                    }
                    
                    .clear-search-btn:hover {
                        background-color: var(--gray-medium);
                    }
                `;
                document.head.appendChild(style);
            }
        }
    };
    
    // Function to clear search and restore all books
    const clearSearch = function() {
        // Clear search input
        document.getElementById('search-input').value = '';
        
        // Reset filters
        document.getElementById('filter-genre').value = 'all';
        document.getElementById('filter-price').value = 'all';
        document.getElementById('filter-rating').value = 'all';
        
        // Display all books
        booksModule.displayBooks(booksModule.booksData, 1);
        
        // Reset section title
        const sectionTitle = document.querySelector('.book-listings .section-title');
        if (sectionTitle) {
            sectionTitle.textContent = 'Our Collection';
        }
        
        // Remove clear search button
        const clearButton = document.querySelector('.clear-search-btn');
        if (clearButton) {
            clearButton.remove();
        }
        
        // Reset last search query
        lastSearchQuery = '';
    };
    
    // Function to save search to history
    const saveSearchToHistory = function(query) {
        // Get search history from localStorage
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        
        // Add new search to history (avoid duplicates)
        if (!searchHistory.includes(query)) {
            searchHistory.unshift(query);
            
            // Limit history to 10 items
            if (searchHistory.length > 10) {
                searchHistory = searchHistory.slice(0, 10);
            }
            
            // Save to localStorage
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    };
    
    // Function to handle clicks outside of search suggestions
    const handleDocumentClick = function(e) {
        if (!e.target.closest('#search-input') && !e.target.closest('#search-suggestions')) {
            document.getElementById('search-suggestions').style.display = 'none';
        }
    };
    
    // Function to initialize mobile search form
    const initializeMobileSearch = function() {
        const mobileSearchForm = document.getElementById('mobile-search-form');
        
        if (mobileSearchForm) {
            mobileSearchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const searchInput = mobileSearchForm.querySelector('input');
                const query = searchInput.value.trim();
                
                if (query === '') {
                    return;
                }
                
                // Close mobile menu
                document.getElementById('mobile-menu').classList.remove('active');
                
                // Perform search
                performSearch(query);
                
                // Save search to history
                saveSearchToHistory(query);
            });
        }
    };
    
    // Public API
    return {
        init: function() {
            // Set up search input event listeners
            const searchInput = document.getElementById('search-input');
            const searchForm = document.getElementById('search-form');
            
            if (searchInput) {
                searchInput.addEventListener('input', handleSearchInput);
                searchInput.addEventListener('focus', function() {
                    // Show suggestions if input is not empty
                    if (this.value.trim() !== '') {
                        handleSearchInput({ target: this });
                    }
                });
            }
            
            if (searchForm) {
                searchForm.addEventListener('submit', handleSearchSubmit);
            }
            
            // Close suggestions when clicking outside
            document.addEventListener('click', handleDocumentClick);
            
            // Initialize mobile search
            initializeMobileSearch();
        },
        clearSearch: clearSearch,
        performSearch: performSearch,
        getLastSearchQuery: function() { return lastSearchQuery; }
    };
})();

// Initialize search module when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    searchModule.init();
});
