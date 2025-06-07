/**
 * Books Data and Book-related Functionality
 * Contains the book data and functions for managing books display, filtering, and pagination
 */

// Cover image cache for storing loaded images
const coverImageCache = new Map();

/**
 * Function to fetch book cover from Open Library API
 * @param {string} title - Book title
 * @param {string} author - Book author
 * @returns {Promise<string>} - Cover image URL or null
 */
const fetchBookCover = async (title, author) => {
    try {
        // Use Open Library search API
        const searchQuery = `${title} ${author}`.replace(/\s+/g, '+');
        const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=1`);
        const data = await response.json();
        
        if (data.docs && data.docs.length > 0) {
            const book = data.docs[0];
            if (book.cover_i) {
                return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            }
        }
        return null;
    } catch (error) {
        console.warn('Error fetching cover for:', title, error);
        return null;
    }
};

/**
 * Function to load cover image with fallback
 * @param {string} bookId - Book ID
 * @param {string} title - Book title
 * @param {string} author - Book author
 * @returns {Promise<string>} - Cover image URL
 */
const loadCoverImage = async (bookId, title, author) => {
    // Check cache first
    if (coverImageCache.has(bookId)) {
        return coverImageCache.get(bookId);
    }
    
    // Check if we have predefined cover URLs in img.js
    if (typeof window !== 'undefined' && window.bookCoversModule) {
        const coverData = window.bookCoversModule.getBookCoverWithFallback(bookId);
        if (coverData && coverData.cover) {
            // Test if the primary cover loads
            try {
                const img = new Image();
                img.src = coverData.cover;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    setTimeout(reject, 5000); // 5 second timeout
                });
                coverImageCache.set(bookId, coverData.cover);
                return coverData.cover;
            } catch (error) {
                // Try fallback
                if (coverData.fallback) {
                    try {
                        const fallbackImg = new Image();
                        fallbackImg.src = coverData.fallback;
                        await new Promise((resolve, reject) => {
                            fallbackImg.onload = resolve;
                            fallbackImg.onerror = reject;
                            setTimeout(reject, 5000);
                        });
                        coverImageCache.set(bookId, coverData.fallback);
                        return coverData.fallback;
                    } catch (fallbackError) {
                        console.warn('Both primary and fallback covers failed for:', bookId);
                    }
                }
            }
        }
    }
    
    // Try fetching from API as last resort
    const apiCover = await fetchBookCover(title, author);
    if (apiCover) {
        coverImageCache.set(bookId, apiCover);
        return apiCover;
    }
    
    // Return null if no cover found
    return null;
};

// Book data with multiple books per genre (15-20 books per genre)
const booksData = [
    // Fiction Books
    {
        id: "fiction-1",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Fiction",
        subgenre: "Psychological Thriller",
        price: 14.99,
        rating: 4.6,
        ratingCount: 4832,
        description: "A psychological thriller about a woman's act of violence against her husband and her subsequent silence. This debut novel explores themes of psychology, betrayal, and the power of trauma in shaping our lives.",
        publishedDate: "2019-02-05",
        language: "English",
        pages: 336,
        coverColor: "#3a506b"
    },
    {
        id: "fiction-2",
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        genre: "Fiction",
        subgenre: "Literary Fiction",
        price: 16.99,
        rating: 4.8,
        ratingCount: 7896,
        description: "A compelling story of a young woman growing up in isolation in the marshes of North Carolina, suspected of a murder in her community. The novel blends mystery and coming-of-age narratives with beautiful nature writing.",
        publishedDate: "2018-08-14",
        language: "English",
        pages: 384,
        coverColor: "#68b0ab"
    },
    {
        id: "fiction-3",
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Fiction",
        subgenre: "Fantasy",
        price: 13.99,
        rating: 4.5,
        ratingCount: 3587,
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived, to see how things would be if you had made other choices.",
        publishedDate: "2020-09-29",
        language: "English",
        pages: 304,
        coverColor: "#1d3557"
    },
    {
        id: "fiction-4",
        title: "The Vanishing Half",
        author: "Brit Bennett",
        genre: "Fiction",
        subgenre: "Historical Fiction",
        price: 15.99,
        rating: 4.4,
        ratingCount: 2891,
        description: "The story follows the lives of twin sisters who run away from their small, southern black community at age sixteen. Years later, one sister lives with her black daughter in the same southern town, while the other secretly passes for white.",
        publishedDate: "2020-06-02",
        language: "English",
        pages: 352,
        coverColor: "#f4acb7"
    },
    {
        id: "fiction-5",
        title: "The Night Circus",
        author: "Erin Morgenstern",
        genre: "Fiction",
        subgenre: "Fantasy",
        price: 12.99,
        rating: 4.3,
        ratingCount: 4267,
        description: "A competition between two young magicians, Celia and Marco, who have been trained since childhood expressly for this purpose by their mercurial instructors. Unbeknownst to them, this is a game in which only one can be left standing.",
        publishedDate: "2011-09-13",
        language: "English",
        pages: 516,
        coverColor: "#000000"
    },
    {
        id: "fiction-6",
        title: "Normal People",
        author: "Sally Rooney",
        genre: "Fiction",
        subgenre: "Contemporary Fiction",
        price: 11.99,
        rating: 4.2,
        ratingCount: 3018,
        description: "A tender story about the complexities of young love and connection. Connell and Marianne grow up in the same small town in Ireland but come from vastly different backgrounds. Their relationship spans years as they navigate the challenges of adulthood.",
        publishedDate: "2018-08-28",
        language: "English",
        pages: 273,
        coverColor: "#a0c4ff"
    },
    {
        id: "fiction-7",
        title: "The Dutch House",
        author: "Ann Patchett",
        genre: "Fiction",
        subgenre: "Family Saga",
        price: 14.99,
        rating: 4.3,
        ratingCount: 2574,
        description: "The story spans five decades and explores the bond between siblings Danny and Maeve, who are exiled from their childhood home by their stepmother following their father's death. The novel deals with themes of family, forgiveness, and the meaning of home.",
        publishedDate: "2019-09-24",
        language: "English",
        pages: 352,
        coverColor: "#f9c74f"
    },
    {
        id: "fiction-8",
        title: "Circe",
        author: "Madeline Miller",
        genre: "Fiction",
        subgenre: "Mythology",
        price: 15.99,
        rating: 4.7,
        ratingCount: 3842,
        description: "A bold retelling of the story of Circe, the sorceress from Homer's Odyssey, who transforms from an awkward nymph to a formidable witch. This feminist tale combines mythology with a modern sensibility.",
        publishedDate: "2018-04-10",
        language: "English",
        pages: 400,
        coverColor: "#efd9ce"
    },
    {
        id: "fiction-9",
        title: "Hamnet",
        author: "Maggie O'Farrell",
        genre: "Fiction",
        subgenre: "Historical Fiction",
        price: 16.99,
        rating: 4.5,
        ratingCount: 2197,
        description: "A fictional account of Shakespeare's family life, focused on the death of his son Hamnet from the plague and the profound impact this had on his work, particularly the writing of 'Hamlet.'",
        publishedDate: "2020-03-31",
        language: "English",
        pages: 320,
        coverColor: "#2ec4b6"
    },
    {
        id: "fiction-10",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        genre: "Fiction",
        subgenre: "Science Fiction",
        price: 17.99,
        rating: 4.3,
        ratingCount: 1987,
        description: "Told from the perspective of Klara, an Artificial Friend with outstanding observational qualities, who watches customers come and go, all hoping to find a perfect companion. The novel explores complex questions about what it means to love.",
        publishedDate: "2021-03-02",
        language: "English",
        pages: 320,
        coverColor: "#ffb703"
    },
    {
        id: "fiction-11",
        title: "The Overstory",
        author: "Richard Powers",
        genre: "Fiction",
        subgenre: "Literary Fiction",
        price: 15.99,
        rating: 4.4,
        ratingCount: 2765,
        description: "A sweeping, impassioned novel about trees and people who understand their connection to them. The stories of nine Americans brought together by their experiences with trees culminate in environmental activism.",
        publishedDate: "2018-04-03",
        language: "English",
        pages: 512,
        coverColor: "#588157"
    },
    {
        id: "fiction-12",
        title: "The Song of Achilles",
        author: "Madeline Miller",
        genre: "Fiction",
        subgenre: "Mythology",
        price: 14.99,
        rating: 4.6,
        ratingCount: 3187,
        description: "A retelling of Homer's Iliad from the perspective of Patroclus, focusing on his relationship with the legendary warrior Achilles. The novel reimagines the ancient story with a focus on the deep bond between the two men.",
        publishedDate: "2011-09-20",
        language: "English",
        pages: 416,
        coverColor: "#e07a5f"
    },
    {
        id: "fiction-13",
        title: "On Earth We're Briefly Gorgeous",
        author: "Ocean Vuong",
        genre: "Fiction",
        subgenre: "Literary Fiction",
        price: 13.99,
        rating: 4.2,
        ratingCount: 1823,
        description: "A letter from a son to a mother who cannot read, this novel unearths the family's history rooted in Vietnam and serves as a doorway into parts of the son's life his mother has never known.",
        publishedDate: "2019-06-04",
        language: "English",
        pages: 256,
        coverColor: "#adb5bd"
    },
    {
        id: "fiction-14",
        title: "The Water Dancer",
        author: "Ta-Nehisi Coates",
        genre: "Fiction",
        subgenre: "Historical Fiction",
        price: 15.99,
        rating: 4.1,
        ratingCount: 2146,
        description: "A young enslaved man with magical powers joins the underground railroad to rescue others from bondage. This debut novel combines elements of magical realism with a powerful narrative about American slavery.",
        publishedDate: "2019-09-24",
        language: "English",
        pages: 416,
        coverColor: "#184e77"
    },
    {
        id: "fiction-15",
        title: "The Great Alone",
        author: "Kristin Hannah",
        genre: "Fiction",
        subgenre: "Historical Fiction",
        price: 14.99,
        rating: 4.5,
        ratingCount: 3254,
        description: "In 1974, a family moves to the remote wilderness of Alaska to start a new life. As winter approaches and darkness descends, the family's fragile mental state and the perils of their isolated lifestyle begin to take their toll.",
        publishedDate: "2018-02-06",
        language: "English",
        pages: 448,
        coverColor: "#6c757d"
    },

    // Non-fiction Books
    {
        id: "nonfiction-1",
        title: "Educated",
        author: "Tara Westover",
        genre: "Non-fiction",
        subgenre: "Memoir",
        price: 14.99,
        rating: 4.7,
        ratingCount: 5289,
        description: "A memoir about growing up in a survivalist family in Idaho and the author's journey to education, culminating in a PhD from Cambridge University. The book explores themes of self-invention, family loyalty, and the grief of losing one's family.",
        publishedDate: "2018-02-20",
        language: "English",
        pages: 334,
        coverColor: "#7f5539"
    },
    {
        id: "nonfiction-2",
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "Non-fiction",
        subgenre: "History",
        price: 17.99,
        rating: 4.6,
        ratingCount: 6783,
        description: "A sweeping narrative of human history, from the emergence of Homo sapiens to the twenty-first century. The book examines the course of human evolution, the agricultural and scientific revolutions, and the creation of religions and nations.",
        publishedDate: "2014-02-10",
        language: "English",
        pages: 464,
        coverColor: "#335c67"
    },
    {
        id: "nonfiction-3",
        title: "Becoming",
        author: "Michelle Obama",
        genre: "Non-fiction",
        subgenre: "Autobiography",
        price: 18.99,
        rating: 4.8,
        ratingCount: 7821,
        description: "The former First Lady's memoir chronicles her life journey from her childhood in Chicago to her time spent at the White House. She shares personal insights into her triumphs and disappointments, both public and private.",
        publishedDate: "2018-11-13",
        language: "English",
        pages: 448,
        coverColor: "#ffffff"
    },
    {
        id: "nonfiction-4",
        title: "The Body: A Guide for Occupants",
        author: "Bill Bryson",
        genre: "Non-fiction",
        subgenre: "Science",
        price: 16.99,
        rating: 4.5,
        ratingCount: 3176,
        description: "An exploration of the human body, from how we grow and age to how we fight disease. Bryson's engaging style makes complex biology accessible and entertaining, filled with curious facts about our physical form.",
        publishedDate: "2019-10-15",
        language: "English",
        pages: 464,
        coverColor: "#f8961e"
    },
    {
        id: "nonfiction-5",
        title: "Maybe You Should Talk to Someone",
        author: "Lori Gottlieb",
        genre: "Non-fiction",
        subgenre: "Psychology",
        price: 15.99,
        rating: 4.6,
        ratingCount: 2987,
        description: "A therapist's revealing account of her experiences as both a clinician and a patient. The book offers a behind-the-scenes look at the therapeutic process and explores universal questions about human connection.",
        publishedDate: "2019-04-02",
        language: "English",
        pages: 432,
        coverColor: "#cce3de"
    },
    {
        id: "nonfiction-6",
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Non-fiction",
        subgenre: "Self-Help",
        price: 13.99,
        rating: 4.8,
        ratingCount: 4276,
        description: "A comprehensive guide on how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. Clear presents practical strategies rooted in biology and psychology.",
        publishedDate: "2018-10-16",
        language: "English",
        pages: 320,
        coverColor: "#264653"
    },
    {
        id: "nonfiction-7",
        title: "Bad Blood",
        author: "John Carreyrou",
        genre: "Non-fiction",
        subgenre: "Business",
        price: 14.99,
        rating: 4.7,
        ratingCount: 3254,
        description: "The full inside story of the breathtaking rise and shocking collapse of Theranos, the one-time multibillion-dollar biotech startup founded by Elizabeth Holmes, by the prize-winning journalist who first broke the story.",
        publishedDate: "2018-05-21",
        language: "English",
        pages: 352,
        coverColor: "#e63946"
    },
    {
        id: "nonfiction-8",
        title: "Born a Crime",
        author: "Trevor Noah",
        genre: "Non-fiction",
        subgenre: "Memoir",
        price: 14.99,
        rating: 4.8,
        ratingCount: 4198,
        description: "A compelling, inspiring, and comedic memoir about Trevor Noah's coming-of-age during the twilight of apartheid in South Africa and the tumultuous days of freedom that followed.",
        publishedDate: "2016-11-15",
        language: "English",
        pages: 304,
        coverColor: "#f6bd60"
    },
    {
        id: "nonfiction-9",
        title: "The Immortal Life of Henrietta Lacks",
        author: "Rebecca Skloot",
        genre: "Non-fiction",
        subgenre: "Science",
        price: 13.99,
        rating: 4.6,
        ratingCount: 3542,
        description: "The story of Henrietta Lacks, a woman whose cells—known as HeLa cells—were taken without her knowledge and became one of the most important tools in medicine. The book explores issues of ethics, race, and medicine.",
        publishedDate: "2010-02-02",
        language: "English",
        pages: 384,
        coverColor: "#a4133c"
    },
    {
        id: "nonfiction-10",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Non-fiction",
        subgenre: "Psychology",
        price: 16.99,
        rating: 4.5,
        ratingCount: 4732,
        description: "A groundbreaking exploration of human thought processes by Nobel Prize-winning psychologist Daniel Kahneman. The book examines the two systems that drive the way we think and make choices: fast, intuitive thinking, and slow, rational thinking.",
        publishedDate: "2011-10-25",
        language: "English",
        pages: 512,
        coverColor: "#f4a261"
    },
    {
        id: "nonfiction-11",
        title: "A Promised Land",
        author: "Barack Obama",
        genre: "Non-fiction",
        subgenre: "Autobiography",
        price: 19.99,
        rating: 4.7,
        ratingCount: 3957,
        description: "The first volume of former President Barack Obama's presidential memoirs, chronicling his political journey, the landmark moments of his first term, and reflections on the politics and diplomacy of his time in office.",
        publishedDate: "2020-11-17",
        language: "English",
        pages: 768,
        coverColor: "#3d5a80"
    },
    {
        id: "nonfiction-12",
        title: "Quiet: The Power of Introverts",
        author: "Susan Cain",
        genre: "Non-fiction",
        subgenre: "Psychology",
        price: 12.99,
        rating: 4.5,
        ratingCount: 3854,
        description: "An exploration of the importance and value of introverts in a world that often prizes extroversion. The book challenges the dominant belief that the ideal self is gregarious and offers insights into the power of quiet influence.",
        publishedDate: "2012-01-24",
        language: "English",
        pages: 368,
        coverColor: "#a8dadc"
    },
    {
        id: "nonfiction-13",
        title: "The Code Breaker",
        author: "Walter Isaacson",
        genre: "Non-fiction",
        subgenre: "Biography",
        price: 17.99,
        rating: 4.6,
        ratingCount: 2134,
        description: "The story of Jennifer Doudna and her colleagues who developed CRISPR, a revolutionary gene-editing tool. The book explores the bioethical questions this breakthrough raises about humans controlling their own evolution.",
        publishedDate: "2021-03-09",
        language: "English",
        pages: 560,
        coverColor: "#1e88e5"
    },
    {
        id: "nonfiction-14",
        title: "How to Be an Antiracist",
        author: "Ibram X. Kendi",
        genre: "Non-fiction",
        subgenre: "Social Science",
        price: 15.99,
        rating: 4.7,
        ratingCount: 2876,
        description: "A combination of memoir and social criticism that examines racism in America and offers proposals for antiracist individual actions and systemic changes. The book aims to reshape the conversation about racial justice.",
        publishedDate: "2019-08-13",
        language: "English",
        pages: 320,
        coverColor: "#212529"
    },
    {
        id: "nonfiction-15",
        title: "The Year of Magical Thinking",
        author: "Joan Didion",
        genre: "Non-fiction",
        subgenre: "Memoir",
        price: 13.99,
        rating: 4.4,
        ratingCount: 2547,
        description: "A powerful memoir about grief following the death of Didion's husband and the serious illness of her daughter. The book examines the year of 'magical thinking' that followed these traumatic events.",
        publishedDate: "2005-10-04",
        language: "English",
        pages: 240,
        coverColor: "#ced4da"
    },

    // Romance Books
    {
        id: "romance-1",
        title: "The Hating Game",
        author: "Sally Thorne",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 12.99,
        rating: 4.7,
        ratingCount: 3254,
        description: "A delicious, hilarious, and addictive workplace romantic comedy about two executive assistants who hate each other but find their feelings complicated by competition for the same promotion.",
        publishedDate: "2016-08-09",
        language: "English",
        pages: 384,
        coverColor: "#f72585"
    },
    {
        id: "romance-2",
        title: "Red, White & Royal Blue",
        author: "Casey McQuiston",
        genre: "Romance",
        subgenre: "LGBTQ+ Romance",
        price: 13.99,
        rating: 4.5,
        ratingCount: 4198,
        description: "When the son of America's first female president falls in love with the Prince of Wales, their relationship threatens to upend two nations and might be the end of his mother's reelection campaign.",
        publishedDate: "2019-05-14",
        language: "English",
        pages: 432,
        coverColor: "#4361ee"
    },
    {
        id: "romance-3",
        title: "The Notebook",
        author: "Nicholas Sparks",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 11.99,
        rating: 4.6,
        ratingCount: 5876,
        description: "A poignant and emotionally charged love story about a couple from different backgrounds who fall deeply in love during the summer of 1940, are separated by World War II, and then find their way back to each other years later.",
        publishedDate: "1996-10-01",
        language: "English",
        pages: 224,
        coverColor: "#023e8a"
    },
    {
        id: "romance-4",
        title: "Outlander",
        author: "Diana Gabaldon",
        genre: "Romance",
        subgenre: "Historical Romance",
        price: 15.99,
        rating: 4.7,
        ratingCount: 6784,
        description: "Claire Randall, a former combat nurse, walks through a standing stone circle in the British Isles and is transported back in time to 1743. There she finds adventure and romance with the dashing Jamie Fraser.",
        publishedDate: "1991-06-01",
        language: "English",
        pages: 864,
        coverColor: "#5e503f"
    },
    {
        id: "romance-5",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        subgenre: "Classic Romance",
        price: 9.99,
        rating: 4.8,
        ratingCount: 8765,
        description: "A classic of English literature that follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
        publishedDate: "1813-01-28",
        language: "English",
        pages: 432,
        coverColor: "#ccd5ae"
    },
    {
        id: "romance-6",
        title: "Beach Read",
        author: "Emily Henry",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 13.99,
        rating: 4.5,
        ratingCount: 2987,
        description: "A romance writer who no longer believes in love and a literary writer stuck in a rut engage in a summer-long challenge that may just upend everything they believe about happily ever afters.",
        publishedDate: "2020-05-19",
        language: "English",
        pages: 384,
        coverColor: "#ffb4a2"
    },
    {
        id: "romance-7",
        title: "Get a Life, Chloe Brown",
        author: "Talia Hibbert",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 12.99,
        rating: 4.4,
        ratingCount: 2165,
        description: "Chloe Brown, a chronically ill computer geek, is determined to 'get a life' by crafting a list of naughty experiences she wants to complete. She enlists the help of her apartment building's superintendent, who happens to be just the right kind of trouble.",
        publishedDate: "2019-11-05",
        language: "English",
        pages: 384,
        coverColor: "#9d4edd"
    },
    {
        id: "romance-8",
        title: "The Kiss Quotient",
        author: "Helen Hoang",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 13.99,
        rating: 4.3,
        ratingCount: 3215,
        description: "Stella Lane, a brilliant mathematician with Asperger's, hires an escort to help her gain relationship experience. As their no-nonsense partnership starts to make a strange kind of sense, Stella must learn what to make of her intense attraction to him.",
        publishedDate: "2018-06-05",
        language: "English",
        pages: 336,
        coverColor: "#ff758f"
    },
    {
        id: "romance-9",
        title: "The Unhoneymooners",
        author: "Christina Lauren",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 12.99,
        rating: 4.4,
        ratingCount: 2876,
        description: "When an entire wedding party gets food poisoning, the bride's sister Olive and the groom's brother Ethan—sworn enemies—find themselves on a tropical honeymoon together, each determined to avoid the other at all costs.",
        publishedDate: "2019-05-14",
        language: "English",
        pages: 432,
        coverColor: "#2ec4b6"
    },
    {
        id: "romance-10",
        title: "Me Before You",
        author: "Jojo Moyes",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 13.99,
        rating: 4.6,
        ratingCount: 5432,
        description: "Louisa Clark takes a job caring for Will Traynor, a formerly successful and vibrant man who is now wheelchair-bound after an accident. As they grow closer, Louisa becomes determined to show Will that life is still worth living.",
        publishedDate: "2012-12-31",
        language: "English",
        pages: 400,
        coverColor: "#e0aaff"
    },
    {
        id: "romance-11",
        title: "The Bride Test",
        author: "Helen Hoang",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 12.99,
        rating: 4.3,
        ratingCount: 2187,
        description: "Khai Diep's autism means he processes emotions differently, leading him to believe he has no heart. His mother returns to Vietnam to find him the perfect bride, bringing Esme Tran to America for a chance at a better life and potential love.",
        publishedDate: "2019-05-07",
        language: "English",
        pages: 320,
        coverColor: "#ffc2d1"
    },
    {
        id: "romance-12",
        title: "From Lukov with Love",
        author: "Mariana Zapata",
        genre: "Romance",
        subgenre: "Sports Romance",
        price: 14.99,
        rating: 4.5,
        ratingCount: 1897,
        description: "Figure skater Jasmine Santos has spent her career being overlooked. When her longtime rival Ivan Lukov offers to be her partner, she reluctantly agrees, setting the stage for a slow-burning romance on and off the ice.",
        publishedDate: "2018-02-01",
        language: "English",
        pages: 493,
        coverColor: "#4cc9f0"
    },
    {
        id: "romance-13",
        title: "The Flatshare",
        author: "Beth O'Leary",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 13.99,
        rating: 4.5,
        ratingCount: 2543,
        description: "Tiffy and Leon share a flat, and a bed, but have never met. She works days as a book publisher, he works nights as a hospice nurse, and they communicate through notes. As their correspondence grows, so does their connection.",
        publishedDate: "2019-04-10",
        language: "English",
        pages: 336,
        coverColor: "#ffd166"
    },
    {
        id: "romance-14",
        title: "Love and Other Words",
        author: "Christina Lauren",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 12.99,
        rating: 4.4,
        ratingCount: 2111,
        description: "A story about childhood friends-turned-lovers who reconnect after years apart. Alternating between past and present, this emotional romance explores how our words shape our lives and how love persists across time.",
        publishedDate: "2018-04-10",
        language: "English",
        pages: 432,
        coverColor: "#ff9e00"
    },
    {
        id: "romance-15",
        title: "The Wedding Date",
        author: "Jasmine Guillory",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 11.99,
        rating: 4.1,
        ratingCount: 1987,
        description: "When a doctor needs a last-minute date to his ex's wedding, he asks a stranger he meets in a broken elevator. Their pretend relationship turns into something more real and complex as they navigate long-distance romance.",
        publishedDate: "2018-01-30",
        language: "English",
        pages: 320,
        coverColor: "#fb6f92"
    },

    // Thriller Books
    {
        id: "thriller-1",
        title: "Gone Girl",
        author: "Gillian Flynn",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 14.99,
        rating: 4.5,
        ratingCount: 6543,
        description: "On their fifth wedding anniversary, Nick Dunne reports that his wife Amy has gone missing. Under pressure from the police and growing media frenzy, Nick's portrait of a blissful union begins to crumble as lies, deceits, and strange behavior emerge.",
        publishedDate: "2012-05-24",
        language: "English",
        pages: 432,
        coverColor: "#003049"
    },
    {
        id: "thriller-2",
        title: "The Girl on the Train",
        author: "Paula Hawkins",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 13.99,
        rating: 4.3,
        ratingCount: 5412,
        description: "Rachel takes the same commuter train every day, fantasizing about the seemingly perfect couple she sees in a house by the tracks. One day, she witnesses something shocking and becomes entangled in a missing person investigation.",
        publishedDate: "2015-01-13",
        language: "English",
        pages: 336,
        coverColor: "#6c757d"
    },
    {
        id: "thriller-3",
        title: "The Woman in the Window",
        author: "A.J. Finn",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 14.99,
        rating: 4.2,
        ratingCount: 3876,
        description: "Anna Fox lives alone, a recluse in her New York City home, drinking too much wine, watching old movies, and spying on her neighbors. When she witnesses something she shouldn't, her world begins to crumble.",
        publishedDate: "2018-01-02",
        language: "English",
        pages: 464,
        coverColor: "#343a40"
    },
    {
        id: "thriller-4",
        title: "The Guest List",
        author: "Lucy Foley",
        genre: "Thriller",
        subgenre: "Mystery Thriller",
        price: 15.99,
        rating: 4.4,
        ratingCount: 2987,
        description: "On a remote Irish island, the wedding of a rising TV star and a magazine publisher brings together a group of people with complicated histories. As a storm approaches and the festivities begin, someone ends up dead.",
        publishedDate: "2020-06-02",
        language: "English",
        pages: 336,
        coverColor: "#495057"
    },
    {
        id: "thriller-5",
        title: "Before I Go to Sleep",
        author: "S.J. Watson",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 12.99,
        rating: 4.1,
        ratingCount: 3215,
        description: "Christine wakes up every morning with no memory of her life since a traumatic accident. Through a journal she keeps, she begins to piece together the truth about her life, her marriage, and the accident that stole her memory.",
        publishedDate: "2011-06-14",
        language: "English",
        pages: 368,
        coverColor: "#212529"
    },
    {
        id: "thriller-6",
        title: "The Last Mrs. Parrish",
        author: "Liv Constantine",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 13.99,
        rating: 4.3,
        ratingCount: 2345,
        description: "Amber Patterson is tired of being a nobody, so she devises a plan to befriend Daphne Parrish, the kind of woman Amber wants to be: wealthy, elegant, and married to Jackson Parrish. But things are not what they seem in this twisted tale of jealousy and deception.",
        publishedDate: "2017-10-17",
        language: "English",
        pages: 400,
        coverColor: "#774936"
    },
    {
        id: "thriller-7",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 14.99,
        rating: 4.6,
        ratingCount: 4832,
        description: "A psychological thriller about a woman's act of violence against her husband and her subsequent silence. This debut novel explores themes of psychology, betrayal, and the power of trauma in shaping our lives.",
        publishedDate: "2019-02-05",
        language: "English",
        pages: 336,
        coverColor: "#3a506b"
    },
    {
        id: "thriller-8",
        title: "Sharp Objects",
        author: "Gillian Flynn",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 13.99,
        rating: 4.4,
        ratingCount: 3765,
        description: "Reporter Camille Preaker returns to her hometown to cover the murders of two preteen girls. As she reconnects with her estranged family, she uncovers psychological puzzles from her past that are connected to the crimes.",
        publishedDate: "2006-09-26",
        language: "English",
        pages: 272,
        coverColor: "#5e548e"
    },
    {
        id: "thriller-9",
        title: "The Wife Between Us",
        author: "Greer Hendricks & Sarah Pekkanen",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 14.99,
        rating: 4.2,
        ratingCount: 2876,
        description: "A novel of suspense that explores the complexities of marriage and the dangerous truths we ignore in the name of love. The story follows a woman seemingly obsessed with her ex-husband's new fiancée.",
        publishedDate: "2018-01-09",
        language: "English",
        pages: 352,
        coverColor: "#dee2e6"
    },
    {
        id: "thriller-10",
        title: "The Hunting Party",
        author: "Lucy Foley",
        genre: "Thriller",
        subgenre: "Mystery Thriller",
        price: 14.99,
        rating: 4.3,
        ratingCount: 2198,
        description: "A group of old college friends ring in the New Year at an isolated estate in the Scottish Highlands. Two days later, one of them is dead. This atmospheric thriller explores how the past can haunt the present.",
        publishedDate: "2019-02-12",
        language: "English",
        pages: 336,
        coverColor: "#333533"
    },
    {
        id: "thriller-11",
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        genre: "Thriller",
        subgenre: "Crime Thriller",
        price: 15.99,
        rating: 4.5,
        ratingCount: 5432,
        description: "Journalist Mikael Blomkvist is hired to solve a long-ago family disappearance. Aided by the mysterious and brilliant computer hacker Lisbeth Salander, they uncover a trail of murder and dark family secrets.",
        publishedDate: "2005-08-16",
        language: "English",
        pages: 672,
        coverColor: "#212529"
    },
    {
        id: "thriller-12",
        title: "In the Woods",
        author: "Tana French",
        genre: "Thriller",
        subgenre: "Crime Thriller",
        price: 14.99,
        rating: 4.2,
        ratingCount: 3187,
        description: "Detective Rob Ryan and his partner Cassie Maddox investigate the murder of a 12-year-old girl in a small Dublin suburb. The case resurrects traumatic memories for Ryan, who was the sole survivor of a similar incident in the same woods decades earlier.",
        publishedDate: "2007-05-17",
        language: "English",
        pages: 464,
        coverColor: "#1b4332"
    },
    {
        id: "thriller-13",
        title: "Big Little Lies",
        author: "Liane Moriarty",
        genre: "Thriller",
        subgenre: "Domestic Thriller",
        price: 13.99,
        rating: 4.5,
        ratingCount: 4352,
        description: "A darkly comedic tale about three women whose seemingly perfect lives unravel when a single event at a school fundraiser reveals that sometimes the littlest lies can prove the most lethal.",
        publishedDate: "2014-07-29",
        language: "English",
        pages: 480,
        coverColor: "#9c6644"
    },
    {
        id: "thriller-14",
        title: "The Shining",
        author: "Stephen King",
        genre: "Thriller",
        subgenre: "Horror Thriller",
        price: 14.99,
        rating: 4.7,
        ratingCount: 6543,
        description: "Jack Torrance becomes winter caretaker at the isolated Overlook Hotel, hoping to cure his writer's block. As the harsh winter weather sets in, the hotel's dark past begins to affect Jack's sanity and puts his wife and psychic son in danger.",
        publishedDate: "1977-01-28",
        language: "English",
        pages: 688,
        coverColor: "#a4161a"
    },
    {
        id: "thriller-15",
        title: "You",
        author: "Caroline Kepnes",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 13.99,
        rating: 4.3,
        ratingCount: 2765,
        description: "A terrifying exploration of obsession, told through the perspective of Joe Goldberg, a charming but deeply disturbed bookstore manager who becomes infatuated with a customer and infiltrates every aspect of her life.",
        publishedDate: "2014-09-30",
        language: "English",
        pages: 432,
        coverColor: "#370617"
    },

    // Horror Books
    {
        id: "horror-1",
        title: "It",
        author: "Stephen King",
        genre: "Horror",
        subgenre: "Supernatural Horror",
        price: 17.99,
        rating: 4.7,
        ratingCount: 5432,
        description: "In the town of Derry, Maine, seven adults return to confront a nightmare they first encountered as teenagers—an evil creature that preyed on the city's children. The novel interweaves stories of the characters as both children and adults.",
        publishedDate: "1986-09-15",
        language: "English",
        pages: 1138,
        coverColor: "#a4161a"
    },
    {
        id: "horror-2",
        title: "The Haunting of Hill House",
        author: "Shirley Jackson",
        genre: "Horror",
        subgenre: "Gothic Horror",
        price: 11.99,
        rating: 4.4,
        ratingCount: 3215,
        description: "A chilling and suspenseful tale of four people who agree to stay in an eighty-year-old mansion with a reputation for being haunted. As strange events occur, it becomes clear that the house may be gathering its powers to claim one of them.",
        publishedDate: "1959-10-16",
        language: "English",
        pages: 288,
        coverColor: "#495057"
    },
    {
        id: "horror-3",
        title: "Dracula",
        author: "Bram Stoker",
        genre: "Horror",
        subgenre: "Gothic Horror",
        price: 9.99,
        rating: 4.5,
        ratingCount: 4876,
        description: "The classic tale of Count Dracula's attempt to move from Transylvania to England, and the battle between him and Professor Abraham Van Helsing. This epistolary novel established many conventions of subsequent vampire fantasy.",
        publishedDate: "1897-05-26",
        language: "English",
        pages: 418,
        coverColor: "#ae2012"
    },
    {
        id: "horror-4",
        title: "The Exorcist",
        author: "William Peter Blatty",
        genre: "Horror",
        subgenre: "Supernatural Horror",
        price: 13.99,
        rating: 4.6,
        ratingCount: 3542,
        description: "The terrifying story of the possession of a 12-year-old girl and her mother's desperate attempts to get medical and then religious help. This novel, inspired by a true case, explores themes of faith, evil, and the supernatural.",
        publishedDate: "1971-06-01",
        language: "English",
        pages: 340,
        coverColor: "#000000"
    },
    {
        id: "horror-5",
        title: "House of Leaves",
        author: "Mark Z. Danielewski",
        genre: "Horror",
        subgenre: "Experimental Horror",
        price: 19.99,
        rating: 4.2,
        ratingCount: 2876,
        description: "An unconventional novel about a family who discovers that their new house is slightly larger on the inside than on the outside. The book's complex structure, unreliable narrators, and typographical experiments create a deeply unsettling reading experience.",
        publishedDate: "2000-03-07",
        language: "English",
        pages: 709,
        coverColor: "#590d22"
    },
    {
        id: "horror-6",
        title: "Pet Sematary",
        author: "Stephen King",
        genre: "Horror",
        subgenre: "Supernatural Horror",
        price: 14.99,
        rating: 4.5,
        ratingCount: 3765,
        description: "When Dr. Louis Creed takes a new job and moves his family to rural Maine, he discovers an ancient burial ground hidden in the woods near his home with the power to raise the dead. This meditation on grief and loss explores the terrible consequences of interfering with the natural order.",
        publishedDate: "1983-11-14",
        language: "English",
        pages: 416,
        coverColor: "#9b2226"
    },
    {
        id: "horror-7",
        title: "Bird Box",
        author: "Josh Malerman",
        genre: "Horror",
        subgenre: "Post-Apocalyptic Horror",
        price: 13.99,
        rating: 4.3,
        ratingCount: 2543,
        description: "In a world where an unknown presence drives people to deadly violence when seen, a woman and her children must venture blindfolded on a terrifying journey to sanctuary. This tense and claustrophobic novel explores fear of the unknown.",
        publishedDate: "2014-03-27",
        language: "English",
        pages: 272,
        coverColor: "#212529"
    },
    {
        id: "horror-8",
        title: "The Silence of the Lambs",
        author: "Thomas Harris",
        genre: "Horror",
        subgenre: "Psychological Horror",
        price: 14.99,
        rating: 4.7,
        ratingCount: 4321,
        description: "FBI trainee Clarice Starling is assigned to interview the brilliant psychiatrist and cannibalistic serial killer Dr. Hannibal Lecter to gain insight into another killer, Buffalo Bill. This psychological thriller examines the darkest corners of human behavior.",
        publishedDate: "1988-05-08",
        language: "English",
        pages: 368,
        coverColor: "#14213d"
    },
    {
        id: "horror-9",
        title: "Rosemary's Baby",
        author: "Ira Levin",
        genre: "Horror",
        subgenre: "Psychological Horror",
        price: 12.99,
        rating: 4.4,
        ratingCount: 2987,
        description: "Rosemary and Guy Woodhouse move into the Bramford, an old New York City apartment building with a dark history. When Rosemary becomes pregnant, she becomes increasingly isolated and suspicious of her neighbors and husband, fearing a conspiracy related to her unborn child.",
        publishedDate: "1967-03-12",
        language: "English",
        pages: 256,
        coverColor: "#4a4e69"
    },
    {
        id: "horror-10",
        title: "The Stand",
        author: "Stephen King",
        genre: "Horror",
        subgenre: "Post-Apocalyptic Horror",
        price: 18.99,
        rating: 4.8,
        ratingCount: 5876,
        description: "After a plague kills 99% of the world's population, the survivors split between following Mother Abagail, an elderly prophet, or Randall Flagg, a demonic figure. This epic novel explores good versus evil in a post-apocalyptic America.",
        publishedDate: "1978-10-03",
        language: "English",
        pages: 1153,
        coverColor: "#283618"
    },
    {
        id: "horror-11",
        title: "NOS4A2",
        author: "Joe Hill",
        genre: "Horror",
        subgenre: "Supernatural Horror",
        price: 15.99,
        rating: 4.3,
        ratingCount: 2765,
        description: "Victoria McQueen discovers she has the ability to find lost things by riding her bicycle across a magical bridge. She encounters Charlie Manx, an immortal who abducts children to take to 'Christmasland,' a place where unhappiness is illegal and Christmas is celebrated every day.",
        publishedDate: "2013-04-30",
        language: "English",
        pages: 704,
        coverColor: "#660708"
    },
    {
        id: "horror-12",
        title: "The Only Good Indians",
        author: "Stephen Graham Jones",
        genre: "Horror",
        subgenre: "Supernatural Horror",
        price: 14.99,
        rating: 4.2,
        ratingCount: 1987,
        description: "A tale of revenge, cultural identity, and the cost of breaking from tradition. Four American Indian men are pursued by an entity seeking vengeance for an incident from their youth, forcing them to confront their actions and heritage.",
        publishedDate: "2020-07-14",
        language: "English",
        pages: 320,
        coverColor: "#006d77"
    },
    {
        id: "horror-13",
        title: "The Hunger",
        author: "Alma Katsu",
        genre: "Horror",
        subgenre: "Historical Horror",
        price: 13.99,
        rating: 4.1,
        ratingCount: 1687,
        description: "A reimagining of the tragic Donner Party with a supernatural twist. As members of the wagon train begin to disappear, the survivors wonder if they're being stalked by a mythical creature or if starvation is driving them to madness.",
        publishedDate: "2018-03-06",
        language: "English",
        pages: 384,
        coverColor: "#432818"
    },
    {
        id: "horror-14",
        title: "Mexican Gothic",
        author: "Silvia Moreno-Garcia",
        genre: "Horror",
        subgenre: "Gothic Horror",
        price: 15.99,
        rating: 4.4,
        ratingCount: 2432,
        description: "When Noemi receives a frantic letter from her newly-wed cousin, she travels to High Place, a distant house in the Mexican countryside. She discovers her cousin's husband, a menacing family, and dark secrets within the walls of this decaying mansion.",
        publishedDate: "2020-06-30",
        language: "English",
        pages: 320,
        coverColor: "#723d46"
    },
    {
        id: "horror-15",
        title: "The Fisherman",
        author: "John Langan",
        genre: "Horror",
        subgenre: "Cosmic Horror",
        price: 14.99,
        rating: 4.3,
        ratingCount: 1543,
        description: "Two widowers find solace in fishing together until they hear a dark tale about a mysterious figure known as the Fisherman and a place called Dutchman's Creek. This Lovecraftian story explores grief, the unknown, and the cosmic horrors that lurk beneath the surface of reality.",
        publishedDate: "2016-06-30",
        language: "English",
        pages: 282,
        coverColor: "#003d5b"
    },

    // Sad Books
    {
        id: "sad-1",
        title: "The Book Thief",
        author: "Markus Zusak",
        genre: "Sad",
        subgenre: "Historical Fiction",
        price: 14.99,
        rating: 4.7,
        ratingCount: 5876,
        description: "Narrated by Death, this novel follows Liesel Meminger, a young girl living with a foster family in Nazi Germany. As Liesel learns to read, she shares the books she steals with neighbors during bombing raids and with the Jewish man hidden in her basement.",
        publishedDate: "2005-09-01",
        language: "English",
        pages: 584,
        coverColor: "#495057"
    },
    {
        id: "sad-2",
        title: "A Little Life",
        author: "Hanya Yanagihara",
        genre: "Sad",
        subgenre: "Literary Fiction",
        price: 16.99,
        rating: 4.5,
        ratingCount: 3542,
        description: "Following the lives of four friends from college into middle age, this novel centers on Jude, whose traumatic past increasingly affects his life. A devastating exploration of friendship, suffering, and the limits of human endurance.",
        publishedDate: "2015-03-10",
        language: "English",
        pages: 736,
        coverColor: "#c9ada7"
    },
    {
        id: "sad-3",
        title: "The Road",
        author: "Cormac McCarthy",
        genre: "Sad",
        subgenre: "Post-Apocalyptic Fiction",
        price: 13.99,
        rating: 4.4,
        ratingCount: 4176,
        description: "In a post-apocalyptic world, a father and his young son journey toward the coast, fighting for survival in a desolate landscape filled with dangers. This stark novel explores the depths of human love and the will to persevere in the face of utter despair.",
        publishedDate: "2006-09-26",
        language: "English",
        pages: 287,
        coverColor: "#495057"
    },
    {
        id: "sad-4",
        title: "Atonement",
        author: "Ian McEwan",
        genre: "Sad",
        subgenre: "Historical Fiction",
        price: 14.99,
        rating: 4.3,
        ratingCount: 3254,
        description: "A tragic tale that begins with a young girl's devastating misunderstanding, which destroys the lives of those around her. Spanning decades, the novel explores themes of forgiveness, guilt, and the redemptive power of storytelling.",
        publishedDate: "2001-09-20",
        language: "English",
        pages: 384,
        coverColor: "#457b9d"
    },
    {
        id: "sad-5",
        title: "Never Let Me Go",
        author: "Kazuo Ishiguro",
        genre: "Sad",
        subgenre: "Dystopian Fiction",
        price: 13.99,
        rating: 4.2,
        ratingCount: 3876,
        description: "Set in an alternate England, the novel follows Kathy, Ruth, and Tommy from their idyllic days at a secluded boarding school to the harsh reality of their predetermined fates. A meditation on what it means to be human, memory, and mortality.",
        publishedDate: "2005-03-03",
        language: "English",
        pages: 304,
        coverColor: "#9db4c0"
    },
    {
        id: "sad-6",
        title: "All the Light We Cannot See",
        author: "Anthony Doerr",
        genre: "Sad",
        subgenre: "Historical Fiction",
        price: 15.99,
        rating: 4.6,
        ratingCount: 4987,
        description: "Set during World War II, this Pulitzer Prize-winning novel tells the parallel stories of Marie-Laure, a blind French girl, and Werner, a German boy with a talent for radio mechanics, whose paths collide amidst the devastation of war.",
        publishedDate: "2014-05-06",
        language: "English",
        pages: 544,
        coverColor: "#adb5bd"
    },
    {
        id: "sad-7",
        title: "When Breath Becomes Air",
        author: "Paul Kalanithi",
        genre: "Sad",
        subgenre: "Memoir",
        price: 14.99,
        rating: 4.8,
        ratingCount: 4321,
        description: "A memoir by a young neurosurgeon diagnosed with terminal cancer, who begins to explore what makes life worth living. This profound meditation on mortality, identity, and meaning was completed by his wife after his death.",
        publishedDate: "2016-01-12",
        language: "English",
        pages: 256,
        coverColor: "#dee2e6"
    },
    {
        id: "sad-8",
        title: "They Both Die at the End",
        author: "Adam Silvera",
        genre: "Sad",
        subgenre: "Young Adult",
        price: 12.99,
        rating: 4.4,
        ratingCount: 2876,
        description: "In a world where people receive a phone call on the day they're going to die, two strangers, Mateo and Rufus, connect through an app called Last Friend and form a deep bond as they spend their final day together.",
        publishedDate: "2017-09-05",
        language: "English",
        pages: 384,
        coverColor: "#457b9d"
    },
    {
        id: "sad-9",
        title: "Flowers for Algernon",
        author: "Daniel Keyes",
        genre: "Sad",
        subgenre: "Science Fiction",
        price: 11.99,
        rating: 4.5,
        ratingCount: 3765,
        description: "The story of Charlie Gordon, a man with an IQ of 68 who undergoes an experimental surgery to increase his intelligence. Through his journal entries, we witness his intellectual growth, emotional development, and the heartbreaking realization of the procedure's temporary nature.",
        publishedDate: "1966-04-01",
        language: "English",
        pages: 311,
        coverColor: "#bdb2ff"
    },
    {
        id: "sad-10",
        title: "The Fault in Our Stars",
        author: "John Green",
        genre: "Sad",
        subgenre: "Young Adult",
        price: 12.99,
        rating: 4.6,
        ratingCount: 5432,
        description: "Sixteen-year-old cancer patient Hazel Grace Lancaster meets and falls in love with Augustus Waters, another cancer patient, at a support group. Their shared love of books leads to an adventure that helps them both confront the reality of their illnesses.",
        publishedDate: "2012-01-10",
        language: "English",
        pages: 313,
        coverColor: "#023e8a"
    },
    {
        id: "sad-11",
        title: "On Earth We're Briefly Gorgeous",
        author: "Ocean Vuong",
        genre: "Sad",
        subgenre: "Literary Fiction",
        price: 14.99,
        rating: 4.3,
        ratingCount: 2198,
        description: "Written as a letter from a son to his illiterate mother, this poetic novel explores the impact of trauma across generations, from Vietnam to America, and the possibilities for healing and redemption through storytelling.",
        publishedDate: "2019-06-04",
        language: "English",
        pages: 256,
        coverColor: "#adb5bd"
    },
    {
        id: "sad-12",
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        genre: "Sad",
        subgenre: "Historical Fiction",
        price: 13.99,
        rating: 4.7,
        ratingCount: 5124,
        description: "A story of friendship, betrayal, and redemption set against the backdrop of Afghanistan's tumultuous history. The narrative follows Amir, a privileged boy from Kabul, and his complex relationship with Hassan, the son of his father's servant.",
        publishedDate: "2003-05-29",
        language: "English",
        pages: 400,
        coverColor: "#fca311"
    },
    {
        id: "sad-13",
        title: "The Lovely Bones",
        author: "Alice Sebold",
        genre: "Sad",
        subgenre: "Literary Fiction",
        price: 13.99,
        rating: 4.2,
        ratingCount: 3876,
        description: "Narrated by 14-year-old Susie Salmon from heaven after her murder, this novel follows her family as they cope with their grief and her killer as he eludes justice. Susie watches her loved ones from above, trying to help them heal.",
        publishedDate: "2002-06-03",
        language: "English",
        pages: 328,
        coverColor: "#e0c3fc"
    },
    {
        id: "sad-14",
        title: "The Time Traveler's Wife",
        author: "Audrey Niffenegger",
        genre: "Sad",
        subgenre: "Science Fiction",
        price: 14.99,
        rating: 4.4,
        ratingCount: 4123,
        description: "A love story about a man with a genetic disorder that causes him to time travel unpredictably, and his wife, an artist who has to cope with his frequent absences and dangerous experiences. Their unconventional marriage is tested by something neither can control.",
        publishedDate: "2003-09-01",
        language: "English",
        pages: 546,
        coverColor: "#e5989b"
    },
    {
        id: "sad-15",
        title: "My Sister's Keeper",
        author: "Jodi Picoult",
        genre: "Sad",
        subgenre: "Contemporary Fiction",
        price: 13.99,
        rating: 4.3,
        ratingCount: 3254,
        description: "Anna Fitzgerald was conceived as a bone marrow match for her sister Kate, who has leukemia. After years of medical procedures, 13-year-old Anna seeks legal emancipation from her parents regarding medical decisions, forcing her family to confront difficult ethical questions.",
        publishedDate: "2004-04-06",
        language: "English",
        pages: 448,
        coverColor: "#f4acb7"
    },

    // History Books
    {
        id: "history-1",
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "History",
        subgenre: "World History",
        price: 17.99,
        rating: 4.6,
        ratingCount: 6783,
        description: "A sweeping narrative of human history, from the emergence of Homo sapiens to the twenty-first century. The book examines the course of human evolution, the agricultural and scientific revolutions, and the creation of religions and nations.",
        publishedDate: "2014-02-10",
        language: "English",
        pages: 464,
        coverColor: "#335c67"
    },
    {
        id: "history-2",
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        genre: "History",
        subgenre: "World History",
        price: 16.99,
        rating: 4.5,
        ratingCount: 5432,
        description: "A Pulitzer Prize-winning examination of why some human societies have thrived while others have faltered. The book argues that environmental factors, not inherent differences between populations, explain the global distribution of power and wealth.",
        publishedDate: "1997-03-01",
        language: "English",
        pages: 480,
        coverColor: "#8a817c"
    },
    {
        id: "history-3",
        title: "The Silk Roads",
        author: "Peter Frankopan",
        genre: "History",
        subgenre: "World History",
        price: 15.99,
        rating: 4.4,
        ratingCount: 3121,
        description: "A comprehensive new history of the world that fundamentally reorients our understanding of the global past. The book argues that the center of world history is not Europe but the network of trade routes known as the Silk Roads, linking East and West.",
        publishedDate: "2015-08-27",
        language: "English",
        pages: 656,
        coverColor: "#9c6644"
    },
    {
        id: "history-4",
        title: "SPQR: A History of Ancient Rome",
        author: "Mary Beard",
        genre: "History",
        subgenre: "Ancient History",
        price: 16.99,
        rating: 4.6,
        ratingCount: 2876,
        description: "A fresh look at Roman history from one of the world's foremost classicists. The book covers 1,000 years of history, examining how Rome grew from an insignificant village to a dominant power controlling territory from Spain to Syria.",
        publishedDate: "2015-10-20",
        language: "English",
        pages: 608,
        coverColor: "#d62828"
    },
    {
        id: "history-5",
        title: "The Warmth of Other Suns",
        author: "Isabel Wilkerson",
        genre: "History",
        subgenre: "American History",
        price: 18.99,
        rating: 4.8,
        ratingCount: 3542,
        description: "A masterful chronicle of the Great Migration, the movement of nearly six million black Americans out of the South to the North and West between 1915 and 1970. The book follows three individuals who made this journey, illuminating this significant exodus.",
        publishedDate: "2010-09-07",
        language: "English",
        pages: 622,
        coverColor: "#e9c46a"
    },
    {
        id: "history-6",
        title: "A People's History of the United States",
        author: "Howard Zinn",
        genre: "History",
        subgenre: "American History",
        price: 17.99,
        rating: 4.7,
        ratingCount: 4321,
        description: "A radical retelling of American history from the perspective of the marginalized rather than the powerful. The book chronicles American history from the arrival of Columbus to modern times, focusing on class struggle and social movements.",
        publishedDate: "1980-08-02",
        language: "English",
        pages: 784,
        coverColor: "#6d6875"
    },
    {
        id: "history-7",
        title: "The Rise and Fall of the Third Reich",
        author: "William L. Shirer",
        genre: "History",
        subgenre: "Military History",
        price: 19.99,
        rating: 4.6,
        ratingCount: 3876,
        description: "A comprehensive account of Nazi Germany, from its rise to power in the 1930s to its downfall in 1945. The book, written by a journalist who witnessed many of the events firsthand, examines the political, social, and military aspects of Hitler's regime.",
        publishedDate: "1960-10-17",
        language: "English",
        pages: 1280,
        coverColor: "#343a40"
    },
    {
        id: "history-8",
        title: "The Crusades: The Authoritative History",
        author: "Thomas Asbridge",
        genre: "History",
        subgenre: "Medieval History",
        price: 16.99,
        rating: 4.5,
        ratingCount: 2165,
        description: "A comprehensive account of the Crusades, the series of religious wars initiated by Pope Urban II in 1095. With vivid narratives and contextual analysis, the book examines the motivations, successes, and failures of these expeditions and their lasting impact on East-West relations.",
        publishedDate: "2010-03-09",
        language: "English",
        pages: 784,
        coverColor: "#774936"
    },
    {
        id: "history-9",
        title: "1776",
        author: "David McCullough",
        genre: "History",
        subgenre: "American History",
        price: 15.99,
        rating: 4.7,
        ratingCount: 3542,
        description: "A riveting narrative about a crucial year in American history, focused on the military aspects of the Revolutionary War. The book follows George Washington and his inexperienced army as they face the world's most powerful military force.",
        publishedDate: "2005-05-24",
        language: "English",
        pages: 400,
        coverColor: "#003049"
    },
    {
        id: "history-10",
        title: "Genghis Khan and the Making of the Modern World",
        author: "Jack Weatherford",
        genre: "History",
        subgenre: "Asian History",
        price: 14.99,
        rating: 4.4,
        ratingCount: 2543,
        description: "A re-examination of Genghis Khan's life and legacy that argues for his progressive impact on world civilization. The book reveals how the Mongol Empire's innovations in communication, trade, religious tolerance, and meritocracy shaped the modern world.",
        publishedDate: "2004-03-22",
        language: "English",
        pages: 352,
        coverColor: "#f8961e"
    },
    {
        id: "history-11",
        title: "The Devil in the White City",
        author: "Erik Larson",
        genre: "History",
        subgenre: "American History",
        price: 15.99,
        rating: 4.5,
        ratingCount: 4176,
        description: "A gripping account of the 1893 Chicago World's Fair that intertwines the stories of its architect, Daniel Burnham, and serial killer H.H. Holmes, who used the fair to lure victims. This narrative non-fiction work brings the Gilded Age vividly to life.",
        publishedDate: "2003-02-11",
        language: "English",
        pages: 464,
        coverColor: "#ced4da"
    },
    {
        id: "history-12",
        title: "The Emperor of All Maladies",
        author: "Siddhartha Mukherjee",
        genre: "History",
        subgenre: "Medical History",
        price: 17.99,
        rating: 4.7,
        ratingCount: 3254,
        description: "A 'biography' of cancer, from its first documented appearance thousands of years ago to modern attempts at treatment and prevention. This Pulitzer Prize-winning book combines scientific inquiry with human stories of courage and persistence.",
        publishedDate: "2010-11-16",
        language: "English",
        pages: 608,
        coverColor: "#ff9f1c"
    },
    {
        id: "history-13",
        title: "Salt: A World History",
        author: "Mark Kurlansky",
        genre: "History",
        subgenre: "World History",
        price: 13.99,
        rating: 4.3,
        ratingCount: 2198,
        description: "An exploration of how salt—the only rock humans eat—has shaped civilization. The book examines salt's influence on history, economics, politics, and culture, from ancient China to modern America.",
        publishedDate: "2002-01-28",
        language: "English",
        pages: 484,
        coverColor: "#f8f9fa"
    },
    {
        id: "history-14",
        title: "Team of Rivals",
        author: "Doris Kearns Goodwin",
        genre: "History",
        subgenre: "American History",
        price: 17.99,
        rating: 4.8,
        ratingCount: 3876,
        description: "A detailed account of Abraham Lincoln's political genius in assembling a cabinet of former rivals, many of whom were better educated and more accomplished than he was. The book provides profound insights into Lincoln's leadership during the Civil War.",
        publishedDate: "2005-10-25",
        language: "English",
        pages: 944,
        coverColor: "#053651"
    },
    {
        id: "history-15",
        title: "Midnight's Children",
        author: "Salman Rushdie",
        genre: "History",
        subgenre: "Historical Fiction",
        price: 14.99,
        rating: 4.2,
        ratingCount: 2543,
        description: "A magical realist novel about children born at the moment of India's independence who are endowed with special powers. The book follows Saleem Sinai, whose life mirrors the history of his nation, through the tumultuous decades after 1947.",
        publishedDate: "1981-04-12",
        language: "English",
        pages: 647,
        coverColor: "#e76f51"
    },

    // Realistic Fiction Books
    {
        id: "realistic-1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Realistic",
        subgenre: "Classic Literature",
        price: 11.99,
        rating: 4.7,
        ratingCount: 6543,
        description: "Set in the Jazz Age on Long Island, this novel follows the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan. A critique of the American Dream, the novel explores themes of wealth, class, love, and idealism.",
        publishedDate: "1925-04-10",
        language: "English",
        pages: 208,
        coverColor: "#168aad"
    },
    {
        id: "realistic-2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Realistic",
        subgenre: "Classic Literature",
        price: 12.99,
        rating: 4.8,
        ratingCount: 7654,
        description: "Set in the American South during the 1930s, the novel follows young Scout Finch as she observes her father, lawyer Atticus Finch, defend a Black man falsely accused of rape. A powerful exploration of racial injustice and moral growth.",
        publishedDate: "1960-07-11",
        language: "English",
        pages: 336,
        coverColor: "#f4f1de"
    },
    {
        id: "realistic-3",
        title: "Normal People",
        author: "Sally Rooney",
        genre: "Realistic",
        subgenre: "Contemporary Fiction",
        price: 13.99,
        rating: 4.2,
        ratingCount: 3254,
        description: "A tender story about the complexities of young love and connection. Connell and Marianne grow up in the same small town in Ireland but come from vastly different backgrounds. Their relationship spans years as they navigate the challenges of adulthood.",
        publishedDate: "2018-08-28",
        language: "English",
        pages: 273,
        coverColor: "#a0c4ff"
    },
    {
        id: "realistic-4",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Realistic",
        subgenre: "Classic Literature",
        price: 11.99,
        rating: 4.5,
        ratingCount: 5432,
        description: "The story of Holden Caulfield, a teenage boy dealing with complex issues of identity, belonging, loss, and connection. After being expelled from prep school, Holden spends three days wandering New York City before returning home, trying to find authenticity in a world of 'phonies.'",
        publishedDate: "1951-07-16",
        language: "English",
        pages: 277,
        coverColor: "#e5383b"
    },
    {
        id: "realistic-5",
        title: "Little Fires Everywhere",
        author: "Celeste Ng",
        genre: "Realistic",
        subgenre: "Contemporary Fiction",
        price: 14.99,
        rating: 4.4,
        ratingCount: 3876,
        description: "In the planned community of Shaker Heights, the arrival of artist Mia Warren and her daughter Pearl upends the life of the Richardson family. When friends of the Richardsons attempt to adopt a Chinese-American baby, a custody battle divides the town.",
        publishedDate: "2017-09-12",
        language: "English",
        pages: 352,
        coverColor: "#e56b6f"
    },
    {
        id: "realistic-6",
        title: "The Goldfinch",
        author: "Donna Tartt",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 15.99,
        rating: 4.3,
        ratingCount: 4123,
        description: "After surviving a terrorist bombing at an art museum that kills his mother, thirteen-year-old Theo Decker takes a painting that will become his lifeline as he navigates grief, adolescence, and the criminal underworld. A Pulitzer Prize-winning novel about loss, obsession, and the redemptive power of art.",
        publishedDate: "2013-10-22",
        language: "English",
        pages: 784,
        coverColor: "#e9d8a6"
    },
    {
        id: "realistic-7",
        title: "Americanah",
        author: "Chimamanda Ngozi Adichie",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 14.99,
        rating: 4.6,
        ratingCount: 3542,
        description: "The story follows Ifemelu and Obinze, young lovers who depart military-ruled Nigeria for the West. Ifemelu heads for America, while Obinze plunges into a dangerous undocumented life in London. Fifteen years later, they reunite in a newly democratic Nigeria.",
        publishedDate: "2013-05-14",
        language: "English",
        pages: 608,
        coverColor: "#8d99ae"
    },
    {
        id: "realistic-8",
        title: "1984",
        author: "George Orwell",
        genre: "Realistic",
        subgenre: "Dystopian Fiction",
        price: 12.99,
        rating: 4.7,
        ratingCount: 6789,
        description: "In a totalitarian future, Winston Smith rebels against the Party and its leader, Big Brother, by falling in love and keeping a diary—both punishable by death. A chilling vision of a society of surveillance, propaganda, and psychological manipulation.",
        publishedDate: "1949-06-08",
        language: "English",
        pages: 328,
        coverColor: "#2b2d42"
    },
    {
        id: "realistic-9",
        title: "The Secret History",
        author: "Donna Tartt",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 15.99,
        rating: 4.5,
        ratingCount: 3254,
        description: "A group of classics students at an elite New England college become enthralled with Greek rituals and end up crossing moral boundaries, leading to murder. The story is told from the perspective of one group member looking back on their descent into darkness.",
        publishedDate: "1992-09-01",
        language: "English",
        pages: 576,
        coverColor: "#774936"
    },
    {
        id: "realistic-10",
        title: "Middlesex",
        author: "Jeffrey Eugenides",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 14.99,
        rating: 4.4,
        ratingCount: 3121,
        description: "A Pulitzer Prize-winning novel about Cal Stephanides, an intersex person who traces the genetic mutation that caused this condition through three generations of their Greek-American family. The epic tale spans from a tiny village in Asia Minor to suburban Detroit.",
        publishedDate: "2002-09-04",
        language: "English",
        pages: 544,
        coverColor: "#bc6c25"
    },
    {
        id: "realistic-11",
        title: "Freedom",
        author: "Jonathan Franzen",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 15.99,
        rating: 4.3,
        ratingCount: 2876,
        description: "An exploration of a middle-class American family in the early 21st century. The Berglunds—Walter, Patty, and their children—are both typical and exceptional, as their lives entangle with friends, neighbors, and larger political and social issues.",
        publishedDate: "2010-08-31",
        language: "English",
        pages: 576,
        coverColor: "#457b9d"
    },
    {
        id: "realistic-12",
        title: "White Teeth",
        author: "Zadie Smith",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 14.99,
        rating: 4.2,
        ratingCount: 2543,
        description: "A vibrant portrait of multicultural London, following the intertwined stories of the Jones and Iqbal families from the late 20th century into the beginning of the 21st. The novel explores themes of identity, immigration, race, and religion with humor and insight.",
        publishedDate: "2000-01-27",
        language: "English",
        pages: 480,
        coverColor: "#f8edeb"
    },
    {
        id: "realistic-13",
        title: "The Corrections",
        author: "Jonathan Franzen",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 15.99,
        rating: 4.1,
        ratingCount: 2987,
        description: "Aging parents Alfred and Enid Lambert want their three adult children home for 'one last Christmas' in their Midwestern home. The novel follows each family member's story, exploring their struggles with modern life and their interpersonal dynamics.",
        publishedDate: "2001-09-01",
        language: "English",
        pages: 576,
        coverColor: "#adb5bd"
    },
    {
        id: "realistic-14",
        title: "Olive Kitteridge",
        author: "Elizabeth Strout",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 13.99,
        rating: 4.4,
        ratingCount: 2765,
        description: "A Pulitzer Prize-winning novel consisting of 13 interconnected stories set in the small coastal town of Crosby, Maine. The cantankerous but compassionate retired schoolteacher Olive Kitteridge serves as the connecting thread between various tales of loneliness, loss, and love.",
        publishedDate: "2008-03-25",
        language: "English",
        pages: 286,
        coverColor: "#caf0f8"
    },
    {
        id: "realistic-15",
        title: "Everything I Never Told You",
        author: "Celeste Ng",
        genre: "Realistic",
        subgenre: "Literary Fiction",
        price: 13.99,
        rating: 4.3,
        ratingCount: 2543,
        description: "Set in 1970s Ohio, this novel begins with the death of Lydia Lee, the favorite child of a Chinese-American family. As the family processes their grief, long-buried secrets emerge that reveal the pressure of parental expectations and the struggle to belong.",
        publishedDate: "2014-06-26",
        language: "English",
        pages: 304,
        coverColor: "#90a955"
    },

    // New Arrivals - Recent Books (2023-2025)
    {
        id: "fiction-new-1",
        title: "Fourth Wing",
        author: "Rebecca Ross",
        genre: "Fiction",
        subgenre: "Fantasy Romance",
        price: 18.99,
        rating: 4.7,
        ratingCount: 2456,
        description: "A thrilling fantasy romance about a war college where dragon riders are trained. Violet Sorrengail thought she'd be safe in the Scribe Quadrant, but her mother has other plans, sending her to the riders' quadrant where death is more likely than graduation.",
        publishedDate: "2023-05-02",
        language: "English",
        pages: 512,
        coverColor: "#8b5a3c"
    },
    {
        id: "fiction-new-2",
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
        genre: "Fiction",
        subgenre: "Contemporary Fiction",
        price: 17.99,
        rating: 4.8,
        ratingCount: 3245,
        description: "A novel about friendship, art, love, and betrayal, spanning three decades. It follows Sam and Sadie, two friends who reunite as adults to create groundbreaking video games, exploring the nature of creativity and connection in the digital age.",
        publishedDate: "2023-07-15",
        language: "English",
        pages: 416,
        coverColor: "#4a90e2"
    },
    {
        id: "thriller-new-1",
        title: "The Seven Moons of Maali Almeida",
        author: "Shehan Karunatilaka",
        genre: "Thriller",
        subgenre: "Supernatural Thriller",
        price: 16.99,
        rating: 4.5,
        ratingCount: 1876,
        description: "A darkly comic supernatural thriller about a photographer who wakes up dead and has seven moons to contact the living and solve his own murder. Set against the backdrop of 1990s Sri Lanka's civil war.",
        publishedDate: "2023-08-22",
        language: "English",
        pages: 384,
        coverColor: "#d4af37"
    },
    {
        id: "romance-new-1",
        title: "Book Lovers",
        author: "Emily Henry",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 15.99,
        rating: 4.6,
        ratingCount: 4321,
        description: "A literary agent who finds herself living out a small-town romance novel, except she's cast as the other woman. When Nora Stephens encounters the brooding editor from her worst professional nightmare, sparks fly in unexpected ways.",
        publishedDate: "2023-06-10",
        language: "English",
        pages: 368,
        coverColor: "#ff6b6b"
    },
    {
        id: "nonfiction-new-1",
        title: "Spare",
        author: "Prince Harry",
        genre: "Non-fiction",
        subgenre: "Autobiography",
        price: 22.99,
        rating: 4.4,
        ratingCount: 5432,
        description: "The Duke of Sussex's memoir, offering unprecedented revelations about his life within the British Royal Family. A raw, unflinching account of his journey from tragedy to healing, duty to freedom.",
        publishedDate: "2023-01-10",
        language: "English",
        pages: 416,
        coverColor: "#1e3a8a"
    },
    {
        id: "fiction-new-3",
        title: "The Atlas Six",
        author: "Olivie Blake",
        genre: "Fiction",
        subgenre: "Dark Academia Fantasy",
        price: 19.99,
        rating: 4.3,
        ratingCount: 2987,
        description: "Six young magicians are chosen to join an exclusive society with access to ancient magical knowledge. But only five will be initiated, and one will be eliminated. A dark academia fantasy about power, knowledge, and betrayal.",
        publishedDate: "2024-03-12",
        language: "English",
        pages: 448,
        coverColor: "#2c3e50"
    },
    {
        id: "thriller-new-2",
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        genre: "Thriller",
        subgenre: "Cozy Mystery",
        price: 14.99,
        rating: 4.7,
        ratingCount: 3654,
        description: "Four unlikely friends in a retirement village meet weekly to investigate cold cases. When a real murder occurs nearby, they find themselves in the middle of their first live case with deadly consequences.",
        publishedDate: "2024-01-18",
        language: "English",
        pages: 352,
        coverColor: "#8fbc8f"
    },
    {
        id: "romance-new-2",
        title: "People We Meet on Vacation",
        author: "Emily Henry",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 16.99,
        rating: 4.8,
        ratingCount: 3876,
        description: "Best friends Poppy and Alex take a vacation together every year, until they stopped speaking. Two years later, Poppy convinces Alex to take one more trip together, hoping to fix their friendship and maybe find something more.",
        publishedDate: "2024-04-07",
        language: "English",
        pages: 384,
        coverColor: "#ffd93d"
    },
    {
        id: "fiction-new-4",
        title: "Lessons in Chemistry",
        author: "Bonnie Garmus",
        genre: "Fiction",
        subgenre: "Historical Fiction",
        price: 17.99,
        rating: 4.6,
        ratingCount: 4123,
        description: "Set in 1960s California, this novel follows Elizabeth Zott, a scientist who finds herself hosting a cooking show. Her unusual approach to cooking and life challenges the status quo and inspires women to change the world.",
        publishedDate: "2024-05-20",
        language: "English",
        pages: 400,
        coverColor: "#ff9800"
    },
    {
        id: "nonfiction-new-2",
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Non-fiction",
        subgenre: "Philosophy",
        price: 15.99,
        rating: 4.5,
        ratingCount: 2987,
        description: "A philosophical exploration of life's infinite possibilities. Between life and death exists a magical library where you can live alternate versions of your life and discover what truly makes existence meaningful.",
        publishedDate: "2024-08-15",
        language: "English",
        pages: 288,
        coverColor: "#4a5568"
    },
    {
        id: "thriller-new-3",
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        genre: "Thriller",
        subgenre: "Fantasy Thriller",
        price: 18.99,
        rating: 4.4,
        ratingCount: 3245,
        description: "A young woman makes a desperate bargain to live forever but is cursed to be forgotten by everyone she meets. After 300 years, she meets a young man in a bookstore who somehow remembers her name.",
        publishedDate: "2024-09-03",
        language: "English",
        pages: 544,
        coverColor: "#8e44ad"
    },
    {
        id: "romance-new-3",
        title: "The Love Hypothesis",
        author: "Ali Hazel",
        genre: "Romance",
        subgenre: "Contemporary Romance",
        price: 14.99,
        rating: 4.7,
        ratingCount: 4567,
        description: "A PhD student pretends to date a notoriously difficult professor to convince her best friend that she's moved on from her unrequited crush. What starts as a fake relationship becomes complicated when real feelings develop.",
        publishedDate: "2024-11-12",
        language: "English",
        pages: 432,
        coverColor: "#e91e63"
    },
    {
        id: "fiction-new-5",
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "Fiction",
        subgenre: "Science Fiction",
        price: 19.99,
        rating: 4.9,
        ratingCount: 5432,
        description: "A man wakes up on a spaceship with no memory of how he got there, only to discover he's humanity's last hope. A thrilling journey of survival, friendship, and science as he attempts to save both Earth and an alien civilization.",
        publishedDate: "2025-01-25",
        language: "English",
        pages: 496,
        coverColor: "#00bcd4"
    },
    {
        id: "nonfiction-new-3",
        title: "Crying in H Mart",
        author: "Michelle Zauner",
        genre: "Non-fiction",
        subgenre: "Memoir",
        price: 16.99,
        rating: 4.8,
        ratingCount: 3876,
        description: "A powerful memoir about growing up Korean American, losing her mother to cancer, and finding healing through cooking and music. A story about family, grief, identity, and the ties that bind us to our heritage.",
        publishedDate: "2025-02-14",
        language: "English",
        pages: 256,
        coverColor: "#f06292"
    },
    {
        id: "fiction-new-6",
        title: "The Priory of the Orange Tree",
        author: "Samantha Shannon",
        genre: "Fiction",
        subgenre: "Epic Fantasy",
        price: 21.99,
        rating: 4.5,
        ratingCount: 2765,
        description: "An epic fantasy featuring dragons, multiple kingdoms, and strong female protagonists. As an ancient evil stirs, unlikely alliances must be forged between East and West to prevent the return of the dreaded Nameless One.",
        publishedDate: "2025-03-08",
        language: "English",
        pages: 848,
        coverColor: "#ff5722"
    },
    {
        id: "thriller-new-4",
        title: "The Sanatorium",
        author: "Sarah Pearse",
        genre: "Thriller",
        subgenre: "Psychological Thriller",
        price: 15.99,
        rating: 4.3,
        ratingCount: 2456,
        description: "A detective arrives at a remote hotel in the Swiss Alps for her brother's engagement party, but when a snowstorm traps the guests and a woman goes missing, she realizes the hotel's disturbing past may be connected to the present danger.",
        publishedDate: "2025-04-19",
        language: "English",
        pages: 400,
        coverColor: "#607d8b"
    }
];

// Get a list of all unique genres from the books data
const getAllGenres = () => {
    const genres = new Set();
    booksData.forEach(book => {
        genres.add(book.genre);
    });
    return Array.from(genres);
};

// Function to initialize the genre filter with all available genres
const initializeGenreFilter = () => {
    const genreFilter = document.getElementById('filter-genre');
    const genres = getAllGenres();
    
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.toLowerCase();
        option.textContent = genre;
        option.setAttribute('data-i18n', `genre_${genre.toLowerCase()}`);
        genreFilter.appendChild(option);
    });
};

// Function to get books for a specific genre
const getBooksByGenre = (genre) => {
    if (genre === 'all') {
        return booksData;
    }
    return booksData.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
};

// Apply all filters to get filtered books
const getFilteredBooks = (genreFilter, priceFilter, ratingFilter, searchQuery = '') => {
    return booksData.filter(book => {
        // Genre filter
        if (genreFilter !== 'all' && book.genre.toLowerCase() !== genreFilter.toLowerCase()) {
            return false;
        }
        
        // Price filter
        if (priceFilter !== 'all') {
            if (priceFilter === 'under10' && book.price >= 10) return false;
            if (priceFilter === '10to20' && (book.price < 10 || book.price > 20)) return false;
            if (priceFilter === '20to30' && (book.price < 20 || book.price > 30)) return false;
            if (priceFilter === 'over30' && book.price <= 30) return false;
        }
        
        // Rating filter
        if (ratingFilter !== 'all') {
            if (ratingFilter === '4plus' && book.rating < 4) return false;
            if (ratingFilter === '3plus' && book.rating < 3) return false;
            if (ratingFilter === '2plus' && book.rating < 2) return false;
        }
        
        // Search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.genre.toLowerCase().includes(query)
            );
        }
        
        return true;
    });
};

// Create HTML for a book card
const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-id', book.id);
    bookCard.setAttribute('data-genre', book.genre.toLowerCase());
    bookCard.setAttribute('data-aos', 'fade-up');
    
    // Create book HTML structure
    bookCard.innerHTML = `
        <div class="book-image" style="background-color: ${book.coverColor}">
            <div class="book-cover-container">
                <img class="book-cover-image" 
                     src="" 
                     alt="${book.title} by ${book.author}" 
                     style="display: none;" 
                     loading="lazy">
                <div class="book-image-placeholder">
                    <i class="fas fa-book"></i>
                </div>
                <div class="book-cover-loading" style="display: none;">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
            </div>
            <div class="book-image-overlay">
                <div class="overlay-btn preview-btn" data-id="${book.id}" title="Quick View">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="overlay-btn wishlist-btn" data-id="${book.id}" title="Add to Wishlist">
                    <i class="far fa-heart"></i>
                </div>
            </div>
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-rating">
                <div class="stars">
                    ${getStarRating(book.rating)}
                </div>
                <span class="rating-count">(${book.ratingCount})</span>
            </div>
            <div class="book-price">
                <span class="price">$${book.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${book.id}">
                    <i class="fas fa-shopping-cart"></i> Add
                </button>
            </div>
        </div>
    `;
    
    // Load cover image asynchronously
    const loadBookCoverAsync = async () => {
        const coverContainer = bookCard.querySelector('.book-cover-container');
        const coverImage = bookCard.querySelector('.book-cover-image');
        const placeholder = bookCard.querySelector('.book-image-placeholder');
        const loadingIndicator = bookCard.querySelector('.book-cover-loading');
        
        try {
            // Show loading indicator
            loadingIndicator.style.display = 'flex';
            placeholder.style.display = 'none';
            
            // Try to load cover image
            const coverUrl = await loadCoverImage(book.id, book.title, book.author);
            
            if (coverUrl) {
                // Load the image
                const img = new Image();
                img.onload = () => {
                    coverImage.src = coverUrl;
                    coverImage.style.display = 'block';
                    loadingIndicator.style.display = 'none';
                    placeholder.style.display = 'none';
                };
                img.onerror = () => {
                    // If image fails to load, show placeholder
                    loadingIndicator.style.display = 'none';
                    placeholder.style.display = 'flex';
                };
                img.src = coverUrl;
            } else {
                // No cover found, show placeholder
                loadingIndicator.style.display = 'none';
                placeholder.style.display = 'flex';
            }
        } catch (error) {
            console.warn('Error loading cover for book:', book.id, error);
            // Show placeholder on error
            loadingIndicator.style.display = 'none';
            placeholder.style.display = 'flex';
        }
    };
    
    // Load cover image with a small delay to avoid overwhelming the browser
    setTimeout(loadBookCoverAsync, Math.random() * 500);
    
    return bookCard;
};

// Helper function to create HTML for star ratings
const getStarRating = (rating) => {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
};

// Display books with pagination
const displayBooks = (books, page = 1, booksPerPage = 8) => {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';
    
    // Calculate start and end index for current page
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToDisplay = books.slice(startIndex, endIndex);
    
    if (booksToDisplay.length === 0) {
        booksContainer.innerHTML = `
            <div class="no-books-message">
                <i class="fas fa-book-open"></i>
                <p data-i18n="no_books_found">No books found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    // Create and append book cards
    booksToDisplay.forEach(book => {
        const bookCard = createBookCard(book);
        booksContainer.appendChild(bookCard);
    });
    
    // Setup pagination
    setupPagination(books.length, page, booksPerPage);
    
    // Initialize AOS for animations
    AOS.refresh();
};

// Set up pagination
const setupPagination = (totalBooks, currentPage, booksPerPage) => {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    
    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement('div');
        prevBtn.className = 'pagination-btn prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => {
            displayBooks(currentFilteredBooks, currentPage - 1, booksPerPage);
            window.scrollTo({ top: document.getElementById('books-container').offsetTop - 100, behavior: 'smooth' });
        });
        pagination.appendChild(prevBtn);
    }
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages && startPage > 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page and ellipsis
    if (startPage > 1) {
        const firstPageBtn = document.createElement('div');
        firstPageBtn.className = 'pagination-btn';
        firstPageBtn.textContent = '1';
        firstPageBtn.addEventListener('click', () => {
            displayBooks(currentFilteredBooks, 1, booksPerPage);
            window.scrollTo({ top: document.getElementById('books-container').offsetTop - 100, behavior: 'smooth' });
        });
        pagination.appendChild(firstPageBtn);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('div');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('div');
        pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i.toString();
        
        if (i !== currentPage) {
            pageBtn.addEventListener('click', () => {
                displayBooks(currentFilteredBooks, i, booksPerPage);
                window.scrollTo({ top: document.getElementById('books-container').offsetTop - 100, behavior: 'smooth' });
            });
        }
        
        pagination.appendChild(pageBtn);
    }
    
    // Last page and ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('div');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
        
        const lastPageBtn = document.createElement('div');
        lastPageBtn.className = 'pagination-btn';
        lastPageBtn.textContent = totalPages.toString();
        lastPageBtn.addEventListener('click', () => {
            displayBooks(currentFilteredBooks, totalPages, booksPerPage);
            window.scrollTo({ top: document.getElementById('books-container').offsetTop - 100, behavior: 'smooth' });
        });
        pagination.appendChild(lastPageBtn);
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('div');
        nextBtn.className = 'pagination-btn next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => {
            displayBooks(currentFilteredBooks, currentPage + 1, booksPerPage);
            window.scrollTo({ top: document.getElementById('books-container').offsetTop - 100, behavior: 'smooth' });
        });
        pagination.appendChild(nextBtn);
    }
};

// Create book preview modal content
const createBookPreviewContent = (bookId) => {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    // Add to recently viewed books
    addToRecentlyViewed(book);
    
    const previewContent = document.getElementById('book-preview-content');
    previewContent.innerHTML = `
        <div class="preview-header" style="background-color: ${book.coverColor}">
            <div class="preview-header-overlay">
                <h2 class="preview-title">${book.title}</h2>
                <p class="preview-author">${book.author}</p>
                <span class="preview-genre">${book.genre} - ${book.subgenre}</span>
            </div>
        </div>
        <div class="preview-body">
            <div class="preview-detail-row">
                <div class="preview-detail">
                    <span class="detail-label" data-i18n="preview_rating">Rating</span>
                    <div class="detail-value">
                        <div class="stars">${getStarRating(book.rating)}</div>
                        <span class="rating-count">(${book.ratingCount})</span>
                    </div>
                </div>
                <div class="preview-detail">
                    <span class="detail-label" data-i18n="preview_published">Published</span>
                    <span class="detail-value">${book.publishedDate}</span>
                </div>
                <div class="preview-detail">
                    <span class="detail-label" data-i18n="preview_language">Language</span>
                    <span class="detail-value">${book.language}</span>
                </div>
                <div class="preview-detail">
                    <span class="detail-label" data-i18n="preview_pages">Pages</span>
                    <span class="detail-value">${book.pages}</span>
                </div>
            </div>
            
            <div class="preview-price-row">
                <span class="preview-price">$${book.price.toFixed(2)}</span>
                <button class="preview-btn add-to-cart" data-id="${book.id}">
                    <i class="fas fa-shopping-cart"></i> <span data-i18n="preview_add_to_cart">Add to Cart</span>
                </button>
            </div>
            
            <div class="preview-description">
                <h3 data-i18n="preview_description">Description</h3>
                <p>${book.description}</p>
            </div>
            
            <div class="preview-reviews">
                <h3 data-i18n="preview_reviews">Reviews</h3>
                <div class="review-form">
                    <div class="review-stars">
                        <i class="fas fa-star review-star" data-value="1"></i>
                        <i class="fas fa-star review-star" data-value="2"></i>
                        <i class="fas fa-star review-star" data-value="3"></i>
                        <i class="fas fa-star review-star" data-value="4"></i>
                        <i class="fas fa-star review-star" data-value="5"></i>
                    </div>
                    <textarea class="review-input" placeholder="Write your review here..." data-i18n-placeholder="preview_review_placeholder"></textarea>
                    <button class="review-submit" data-id="${book.id}" data-i18n="preview_submit_review">Submit Review</button>
                </div>
                <div class="review-list" id="review-list-${book.id}">
                    <!-- Reviews will be loaded here -->
                </div>
            </div>
        </div>
    `;
    
    // Load reviews for this book
    loadBookReviews(book.id);
    
    // Set up event listeners for the review stars
    const reviewStars = previewContent.querySelectorAll('.review-star');
    reviewStars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            
            reviewStars.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (starValue <= value) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
    
    // Set up submit review button
    const submitReviewBtn = previewContent.querySelector('.review-submit');
    submitReviewBtn.addEventListener('click', () => {
        const bookId = submitReviewBtn.getAttribute('data-id');
        const selectedStars = previewContent.querySelectorAll('.review-star.selected').length;
        const reviewText = previewContent.querySelector('.review-input').value.trim();
        
        if (selectedStars === 0) {
            alert('Please select a rating');
            return;
        }
        
        if (reviewText === '') {
            alert('Please write a review');
            return;
        }
        
        // Check if user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Please log in to submit a review');
            document.getElementById('book-preview-modal').classList.remove('active');
            document.getElementById('auth-modal').classList.add('active');
            return;
        }
        
        // Add review
        addBookReview(bookId, {
            userId: currentUser.id,
            userName: currentUser.name,
            rating: selectedStars,
            text: reviewText,
            date: new Date().toISOString()
        });
        
        // Clear form
        previewContent.querySelectorAll('.review-star').forEach(s => s.classList.remove('selected'));
        previewContent.querySelector('.review-input').value = '';
        
        // Reload reviews
        loadBookReviews(bookId);
    });
    
    // Apply translations if i18n is initialized
    if (typeof translateElements === 'function') {
        translateElements(previewContent);
    }
};

// Add to recently viewed books
const addToRecentlyViewed = (book) => {
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    
    // Remove the book if it already exists
    recentlyViewed = recentlyViewed.filter(b => b.id !== book.id);
    
    // Add the book to the beginning
    recentlyViewed.unshift(book);
    
    // Limit to 10 books
    if (recentlyViewed.length > 10) {
        recentlyViewed = recentlyViewed.slice(0, 10);
    }
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    
    // Update the recently viewed section if it exists
    updateRecentlyViewedSection();
};

// Update the recently viewed section
const updateRecentlyViewedSection = () => {
    const recentlyViewedCarousel = document.getElementById('recently-viewed-carousel');
    if (!recentlyViewedCarousel) return;
    
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    recentlyViewedCarousel.innerHTML = '';
    
    if (recentlyViewed.length === 0) {
        recentlyViewedCarousel.innerHTML = `
            <div class="no-books-message">
                <p data-i18n="no_recently_viewed">You haven't viewed any books yet.</p>
            </div>
        `;
        return;
    }
    
    recentlyViewed.forEach(book => {
        const bookCard = createBookCard(book);
        recentlyViewedCarousel.appendChild(bookCard);
    });
    
    // Apply translations if i18n is initialized
    if (typeof translateElements === 'function') {
        translateElements(recentlyViewedCarousel);
    }
};

// Add book review
const addBookReview = (bookId, review) => {
    const reviews = JSON.parse(localStorage.getItem(`bookReviews_${bookId}`)) || [];
    reviews.push(review);
    localStorage.setItem(`bookReviews_${bookId}`, JSON.stringify(reviews));
};

// Load book reviews
const loadBookReviews = (bookId) => {
    const reviewList = document.getElementById(`review-list-${bookId}`);
    if (!reviewList) return;
    
    const reviews = JSON.parse(localStorage.getItem(`bookReviews_${bookId}`)) || [];
    reviewList.innerHTML = '';
    
    if (reviews.length === 0) {
        reviewList.innerHTML = `
            <div class="no-reviews-message">
                <p data-i18n="no_reviews">No reviews yet. Be the first to leave a review!</p>
            </div>
        `;
        return;
    }
    
    // Sort reviews by date (newest first)
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        
        const date = new Date(review.date);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-user">${review.userName}</span>
                <span class="review-date">${formattedDate}</span>
            </div>
            <div class="review-stars-display">
                ${getStarRating(review.rating)}
            </div>
            <p class="review-text">${review.text}</p>
        `;
        
        reviewList.appendChild(reviewElement);
    });
    
    // Apply translations if i18n is initialized
    if (typeof translateElements === 'function') {
        translateElements(reviewList);
    }
};

// Genre image mapping for category cards with bright, symbolic, day/night visible images
const genreImages = {
    'fiction': 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&auto=format&q=80&brightness=10', // Bright magical castle with glowing lights - fantasy fiction
    'non-fiction': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop&auto=format&q=80&brightness=15', // Bright stack of colorful books with coffee - learning and knowledge
    'romance': 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop&auto=format&q=80', // Beautiful red roses bouquet - classic romance symbol
    'thriller': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&auto=format&q=80', // Dark mysterious open book with dramatic shadows - suspense
    'horror': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=600&fit=crop&auto=format', // Spooky dark atmosphere with old books (keeping as you liked it)
    'sad': 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&h=600&fit=crop&auto=format&q=80', // Dark figure in corner showing ultimate misery and despair - perfect for sad genre
    'history': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=600&fit=crop&auto=format&q=80&brightness=15', // Bright ancient clock and gears - time and history
    'realistic': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&auto=format&q=80&brightness=10' // Bright city skyline - modern realistic life
};

// Alternative/fallback images for genres in case primary images don't load
const genreImagesFallback = {
    'fiction': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&auto=format&q=80',
    'non-fiction': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&auto=format&q=80',
    'romance': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop&auto=format&q=80',
    'thriller': 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=600&fit=crop&auto=format&q=80',
    'horror': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&auto=format&q=80',
    'sad': 'https://images.unsplash.com/photo-1515894203077-9cd549c85659?w=400&h=600&fit=crop&auto=format&q=80', // Crying tear - deep sadness emotion
    'history': 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=600&fit=crop&auto=format&q=80',
    'realistic': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=600&fit=crop&auto=format&q=80'
};

// Initialize categories section
const initializeCategoriesSection = () => {
    const categoriesCarousel = document.getElementById('categories-carousel');
    if (!categoriesCarousel) return;
    
    const genres = getAllGenres();
    categoriesCarousel.innerHTML = '';
    
    genres.forEach(genre => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.setAttribute('data-genre', genre.toLowerCase());
        
        // Get genre-specific image or fallback to a default color
        const genreBooks = getBooksByGenre(genre.toLowerCase());
        const sampleBook = genreBooks[0];
        const genreImage = genreImages[genre.toLowerCase()] || null;
        
        if (genreImage) {
            categoryCard.innerHTML = `
                <div class="category-card-bg" style="background-image: url('${genreImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                <div class="category-card-overlay">
                    <h3 class="category-card-title" data-i18n="genre_${genre.toLowerCase()}">${genre}</h3>
                </div>
            `;
            
            // Add error handling for image loading with fallback
            const img = new Image();
            img.onload = () => {
                // Image loaded successfully, keep the background image
            };
            img.onerror = () => {
                // Primary image failed to load, try fallback image
                const fallbackImage = genreImagesFallback[genre.toLowerCase()];
                if (fallbackImage) {
                    const bgElement = categoryCard.querySelector('.category-card-bg');
                    if (bgElement) {
                        bgElement.style.backgroundImage = `url('${fallbackImage}')`;
                        
                        // Test fallback image loading
                        const fallbackImg = new Image();
                        fallbackImg.onerror = () => {
                            // Fallback image also failed, use solid color
                            bgElement.style.backgroundImage = 'none';
                            bgElement.style.backgroundColor = sampleBook.coverColor;
                        };
                        fallbackImg.src = fallbackImage;
                    }
                } else {
                    // No fallback available, use solid color
                    const bgElement = categoryCard.querySelector('.category-card-bg');
                    if (bgElement) {
                        bgElement.style.backgroundImage = 'none';
                        bgElement.style.backgroundColor = sampleBook.coverColor;
                    }
                }
            };
            img.src = genreImage;
        } else {
            // Fallback to solid color if image is not available
            categoryCard.innerHTML = `
                <div class="category-card-bg" style="background-color: ${sampleBook.coverColor}"></div>
                <div class="category-card-overlay">
                    <h3 class="category-card-title" data-i18n="genre_${genre.toLowerCase()}">${genre}</h3>
                </div>
            `;
        }
        
        categoriesCarousel.appendChild(categoryCard);
    });
    
    // Set up category carousel navigation
    const prevBtn = document.getElementById('category-prev');
    const nextBtn = document.getElementById('category-next');
    
    prevBtn.addEventListener('click', () => {
        categoriesCarousel.scrollBy({ left: -600, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        categoriesCarousel.scrollBy({ left: 600, behavior: 'smooth' });
    });
    
    // Apply translations if i18n is initialized
    if (typeof translateElements === 'function') {
        translateElements(categoriesCarousel);
    }
};

// Set up banner/offers rotation
const initializeOffersBanner = () => {
    const offersBanner = document.getElementById('offers-banner');
    if (!offersBanner) return;
    
    // Sample offers data
    const offers = [
        {
            title: "Summer Reading Sale",
            description: "Get 20% off on all books this summer season!",
            buttonText: "Shop Now",
            backgroundColor: "#4a6fa5"
        },
        {
            title: "New Arrivals",
            description: "Check out our latest collection of books from top authors!",
            buttonText: "Explore",
            backgroundColor: "#e7896d"
        },
        {
            title: "Book Club Special",
            description: "Join our book club and get exclusive discounts and early access to new releases!",
            buttonText: "Join Now",
            backgroundColor: "#86c4ba"
        }
    ];
    
    offersBanner.innerHTML = '';
    
    offers.forEach((offer, index) => {
        const banner = document.createElement('div');
        banner.className = `banner-slide ${index === 0 ? 'active' : ''}`;
        banner.style.backgroundColor = offer.backgroundColor;
        
        banner.innerHTML = `
            <div class="banner-content">
                <h2 data-i18n="banner_title_${index}">${offer.title}</h2>
                <p data-i18n="banner_description_${index}">${offer.description}</p>
                <a href="#" class="banner-btn" data-banner-index="${index}" data-banner-text="${offer.buttonText}" data-i18n="banner_button_${index}">${offer.buttonText}</a>
            </div>
        `;
        
        offersBanner.appendChild(banner);
    });
    
    // Add click event listeners to banner buttons using event delegation
    offersBanner.addEventListener('click', (e) => {
        // Check if the clicked element is a banner button
        if (e.target.classList.contains('banner-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const button = e.target;
            const bannerIndex = parseInt(button.getAttribute('data-banner-index'));
            const buttonText = button.getAttribute('data-banner-text') || button.textContent.trim();
            
            console.log('Banner button clicked - Text:', buttonText, 'Index:', bannerIndex);
            
            // Handle different button actions - use index for reliability
            if (bannerIndex === 0) {
                console.log('Shop Now button (index 0) detected - scrolling to offers section');
                const targetSection = document.getElementById('offers');
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.error('Offers section not found!');
                }
            } else if (bannerIndex === 1) {
                console.log('Explore button (index 1) detected - scrolling to new arrivals section');
                const targetSection = document.getElementById('new-arrivals');
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.error('New arrivals section not found!');
                }
            } else if (bannerIndex === 2) {
                console.log('Join Now button (index 2) detected');
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    console.log('User logged in - scrolling to new arrivals');
                    const targetSection = document.getElementById('new-arrivals');
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        console.error('New arrivals section not found!');
                    }
                } else {
                    console.log('User not logged in - opening signup modal');
                    const authModal = document.getElementById('auth-modal');
                    const signupTab = document.getElementById('signup-tab');
                    if (authModal && signupTab) {
                        signupTab.click();
                        authModal.classList.add('active');
                    }
                }
            }
        }
    });
    
    // Set up banner rotation
    let currentBanner = 0;
    const banners = offersBanner.querySelectorAll('.banner-slide');
    
    setInterval(() => {
        banners[currentBanner].classList.remove('active');
        currentBanner = (currentBanner + 1) % banners.length;
        banners[currentBanner].classList.add('active');
    }, 5000);
    
    // Apply translations if i18n is initialized
    if (typeof translateElements === 'function') {
        translateElements(offersBanner);
    }
};

// Keep track of filtered books
let currentFilteredBooks = booksData;

// Initialize books section
const initializeBooksSection = () => {
    // Set up filter event listeners
    const genreFilter = document.getElementById('filter-genre');
    const priceFilter = document.getElementById('filter-price');
    const ratingFilter = document.getElementById('filter-rating');
    
    const applyFilters = () => {
        const genre = genreFilter.value;
        const price = priceFilter.value;
        const rating = ratingFilter.value;
        
        currentFilteredBooks = getFilteredBooks(genre, price, rating);
        displayBooks(currentFilteredBooks, 1);
    };
    
    genreFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    ratingFilter.addEventListener('change', applyFilters);
    
    // Initial display
    displayBooks(booksData, 1);
};

// Method to get a book by ID
const getBookById = (bookId) => {
    return booksData.find(book => book.id === bookId);
};

// Get new arrivals (books published in the last 2 years)
const getNewArrivals = () => {
    const currentYear = new Date().getFullYear();
    const twoYearsAgo = currentYear - 2;
    
    return booksData.filter(book => {
        const publishYear = new Date(book.publishedDate).getFullYear();
        return publishYear >= twoYearsAgo;
    }).sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)).slice(0, 12);
};

// Get bestsellers (books with highest ratings and rating counts)
const getBestsellers = () => {
    return booksData
        .filter(book => book.rating >= 4.0 && book.ratingCount >= 1000)
        .sort((a, b) => {
            // Sort by rating first, then by rating count
            if (b.rating !== a.rating) {
                return b.rating - a.rating;
            }
            return b.ratingCount - a.ratingCount;
        })
        .slice(0, 12);
};

// Get special offers (books with discounts)
const getSpecialOffers = () => {
    return booksData
        .map(book => {
            // Add discount information to some books
            const discountChance = Math.random();
            if (discountChance < 0.3) { // 30% of books have discounts
                const discountPercentage = Math.floor(Math.random() * 40) + 10; // 10-50% discount
                const originalPrice = book.price;
                const discountedPrice = originalPrice * (1 - discountPercentage / 100);
                
                return {
                    ...book,
                    hasOffer: true,
                    originalPrice: originalPrice,
                    discountedPrice: parseFloat(discountedPrice.toFixed(2)),
                    discountPercentage: discountPercentage
                };
            }
            return book;
        })
        .filter(book => book.hasOffer)
        .slice(0, 12);
};

// Initialize New Arrivals Section
const initializeNewArrivalsSection = () => {
    const newArrivalsCarousel = document.getElementById('new-arrivals-carousel');
    if (!newArrivalsCarousel) return;
    
    const newArrivals = getNewArrivals();
    newArrivalsCarousel.innerHTML = '';
    
    newArrivals.forEach(book => {
        const bookCard = createBookCard(book);
        
        // Add new arrival badge
        const newBadge = document.createElement('div');
        newBadge.className = 'new-badge';
        newBadge.textContent = 'NEW';
        bookCard.appendChild(newBadge);
        
        newArrivalsCarousel.appendChild(bookCard);
    });
    
    // Apply translations if i18n is initialized
    if (typeof translateElements === 'function') {
        translateElements(newArrivalsCarousel);
    }
};

// Initialize Bestsellers Section
const initializeBestsellersSection = () => {
    const bestsellersCarousel = document.getElementById('bestsellers-carousel');
    if (!bestsellersCarousel) return;
    
    const bestsellers = getBestsellers();
    bestsellersCarousel.innerHTML = '';
    
    bestsellers.forEach(book => {
        const bookCard = createBookCard(book);
        
        // Add bestseller badge
        const bestsellerBadge = document.createElement('div');
        bestsellerBadge.className = 'bestseller-badge';
        bestsellerBadge.textContent = 'BESTSELLER';
        bookCard.appendChild(bestsellerBadge);
        
        bestsellersCarousel.appendChild(bookCard);
    });
    
    // Apply translations if i18n is initialized
    if (typeof translateElements === 'function') {
        translateElements(bestsellersCarousel);
    }
};

// Initialize Special Offers Section
const initializeSpecialOffersSection = () => {
    const offersCarousel = document.getElementById('offers-carousel');
    if (!offersCarousel) return;
    
    const specialOffers = getSpecialOffers();
    offersCarousel.innerHTML = '';
    
    specialOffers.forEach(book => {
        const bookCard = createBookCard(book);
        
        // Add offer badge
        const offerBadge = document.createElement('div');
        offerBadge.className = 'offer-badge';
        offerBadge.textContent = `${book.discountPercentage}% OFF`;
        bookCard.appendChild(offerBadge);
        
        // Update price display to show discount
        const priceElement = bookCard.querySelector('.price');
        if (priceElement) {
            priceElement.innerHTML = `
                <div class="discount-price">
                    <span class="discounted-price">$${book.discountedPrice}</span>
                    <span class="original-price">$${book.originalPrice}</span>
                    <span class="discount-percentage">${book.discountPercentage}% OFF</span>
                </div>
            `;
        }
        
        offersCarousel.appendChild(bookCard);
    });
    
    // Apply translations if i18n is initialized
    if (typeof translateElements === 'function') {
        translateElements(offersCarousel);
    }
};

// Export the functions and data that need to be accessible from other modules
window.booksModule = {
    getAllGenres,
    getBooksByGenre,
    getFilteredBooks,
    createBookPreviewContent,
    initializeGenreFilter,
    initializeCategoriesSection,
    initializeOffersBanner,
    initializeBooksSection,
    updateRecentlyViewedSection,
    displayBooks,
    getBookById,
    loadCoverImage,
    booksData,
    // New functions
    getNewArrivals,
    getBestsellers,
    getSpecialOffers,
    initializeNewArrivalsSection,
    initializeBestsellersSection,
    initializeSpecialOffersSection
};
