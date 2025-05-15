/**
 * Internationalization (i18n) functionality for BookHaven
 * Handles multi-language support for the website (English, Hindi, Maithili)
 */

// Initialize the i18n module
const i18nModule = (function() {
    // Private variables and functions
    let currentLanguage = 'en';
    
    // Translations object
    const translations = {
        en: {
            // Navigation
            nav_home: "Home",
            nav_categories: "Categories",
            nav_bestsellers: "Bestsellers",
            nav_new_arrivals: "New Arrivals",
            nav_offers: "Special Offers",
            nav_login: "Login",
            nav_dashboard: "Dashboard",
            
            // Categories
            categories_title: "Browse By Categories",
            
            // Genre names
            genre_fiction: "Fiction",
            genre_nonfiction: "Non-fiction",
            genre_romance: "Romance",
            genre_thriller: "Thriller",
            genre_horror: "Horror",
            genre_sad: "Sad",
            genre_history: "History",
            genre_realistic: "Realistic",
            
            // Books section
            books_title: "Our Collection",
            
            // Filters
            filter_genre: "Genre:",
            filter_price: "Price:",
            filter_rating: "Rating:",
            filter_all: "All",
            filter_under_10: "Under $10",
            filter_10_to_20: "$10 - $20",
            filter_20_to_30: "$20 - $30",
            filter_over_30: "Over $30",
            filter_4_plus: "4+ Stars",
            filter_3_plus: "3+ Stars",
            filter_2_plus: "2+ Stars",
            
            // Search
            search_placeholder: "Search books, authors...",
            no_books_found: "No books found matching your criteria.",
            
            // Recently Viewed
            recently_viewed_title: "Recently Viewed",
            no_recently_viewed: "You haven't viewed any books yet.",
            
            // Book Preview
            preview_rating: "Rating",
            preview_published: "Published",
            preview_language: "Language",
            preview_pages: "Pages",
            preview_description: "Description",
            preview_reviews: "Reviews",
            preview_add_to_cart: "Add to Cart",
            preview_review_placeholder: "Write your review here...",
            preview_submit_review: "Submit Review",
            no_reviews: "No reviews yet. Be the first to leave a review!",
            
            // Newsletter
            newsletter_title: "Subscribe to Our Newsletter",
            newsletter_desc: "Get exclusive offers, new releases and reading recommendations delivered to your inbox.",
            newsletter_btn: "Subscribe",
            newsletter_success_title: "Thank You for Subscribing!",
            newsletter_success_message: "You've been successfully added to our mailing list. Get ready for exclusive offers, new releases, and reading recommendations.",
            newsletter_close: "Close",
            
            // Banner Offers
            banner_title_0: "Summer Reading Sale",
            banner_description_0: "Get 20% off on all books this summer season!",
            banner_button_0: "Shop Now",
            
            banner_title_1: "New Arrivals",
            banner_description_1: "Check out our latest collection of books from top authors!",
            banner_button_1: "Explore",
            
            banner_title_2: "Book Club Special",
            banner_description_2: "Join our book club and get exclusive discounts and early access to new releases!",
            banner_button_2: "Join Now",
            
            // Cart
            cart_title: "Your Shopping Cart",
            cart_empty: "Your cart is empty",
            cart_start_shopping: "Start Shopping",
            cart_continue: "Continue Shopping",
            cart_checkout: "Proceed to Checkout",
            cart_subtotal: "Subtotal:",
            cart_tax: "Tax (5%):",
            cart_shipping: "Shipping:",
            cart_free_shipping: "Free",
            cart_total: "Total:",
            
            // Checkout
            checkout_title: "Checkout",
            checkout_shipping: "Shipping Information",
            checkout_name: "Full Name",
            checkout_email: "Email Address",
            checkout_address: "Address",
            checkout_city: "City",
            checkout_state: "State",
            checkout_zip: "ZIP Code",
            checkout_country: "Country",
            checkout_payment: "Payment Information",
            checkout_card_name: "Name on Card",
            checkout_card_number: "Card Number",
            checkout_card_expiry: "Expiry Date",
            checkout_card_cvv: "CVV",
            checkout_place_order: "Place Order",
            
            // Order confirmation
            order_success: "Order Placed Successfully!",
            order_thank_you: "Thank you for shopping with BookHaven.",
            order_continue: "Continue Shopping",
            
            // Order status
            order_status_processing: "Processing",
            order_status_shipped: "Shipped",
            order_status_delivered: "Delivered",
            
            // Auth forms
            login_tab: "Login",
            signup_tab: "Sign Up",
            login_email: "Email",
            login_password: "Password",
            login_remember: "Remember me",
            login_btn: "Login",
            login_forgot: "Forgot Password?",
            
            signup_name: "Full Name",
            signup_email: "Email",
            signup_password: "Password",
            signup_confirm: "Confirm Password",
            signup_terms: "I agree to the Terms and Conditions",
            signup_btn: "Sign Up",
            
            // Dashboard
            dashboard_title: "My Account",
            dashboard_profile: "Profile",
            dashboard_wishlist: "Wishlist",
            dashboard_orders: "Orders",
            
            // Profile
            profile_personal_info: "Personal Information",
            profile_name: "Full Name",
            profile_email: "Email",
            profile_phone: "Phone",
            profile_address: "Address",
            profile_address_line: "Street Address",
            profile_city: "City",
            profile_state: "State",
            profile_zip: "ZIP Code",
            profile_country: "Country",
            profile_save: "Save Changes",
            
            // Wishlist
            wishlist_title: "My Wishlist",
            wishlist_empty: "Your wishlist is empty",
            wishlist_start_shopping: "Start Shopping",
            wishlist_add_to_cart: "Add to Cart",
            wishlist_remove: "Remove",
            
            // Orders
            orders_title: "My Orders",
            orders_empty: "You haven't placed any orders yet",
            
            // Footer
            footer_about_title: "About BookHaven",
            footer_about_text: "BookHaven is your one-stop destination for discovering new books, authors, and genres. We aim to make reading accessible for everyone.",
            footer_quick_links: "Quick Links",
            footer_home: "Home",
            footer_categories: "Categories",
            footer_bestsellers: "Bestsellers",
            footer_offers: "Special Offers",
            footer_help: "Help",
            footer_faq: "FAQ",
            footer_shipping: "Shipping",
            footer_returns: "Returns",
            footer_contact: "Contact Us",
            footer_follow: "Follow Us",
            footer_rights: "All Rights Reserved."
        },
        
        hi: {
            // Navigation
            nav_home: "होम",
            nav_categories: "श्रेणियाँ",
            nav_bestsellers: "बेस्टसेलर",
            nav_new_arrivals: "नई आवक",
            nav_offers: "विशेष ऑफर",
            nav_login: "लॉगिन",
            nav_dashboard: "डैशबोर्ड",
            
            // Categories
            categories_title: "श्रेणियों के अनुसार ब्राउज़ करें",
            
            // Genre names
            genre_fiction: "कथा साहित्य",
            genre_nonfiction: "गैर-कथा साहित्य",
            genre_romance: "रोमांस",
            genre_thriller: "थ्रिलर",
            genre_horror: "हॉरर",
            genre_sad: "दुखद",
            genre_history: "इतिहास",
            genre_realistic: "यथार्थवादी",
            
            // Books section
            books_title: "हमारा संग्रह",
            
            // Filters
            filter_genre: "शैली:",
            filter_price: "मूल्य:",
            filter_rating: "रेटिंग:",
            filter_all: "सभी",
            filter_under_10: "$10 से कम",
            filter_10_to_20: "$10 - $20",
            filter_20_to_30: "$20 - $30",
            filter_over_30: "$30 से अधिक",
            filter_4_plus: "4+ स्टार",
            filter_3_plus: "3+ स्टार",
            filter_2_plus: "2+ स्टार",
            
            // Search
            search_placeholder: "पुस्तकें, लेखक खोजें...",
            no_books_found: "आपके मानदंडों से मेल खाने वाली कोई पुस्तक नहीं मिली।",
            
            // Recently Viewed
            recently_viewed_title: "हाल ही में देखी गई",
            no_recently_viewed: "आपने अभी तक कोई पुस्तक नहीं देखी है।",
            
            // Book Preview
            preview_rating: "रेटिंग",
            preview_published: "प्रकाशित",
            preview_language: "भाषा",
            preview_pages: "पृष्ठ",
            preview_description: "विवरण",
            preview_reviews: "समीक्षाएँ",
            preview_add_to_cart: "कार्ट में जोड़ें",
            preview_review_placeholder: "अपनी समीक्षा यहां लिखें...",
            preview_submit_review: "समीक्षा सबमिट करें",
            no_reviews: "अभी तक कोई समीक्षा नहीं। पहली समीक्षा छोड़ने वाले बनें!",
            
            // Newsletter
            newsletter_title: "हमारे न्यूज़लेटर की सदस्यता लें",
            newsletter_desc: "अपने इनबॉक्स में विशेष ऑफ़र, नई रिलीज़ और पढ़ने की सिफ़ारिशें प्राप्त करें।",
            newsletter_btn: "सदस्यता लें",
            newsletter_success_title: "सदस्यता के लिए धन्यवाद!",
            newsletter_success_message: "आपको हमारी मेलिंग सूची में सफलतापूर्वक जोड़ दिया गया है। विशेष ऑफ़र, नई रिलीज़ और पठन सिफ़ारिशों के लिए तैयार रहें।",
            newsletter_close: "बंद करें",
            
            // Banner Offers
            banner_title_0: "ग्रीष्मकालीन पठन बिक्री",
            banner_description_0: "इस गर्मी के मौसम में सभी पुस्तकों पर 20% की छूट पाएं!",
            banner_button_0: "अभी खरीदें",
            
            banner_title_1: "नई आवक",
            banner_description_1: "शीर्ष लेखकों की हमारी नवीनतम पुस्तकों का संग्रह देखें!",
            banner_button_1: "अन्वेषण करें",
            
            banner_title_2: "बुक क्लब स्पेशल",
            banner_description_2: "हमारे बुक क्लब में शामिल हों और विशेष छूट और नई रिलीज़ तक पहुंच प्राप्त करें!",
            banner_button_2: "अभी शामिल हों",
            
            // Cart
            cart_title: "आपकी शॉपिंग कार्ट",
            cart_empty: "आपकी कार्ट खाली है",
            cart_start_shopping: "शॉपिंग शुरू करें",
            cart_continue: "शॉपिंग जारी रखें",
            cart_checkout: "चेकआउट करें",
            cart_subtotal: "सबटोटल:",
            cart_tax: "कर (5%):",
            cart_shipping: "शिपिंग:",
            cart_free_shipping: "मुफ्त",
            cart_total: "कुल:",
            
            // Checkout
            checkout_title: "चेकआउट",
            checkout_shipping: "शिपिंग जानकारी",
            checkout_name: "पूरा नाम",
            checkout_email: "ईमेल पता",
            checkout_address: "पता",
            checkout_city: "शहर",
            checkout_state: "राज्य",
            checkout_zip: "पिन कोड",
            checkout_country: "देश",
            checkout_payment: "भुगतान जानकारी",
            checkout_card_name: "कार्ड पर नाम",
            checkout_card_number: "कार्ड नंबर",
            checkout_card_expiry: "समाप्ति तिथि",
            checkout_card_cvv: "CVV",
            checkout_place_order: "आदेश दें",
            
            // Order confirmation
            order_success: "आदेश सफलतापूर्वक दिया गया!",
            order_thank_you: "BookHaven पर खरीदारी करने के लिए धन्यवाद।",
            order_continue: "शॉपिंग जारी रखें",
            
            // Order status
            order_status_processing: "प्रक्रियाधीन",
            order_status_shipped: "भेज दिया गया",
            order_status_delivered: "पहुंचा दिया गया",
            
            // Auth forms
            login_tab: "लॉगिन",
            signup_tab: "साइन अप",
            login_email: "ईमेल",
            login_password: "पासवर्ड",
            login_remember: "मुझे याद रखें",
            login_btn: "लॉगिन",
            login_forgot: "पासवर्ड भूल गए?",
            
            signup_name: "पूरा नाम",
            signup_email: "ईमेल",
            signup_password: "पासवर्ड",
            signup_confirm: "पासवर्ड की पुष्टि करें",
            signup_terms: "मैं नियम और शर्तों से सहमत हूं",
            signup_btn: "साइन अप",
            
            // Dashboard
            dashboard_title: "मेरा खाता",
            dashboard_profile: "प्रोफ़ाइल",
            dashboard_wishlist: "विशलिस्ट",
            dashboard_orders: "आदेश",
            
            // Profile
            profile_personal_info: "व्यक्तिगत जानकारी",
            profile_name: "पूरा नाम",
            profile_email: "ईमेल",
            profile_phone: "फोन",
            profile_address: "पता",
            profile_address_line: "सड़क का पता",
            profile_city: "शहर",
            profile_state: "राज्य",
            profile_zip: "पिन कोड",
            profile_country: "देश",
            profile_save: "परिवर्तन सहेजें",
            
            // Wishlist
            wishlist_title: "मेरी विशलिस्ट",
            wishlist_empty: "आपकी विशलिस्ट खाली है",
            wishlist_start_shopping: "शॉपिंग शुरू करें",
            wishlist_add_to_cart: "कार्ट में जोड़ें",
            wishlist_remove: "हटाएँ",
            
            // Orders
            orders_title: "मेरे आदेश",
            orders_empty: "आपने अभी तक कोई आदेश नहीं दिया है",
            
            // Footer
            footer_about_title: "BookHaven के बारे में",
            footer_about_text: "BookHaven नई पुस्तकों, लेखकों और शैलियों की खोज के लिए आपका एक-स्टॉप गंतव्य है। हम पढ़ने को सभी के लिए सुलभ बनाने का लक्ष्य रखते हैं।",
            footer_quick_links: "त्वरित लिंक",
            footer_home: "होम",
            footer_categories: "श्रेणियाँ",
            footer_bestsellers: "बेस्टसेलर",
            footer_offers: "विशेष ऑफर",
            footer_help: "सहायता",
            footer_faq: "अक्सर पूछे जाने वाले प्रश्न",
            footer_shipping: "शिपिंग",
            footer_returns: "रिटर्न",
            footer_contact: "संपर्क करें",
            footer_follow: "हमें फॉलो करें",
            footer_rights: "सर्वाधिकार सुरक्षित।"
        },
        
        mai: {
            // Navigation
            nav_home: "होम",
            nav_categories: "श्रेणी सभ",
            nav_bestsellers: "बेस्टसेलर",
            nav_new_arrivals: "नव आयल",
            nav_offers: "विशेष ऑफर",
            nav_login: "लॉगिन",
            nav_dashboard: "डैशबोर्ड",
            
            // Categories
            categories_title: "श्रेणी अनुसार देखू",
            
            // Genre names
            genre_fiction: "कथा साहित्य",
            genre_nonfiction: "गैर-कथा साहित्य",
            genre_romance: "प्रेम कथा",
            genre_thriller: "थ्रिलर",
            genre_horror: "भयावह",
            genre_sad: "दुखद",
            genre_history: "इतिहास",
            genre_realistic: "यथार्थवादी",
            
            // Books section
            books_title: "हमर संग्रह",
            
            // Filters
            filter_genre: "विधा:",
            filter_price: "मूल्य:",
            filter_rating: "रेटिंग:",
            filter_all: "सभ",
            filter_under_10: "$10 सँ कम",
            filter_10_to_20: "$10 - $20",
            filter_20_to_30: "$20 - $30",
            filter_over_30: "$30 सँ बेसी",
            filter_4_plus: "4+ स्टार",
            filter_3_plus: "3+ स्टार",
            filter_2_plus: "2+ स्टार",
            
            // Search
            search_placeholder: "पुस्तक, लेखक खोजू...",
            no_books_found: "अहाँक मापदंड सँ मेल खाएबला कोनो पुस्तक नै भेटल।",
            
            // Recently Viewed
            recently_viewed_title: "हाल मे देखल गेल",
            no_recently_viewed: "अहाँ अखन तक कोनो पुस्तक नै देखने छी।",
            
            // Book Preview
            preview_rating: "रेटिंग",
            preview_published: "प्रकाशित",
            preview_language: "भाषा",
            preview_pages: "पृष्ठ",
            preview_description: "विवरण",
            preview_reviews: "समीक्षा",
            preview_add_to_cart: "कार्ट मे जोड़ू",
            preview_review_placeholder: "अपन समीक्षा एतय लिखू...",
            preview_submit_review: "समीक्षा जमा करू",
            no_reviews: "अखन तक कोनो समीक्षा नै अछि। पहिल समीक्षा देबय वाला बनू!",
            
            // Newsletter
            newsletter_title: "हमर न्यूज़लेटर क सदस्यता लिअ",
            newsletter_desc: "अपन इनबॉक्स मे विशेष ऑफ़र, नया रिलीज आ पढ़बाक सिफ़ारिश प्राप्त करू।",
            newsletter_btn: "सदस्यता लिअ",
            newsletter_success_title: "सदस्यता लेबाक लेल धन्यवाद!",
            newsletter_success_message: "अहाँकेँ हमर मेलिंग सूची मे सफलतापूर्वक जोड़ि देल गेल अछि। विशेष ऑफ़र, नया रिलीज आ पढ़बाक सिफ़ारिश लेल तैयार रहू।",
            newsletter_close: "बंद करू",
            
            // Banner Offers
            banner_title_0: "गर्मीक पढ़बाक बिक्री",
            banner_description_0: "एहि गर्मीक मौसम मे सभ पुस्तक पर 20% क छूट पाउ!",
            banner_button_0: "अखने खरीदू",
            
            banner_title_1: "नया आयल",
            banner_description_1: "प्रसिद्ध लेखक सभक हमर नवीनतम पुस्तक संग्रह देखू!",
            banner_button_1: "देखू",
            
            banner_title_2: "बुक क्लब स्पेशल",
            banner_description_2: "हमर बुक क्लब मे सम्मिलित होउ आ विशेष छूट आ नया रिलीज़ तक पहुँच प्राप्त करू!",
            banner_button_2: "अखने सम्मिलित होउ",
            
            // Cart
            cart_title: "अहाँक शॉपिंग कार्ट",
            cart_empty: "अहाँक कार्ट खाली अछि",
            cart_start_shopping: "शॉपिंग शुरू करू",
            cart_continue: "शॉपिंग जारी राखू",
            cart_checkout: "चेकआउट करू",
            cart_subtotal: "सबटोटल:",
            cart_tax: "कर (5%):",
            cart_shipping: "शिपिंग:",
            cart_free_shipping: "मुफ्त",
            cart_total: "कुल:",
            
            // Checkout
            checkout_title: "चेकआउट",
            checkout_shipping: "शिपिंग जानकारी",
            checkout_name: "पूरा नाम",
            checkout_email: "ईमेल पता",
            checkout_address: "पता",
            checkout_city: "शहर",
            checkout_state: "राज्य",
            checkout_zip: "पिन कोड",
            checkout_country: "देश",
            checkout_payment: "भुगतान जानकारी",
            checkout_card_name: "कार्ड पर नाम",
            checkout_card_number: "कार्ड नंबर",
            checkout_card_expiry: "समाप्ति तिथि",
            checkout_card_cvv: "CVV",
            checkout_place_order: "आदेश दिअ",
            
            // Order confirmation
            order_success: "आदेश सफलतापूर्वक देल गेल!",
            order_thank_you: "BookHaven पर खरीदारी करबाक लेल धन्यवाद।",
            order_continue: "शॉपिंग जारी राखू",
            
            // Order status
            order_status_processing: "प्रक्रियाधीन",
            order_status_shipped: "भेजि देल गेल",
            order_status_delivered: "पहुँचा देल गेल",
            
            // Auth forms
            login_tab: "लॉगिन",
            signup_tab: "साइन अप",
            login_email: "ईमेल",
            login_password: "पासवर्ड",
            login_remember: "हमरा मोन राखू",
            login_btn: "लॉगिन",
            login_forgot: "पासवर्ड बिसरि गेल?",
            
            signup_name: "पूरा नाम",
            signup_email: "ईमेल",
            signup_password: "पासवर्ड",
            signup_confirm: "पासवर्ड फेर सँ लिखू",
            signup_terms: "हम नियम आ शर्त सँ सहमत छी",
            signup_btn: "साइन अप",
            
            // Dashboard
            dashboard_title: "हमर खाता",
            dashboard_profile: "प्रोफ़ाइल",
            dashboard_wishlist: "विशलिस्ट",
            dashboard_orders: "आदेश",
            
            // Profile
            profile_personal_info: "व्यक्तिगत जानकारी",
            profile_name: "पूरा नाम",
            profile_email: "ईमेल",
            profile_phone: "फोन",
            profile_address: "पता",
            profile_address_line: "सड़क पता",
            profile_city: "शहर",
            profile_state: "राज्य",
            profile_zip: "पिन कोड",
            profile_country: "देश",
            profile_save: "परिवर्तन सहेजू",
            
            // Wishlist
            wishlist_title: "हमर विशलिस्ट",
            wishlist_empty: "अहाँक विशलिस्ट खाली अछि",
            wishlist_start_shopping: "शॉपिंग शुरू करू",
            wishlist_add_to_cart: "कार्ट मे जोड़ू",
            wishlist_remove: "हटाउ",
            
            // Orders
            orders_title: "हमर आदेश",
            orders_empty: "अहाँ अखन तक कोनो आदेश नै देने छी",
            
            // Footer
            footer_about_title: "BookHaven क बारे मे",
            footer_about_text: "BookHaven नया पुस्तक, लेखक आ शैली क खोज क लेल अहाँक एक-स्टॉप गंतव्य अछि। हम पढ़बाक सभ लेल सुलभ बनेबाक लक्ष्य रखैत छी।",
            footer_quick_links: "त्वरित लिंक",
            footer_home: "होम",
            footer_categories: "श्रेणी सभ",
            footer_bestsellers: "बेस्टसेलर",
            footer_offers: "विशेष ऑफर",
            footer_help: "मदद",
            footer_faq: "अक्सर पूछल जाएबला प्रश्न",
            footer_shipping: "शिपिंग",
            footer_returns: "रिटर्न",
            footer_contact: "संपर्क करू",
            footer_follow: "हमरा फॉलो करू",
            footer_rights: "सभ अधिकार सुरक्षित।"
        }
    };
    
    // Set the language and update page content
    const setLanguage = function(lang) {
        if (!translations[lang]) {
            console.error(`Language ${lang} is not supported`);
            return;
        }
        
        currentLanguage = lang;
        translatePage();
    };
    
    // Translate the entire page
    const translatePage = function() {
        const elements = document.querySelectorAll('[data-i18n]');
        translateElements(elements);
        
        // Also translate placeholders
        const elementsWithPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');
        elementsWithPlaceholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[currentLanguage][key]) {
                el.setAttribute('placeholder', translations[currentLanguage][key]);
            }
        });
    };
    
    // Translate specific elements
    const translateElements = function(elements) {
        if (!elements) return;
        
        // Convert NodeList or single element to array
        const elementsArray = elements.length ? 
            Array.from(elements) : 
            (elements.getAttribute ? [elements] : []);
        
        elementsArray.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key && translations[currentLanguage][key]) {
                el.textContent = translations[currentLanguage][key];
            }
        });
    };
    
    // Get translation for a specific key
    const getTranslation = function(key) {
        return translations[currentLanguage][key] || key;
    };
    
    // Public API
    return {
        init: function() {
            // Get saved language or use default
            const savedLanguage = localStorage.getItem('language') || 'en';
            setLanguage(savedLanguage);
        },
        setLanguage: setLanguage,
        translateElements: translateElements,
        getTranslation: getTranslation,
        getCurrentLanguage: function() {
            return currentLanguage;
        },
        getSupportedLanguages: function() {
            return Object.keys(translations);
        }
    };
})();

// Initialize the i18n module when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    i18nModule.init();
});
