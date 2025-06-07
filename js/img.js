/**
 * Book Cover Images from Open Library API
 * Contains pre-built URLs for book cover images from Open Library based on book titles and authors
 */

// Book cover image URLs from Open Library API
// Format: https://covers.openlibrary.org/b/isbn/{ISBN}-{SIZE}.jpg
// Alternative format: Open Library search + cover extraction
const bookCoverImages = {
    // Fiction Books
    "fiction-1": {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        cover: "https://covers.openlibrary.org/b/title/The%20Silent%20Patient-M.jpg",
        fallback: "https://covers.openlibrary.org/b/olid/OL27309847M-M.jpg"
    },
    "fiction-2": {
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        cover: "https://covers.openlibrary.org/b/title/Where%20the%20Crawdads%20Sing-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780735219090-M.jpg"
    },
    "fiction-3": {
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "https://covers.openlibrary.org/b/title/The%20Midnight%20Library-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780525559474-M.jpg"
    },
    "fiction-4": {
        title: "The Vanishing Half",
        author: "Brit Bennett",
        cover: "https://covers.openlibrary.org/b/title/The%20Vanishing%20Half-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780525536291-M.jpg"
    },
    "fiction-5": {
        title: "The Night Circus",
        author: "Erin Morgenstern",
        cover: "https://covers.openlibrary.org/b/title/The%20Night%20Circus-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780385534635-M.jpg"
    },
    "fiction-6": {
        title: "Normal People",
        author: "Sally Rooney",
        cover: "https://covers.openlibrary.org/b/title/Normal%20People-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780571334650-M.jpg"
    },
    "fiction-7": {
        title: "The Dutch House",
        author: "Ann Patchett",
        cover: "https://covers.openlibrary.org/b/title/The%20Dutch%20House-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062963673-M.jpg"
    },
    "fiction-8": {
        title: "Circe",
        author: "Madeline Miller",
        cover: "https://covers.openlibrary.org/b/title/Circe-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780316556347-M.jpg"
    },
    "fiction-9": {
        title: "Hamnet",
        author: "Maggie O'Farrell",
        cover: "https://covers.openlibrary.org/b/title/Hamnet-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781472223821-M.jpg"
    },
    "fiction-10": {
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        cover: "https://covers.openlibrary.org/b/title/Klara%20and%20the%20Sun-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780571364879-M.jpg"
    },
    "fiction-11": {
        title: "The Overstory",
        author: "Richard Powers",
        cover: "https://covers.openlibrary.org/b/title/The%20Overstory-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780393635522-M.jpg"
    },
    "fiction-12": {
        title: "The Song of Achilles",
        author: "Madeline Miller",
        cover: "https://covers.openlibrary.org/b/title/The%20Song%20of%20Achilles-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062060617-M.jpg"
    },
    "fiction-13": {
        title: "On Earth We're Briefly Gorgeous",
        author: "Ocean Vuong",
        cover: "https://covers.openlibrary.org/b/title/On%20Earth%20We%27re%20Briefly%20Gorgeous-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781594206238-M.jpg"
    },
    "fiction-14": {
        title: "The Water Dancer",
        author: "Ta-Nehisi Coates",
        cover: "https://covers.openlibrary.org/b/title/The%20Water%20Dancer-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780399590597-M.jpg"
    },
    "fiction-15": {
        title: "The Great Alone",
        author: "Kristin Hannah",
        cover: "https://covers.openlibrary.org/b/title/The%20Great%20Alone-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780312577230-M.jpg"
    },

    // Non-fiction Books
    "nonfiction-1": {
        title: "Educated",
        author: "Tara Westover",
        cover: "https://covers.openlibrary.org/b/title/Educated-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780399590504-M.jpg"
    },
    "nonfiction-2": {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        cover: "https://covers.openlibrary.org/b/title/Sapiens-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
    },
    "nonfiction-3": {
        title: "Becoming",
        author: "Michelle Obama",
        cover: "https://covers.openlibrary.org/b/title/Becoming-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781524763138-M.jpg"
    },
    "nonfiction-4": {
        title: "The Body: A Guide for Occupants",
        author: "Bill Bryson",
        cover: "https://covers.openlibrary.org/b/title/The%20Body%3A%20A%20Guide%20for%20Occupants-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780385539302-M.jpg"
    },
    "nonfiction-5": {
        title: "Maybe You Should Talk to Someone",
        author: "Lori Gottlieb",
        cover: "https://covers.openlibrary.org/b/title/Maybe%20You%20Should%20Talk%20to%20Someone-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781328662057-M.jpg"
    },
    "nonfiction-6": {
        title: "Atomic Habits",
        author: "James Clear",
        cover: "https://covers.openlibrary.org/b/title/Atomic%20Habits-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg"
    },
    "nonfiction-7": {
        title: "Bad Blood",
        author: "John Carreyrou",
        cover: "https://covers.openlibrary.org/b/title/Bad%20Blood-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781524731656-M.jpg"
    },
    "nonfiction-8": {
        title: "Born a Crime",
        author: "Trevor Noah",
        cover: "https://covers.openlibrary.org/b/title/Born%20a%20Crime-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780399588174-M.jpg"
    },
    "nonfiction-9": {
        title: "The Immortal Life of Henrietta Lacks",
        author: "Rebecca Skloot",
        cover: "https://covers.openlibrary.org/b/title/The%20Immortal%20Life%20of%20Henrietta%20Lacks-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781400052172-M.jpg"
    },
    "nonfiction-10": {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        cover: "https://covers.openlibrary.org/b/title/Thinking%2C%20Fast%20and%20Slow-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780374533557-M.jpg"
    },
    "nonfiction-11": {
        title: "A Promised Land",
        author: "Barack Obama",
        cover: "https://covers.openlibrary.org/b/title/A%20Promised%20Land-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781524763169-M.jpg"
    },
    "nonfiction-12": {
        title: "Quiet: The Power of Introverts",
        author: "Susan Cain",
        cover: "https://covers.openlibrary.org/b/title/Quiet-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307352156-M.jpg"
    },
    "nonfiction-13": {
        title: "The Code Breaker",
        author: "Walter Isaacson",
        cover: "https://covers.openlibrary.org/b/title/The%20Code%20Breaker-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781982115852-M.jpg"
    },
    "nonfiction-14": {
        title: "How to Be an Antiracist",
        author: "Ibram X. Kendi",
        cover: "https://covers.openlibrary.org/b/title/How%20to%20Be%20an%20Antiracist-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780525509288-M.jpg"
    },
    "nonfiction-15": {
        title: "The Year of Magical Thinking",
        author: "Joan Didion",
        cover: "https://covers.openlibrary.org/b/title/The%20Year%20of%20Magical%20Thinking-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781400043149-M.jpg"
    },

    // Romance Books
    "romance-1": {
        title: "The Hating Game",
        author: "Sally Thorne",
        cover: "https://covers.openlibrary.org/b/title/The%20Hating%20Game-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062439598-M.jpg"
    },
    "romance-2": {
        title: "Red, White & Royal Blue",
        author: "Casey McQuiston",
        cover: "https://covers.openlibrary.org/b/title/Red%2C%20White%20%26%20Royal%20Blue-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781250316776-M.jpg"
    },
    "romance-3": {
        title: "The Notebook",
        author: "Nicholas Sparks",
        cover: "https://covers.openlibrary.org/b/title/The%20Notebook-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780446605236-M.jpg"
    },
    "romance-4": {
        title: "Outlander",
        author: "Diana Gabaldon",
        cover: "https://covers.openlibrary.org/b/title/Outlander-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780385319959-M.jpg"
    },
    "romance-5": {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        cover: "https://covers.openlibrary.org/b/title/Pride%20and%20Prejudice-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg"
    },
    "romance-6": {
        title: "Beach Read",
        author: "Emily Henry",
        cover: "https://covers.openlibrary.org/b/title/Beach%20Read-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780451498557-M.jpg"
    },
    "romance-7": {
        title: "Get a Life, Chloe Brown",
        author: "Talia Hibbert",
        cover: "https://covers.openlibrary.org/b/title/Get%20a%20Life%2C%20Chloe%20Brown-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062941206-M.jpg"
    },
    "romance-8": {
        title: "Eleanor Oliphant Is Completely Fine",
        author: "Gail Honeyman",
        cover: "https://covers.openlibrary.org/b/title/Eleanor%20Oliphant%20Is%20Completely%20Fine-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780735220690-M.jpg"
    },
    "romance-9": {
        title: "The Unhoneymooners",
        author: "Christina Lauren",
        cover: "https://covers.openlibrary.org/b/title/The%20Unhoneymooners-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781501128035-M.jpg"
    },
    "romance-10": {
        title: "Me Before You",
        author: "Jojo Moyes",
        cover: "https://covers.openlibrary.org/b/title/Me%20Before%20You-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780143124542-M.jpg"
    },
    "romance-11": {
        title: "It Ends with Us",
        author: "Colleen Hoover",
        cover: "https://covers.openlibrary.org/b/title/It%20Ends%20with%20Us-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781501110368-M.jpg"
    },
    "romance-12": {
        title: "From Lukov with Love",
        author: "Mariana Zapata",
        cover: "https://covers.openlibrary.org/b/title/From%20Lukov%20with%20Love-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781542048521-M.jpg"
    },
    "romance-13": {
        title: "The Flatshare",
        author: "Beth O'Leary",
        cover: "https://covers.openlibrary.org/b/title/The%20Flatshare-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781250295736-M.jpg"
    },
    "romance-14": {
        title: "Love and Other Words",
        author: "Christina Lauren",
        cover: "https://covers.openlibrary.org/b/title/Love%20and%20Other%20Words-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781501128011-M.jpg"
    },
    "romance-15": {
        title: "The Wedding Date",
        author: "Jasmine Guillory",
        cover: "https://covers.openlibrary.org/b/title/The%20Wedding%20Date-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780399581731-M.jpg"
    },

    // Thriller Books
    "thriller-1": {
        title: "Gone Girl",
        author: "Gillian Flynn",
        cover: "https://covers.openlibrary.org/b/title/Gone%20Girl-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307588364-M.jpg"
    },
    "thriller-2": {
        title: "The Girl on the Train",
        author: "Paula Hawkins",
        cover: "https://covers.openlibrary.org/b/title/The%20Girl%20on%20the%20Train-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781594634024-M.jpg"
    },
    "thriller-3": {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        cover: "https://covers.openlibrary.org/b/title/The%20Silent%20Patient-M.jpg",
        fallback: "https://covers.openlibrary.org/b/olid/OL27309847M-M.jpg"
    },
    "thriller-4": {
        title: "The Guest List",
        author: "Lucy Foley",
        cover: "https://covers.openlibrary.org/b/title/The%20Guest%20List-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062868930-M.jpg"
    },
    "thriller-5": {
        title: "Before I Go to Sleep",
        author: "S.J. Watson",
        cover: "https://covers.openlibrary.org/b/title/Before%20I%20Go%20to%20Sleep-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062060556-M.jpg"
    },
    "thriller-6": {
        title: "The Last Mrs. Parrish",
        author: "Liv Constantine",
        cover: "https://covers.openlibrary.org/b/title/The%20Last%20Mrs.%20Parrish-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062667694-M.jpg"
    },
    "thriller-7": {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        cover: "https://covers.openlibrary.org/b/title/The%20Silent%20Patient-M.jpg",
        fallback: "https://covers.openlibrary.org/b/olid/OL27309847M-M.jpg"
    },
    "thriller-8": {
        title: "Sharp Objects",
        author: "Gillian Flynn",
        cover: "https://covers.openlibrary.org/b/title/Sharp%20Objects-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307341556-M.jpg"
    },
    "thriller-9": {
        title: "The Woman in the Window",
        author: "A.J. Finn",
        cover: "https://covers.openlibrary.org/b/title/The%20Woman%20in%20the%20Window-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062678416-M.jpg"
    },
    "thriller-10": {
        title: "The Hunting Party",
        author: "Lucy Foley",
        cover: "https://covers.openlibrary.org/b/title/The%20Hunting%20Party-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062868909-M.jpg"
    },
    "thriller-11": {
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        cover: "https://covers.openlibrary.org/b/title/The%20Girl%20with%20the%20Dragon%20Tattoo-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307454546-M.jpg"
    },
    "thriller-12": {
        title: "In the Woods",
        author: "Tana French",
        cover: "https://covers.openlibrary.org/b/title/In%20the%20Woods-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780143113492-M.jpg"
    },
    "thriller-13": {
        title: "Big Little Lies",
        author: "Liane Moriarty",
        cover: "https://covers.openlibrary.org/b/title/Big%20Little%20Lies-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780399167065-M.jpg"
    },
    "thriller-14": {
        title: "The Shining",
        author: "Stephen King",
        cover: "https://covers.openlibrary.org/b/title/The%20Shining-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307743657-M.jpg"
    },
    "thriller-15": {
        title: "Behind Closed Doors",
        author: "B.A. Paris",
        cover: "https://covers.openlibrary.org/b/title/Behind%20Closed%20Doors-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781250121004-M.jpg"
    },

    // Horror Books
    "horror-1": {
        title: "It",
        author: "Stephen King",
        cover: "https://covers.openlibrary.org/b/title/It-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781501142970-M.jpg"
    },
    "horror-2": {
        title: "The Haunting of Hill House",
        author: "Shirley Jackson",
        cover: "https://covers.openlibrary.org/b/title/The%20Haunting%20of%20Hill%20House-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780143039983-M.jpg"
    },
    "horror-3": {
        title: "Pet Sematary",
        author: "Stephen King",
        cover: "https://covers.openlibrary.org/b/title/Pet%20Sematary-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307743688-M.jpg"
    },
    "horror-4": {
        title: "The Exorcist",
        author: "William Peter Blatty",
        cover: "https://covers.openlibrary.org/b/title/The%20Exorcist-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780061007224-M.jpg"
    },
    "horror-5": {
        title: "House of Leaves",
        author: "Mark Z. Danielewski",
        cover: "https://covers.openlibrary.org/b/title/House%20of%20Leaves-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780375703768-M.jpg"
    },
    "horror-6": {
        title: "Carrie",
        author: "Stephen King",
        cover: "https://covers.openlibrary.org/b/title/Carrie-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307743664-M.jpg"
    },
    "horror-7": {
        title: "Bird Box",
        author: "Josh Malerman",
        cover: "https://covers.openlibrary.org/b/title/Bird%20Box-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062259653-M.jpg"
    },
    "horror-8": {
        title: "The Silence of the Lambs",
        author: "Thomas Harris",
        cover: "https://covers.openlibrary.org/b/title/The%20Silence%20of%20the%20Lambs-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780312924584-M.jpg"
    },
    "horror-9": {
        title: "Rosemary's Baby",
        author: "Ira Levin",
        cover: "https://covers.openlibrary.org/b/title/Rosemary%27s%20Baby-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780451194004-M.jpg"
    },
    "horror-10": {
        title: "The Stand",
        author: "Stephen King",
        cover: "https://covers.openlibrary.org/b/title/The%20Stand-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307743671-M.jpg"
    },
    "horror-11": {
        title: "NOS4A2",
        author: "Joe Hill",
        cover: "https://covers.openlibrary.org/b/title/NOS4A2-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062200570-M.jpg"
    },
    "horror-12": {
        title: "The Only Good Indians",
        author: "Stephen Graham Jones",
        cover: "https://covers.openlibrary.org/b/title/The%20Only%20Good%20Indians-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781982136451-M.jpg"
    },
    "horror-13": {
        title: "The Hunger",
        author: "Alma Katsu",
        cover: "https://covers.openlibrary.org/b/title/The%20Hunger-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780399177675-M.jpg"
    },
    "horror-14": {
        title: "Mexican Gothic",
        author: "Silvia Moreno-Garcia",
        cover: "https://covers.openlibrary.org/b/title/Mexican%20Gothic-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780525620785-M.jpg"
    },
    "horror-15": {
        title: "The Fisherman",
        author: "John Langan",
        cover: "https://covers.openlibrary.org/b/title/The%20Fisherman-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781939905208-M.jpg"
    },

    // Sad Books
    "sad-1": {
        title: "The Book Thief",
        author: "Markus Zusak",
        cover: "https://covers.openlibrary.org/b/title/The%20Book%20Thief-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780375842207-M.jpg"
    },
    "sad-2": {
        title: "A Little Life",
        author: "Hanya Yanagihara",
        cover: "https://covers.openlibrary.org/b/title/A%20Little%20Life-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780385539258-M.jpg"
    },
    "sad-3": {
        title: "The Road",
        author: "Cormac McCarthy",
        cover: "https://covers.openlibrary.org/b/title/The%20Road-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307387899-M.jpg"
    },
    "sad-4": {
        title: "Of Mice and Men",
        author: "John Steinbeck",
        cover: "https://covers.openlibrary.org/b/title/Of%20Mice%20and%20Men-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780140177398-M.jpg"
    },
    "sad-5": {
        title: "Never Let Me Go",
        author: "Kazuo Ishiguro",
        cover: "https://covers.openlibrary.org/b/title/Never%20Let%20Me%20Go-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781400078776-M.jpg"
    },
    "sad-6": {
        title: "All the Light We Cannot See",
        author: "Anthony Doerr",
        cover: "https://covers.openlibrary.org/b/title/All%20the%20Light%20We%20Cannot%20See-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781476746586-M.jpg"
    },
    "sad-7": {
        title: "The Lovely Bones",
        author: "Alice Sebold",
        cover: "https://covers.openlibrary.org/b/title/The%20Lovely%20Bones-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780316666343-M.jpg"
    },
    "sad-8": {
        title: "They Both Die at the End",
        author: "Adam Silvera",
        cover: "https://covers.openlibrary.org/b/title/They%20Both%20Die%20at%20the%20End-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062457790-M.jpg"
    },
    "sad-9": {
        title: "Flowers for Algernon",
        author: "Daniel Keyes",
        cover: "https://covers.openlibrary.org/b/title/Flowers%20for%20Algernon-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780156030304-M.jpg"
    },
    "sad-10": {
        title: "The Fault in Our Stars",
        author: "John Green",
        cover: "https://covers.openlibrary.org/b/title/The%20Fault%20in%20Our%20Stars-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780525478812-M.jpg"
    },
    "sad-11": {
        title: "On Earth We're Briefly Gorgeous",
        author: "Ocean Vuong",
        cover: "https://covers.openlibrary.org/b/title/On%20Earth%20We%27re%20Briefly%20Gorgeous-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781594206238-M.jpg"
    },
    "sad-12": {
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        cover: "https://covers.openlibrary.org/b/title/The%20Kite%20Runner-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781594631931-M.jpg"
    },
    "sad-13": {
        title: "A Thousand Splendid Suns",
        author: "Khaled Hosseini",
        cover: "https://covers.openlibrary.org/b/title/A%20Thousand%20Splendid%20Suns-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781594489501-M.jpg"
    },
    "sad-14": {
        title: "The Time Traveler's Wife",
        author: "Audrey Niffenegger",
        cover: "https://covers.openlibrary.org/b/title/The%20Time%20Traveler%27s%20Wife-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780156029438-M.jpg"
    },
    "sad-15": {
        title: "My Sister's Keeper",
        author: "Jodi Picoult",
        cover: "https://covers.openlibrary.org/b/title/My%20Sister%27s%20Keeper-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780743454537-M.jpg"
    },

    // History Books
    "history-1": {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        cover: "https://covers.openlibrary.org/b/title/Sapiens-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
    },
    "history-2": {
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        cover: "https://covers.openlibrary.org/b/title/Guns%2C%20Germs%2C%20and%20Steel-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780393354324-M.jpg"
    },
    "history-3": {
        title: "The Silk Roads",
        author: "Peter Frankopan",
        cover: "https://covers.openlibrary.org/b/title/The%20Silk%20Roads-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781101946329-M.jpg"
    },
    "history-4": {
        title: "A Short History of Nearly Everything",
        author: "Bill Bryson",
        cover: "https://covers.openlibrary.org/b/title/A%20Short%20History%20of%20Nearly%20Everything-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780767908184-M.jpg"
    },
    "history-5": {
        title: "The Warmth of Other Suns",
        author: "Isabel Wilkerson",
        cover: "https://covers.openlibrary.org/b/title/The%20Warmth%20of%20Other%20Suns-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780679763888-M.jpg"
    },
    "history-6": {
        title: "A People's History of the United States",
        author: "Howard Zinn",
        cover: "https://covers.openlibrary.org/b/title/A%20People%27s%20History%20of%20the%20United%20States-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062397348-M.jpg"
    },
    "history-7": {
        title: "The Devil in the White City",
        author: "Erik Larson",
        cover: "https://covers.openlibrary.org/b/title/The%20Devil%20in%20the%20White%20City-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780375725609-M.jpg"
    },
    "history-8": {
        title: "The Crusades: The Authoritative History",
        author: "Thomas Asbridge",
        cover: "https://covers.openlibrary.org/b/title/The%20Crusades-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780060787288-M.jpg"
    },
    "history-9": {
        title: "1776",
        author: "David McCullough",
        cover: "https://covers.openlibrary.org/b/title/1776-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780743226721-M.jpg"
    },
    "history-10": {
        title: "Genghis Khan and the Making of the Modern World",
        author: "Jack Weatherford",
        cover: "https://covers.openlibrary.org/b/title/Genghis%20Khan%20and%20the%20Making%20of%20the%20Modern%20World-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780609809648-M.jpg"
    },
    "history-11": {
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        cover: "https://covers.openlibrary.org/b/title/The%20Diary%20of%20a%20Young%20Girl-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780553296983-M.jpg"
    },
    "history-12": {
        title: "The Emperor of All Maladies",
        author: "Siddhartha Mukherjee",
        cover: "https://covers.openlibrary.org/b/title/The%20Emperor%20of%20All%20Maladies-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781439170915-M.jpg"
    },
    "history-13": {
        title: "Salt: A World History",
        author: "Mark Kurlansky",
        cover: "https://covers.openlibrary.org/b/title/Salt%3A%20A%20World%20History-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780142001615-M.jpg"
    },
    "history-14": {
        title: "The Immortal Life of Henrietta Lacks",
        author: "Rebecca Skloot",
        cover: "https://covers.openlibrary.org/b/title/The%20Immortal%20Life%20of%20Henrietta%20Lacks-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781400052172-M.jpg"
    },
    "history-15": {
        title: "Midnight's Children",
        author: "Salman Rushdie",
        cover: "https://covers.openlibrary.org/b/title/Midnight%27s%20Children-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780375755453-M.jpg"
    },

    // Realistic Fiction Books
    "realistic-1": {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover: "https://covers.openlibrary.org/b/title/The%20Great%20Gatsby-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg"
    },
    "realistic-2": {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        cover: "https://covers.openlibrary.org/b/title/To%20Kill%20a%20Mockingbird-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780061120084-M.jpg"
    },
    "realistic-3": {
        title: "Normal People",
        author: "Sally Rooney",
        cover: "https://covers.openlibrary.org/b/title/Normal%20People-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780571334650-M.jpg"
    },
    "realistic-4": {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        cover: "https://covers.openlibrary.org/b/title/The%20Catcher%20in%20the%20Rye-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780316769488-M.jpg"
    },
    "realistic-5": {
        title: "Little Fires Everywhere",
        author: "Celeste Ng",
        cover: "https://covers.openlibrary.org/b/title/Little%20Fires%20Everywhere-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780735224292-M.jpg"
    },
    "realistic-6": {
        title: "The Goldfinch",
        author: "Donna Tartt",
        cover: "https://covers.openlibrary.org/b/title/The%20Goldfinch-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780316055437-M.jpg"
    },
    "realistic-7": {
        title: "Americanah",
        author: "Chimamanda Ngozi Adichie",
        cover: "https://covers.openlibrary.org/b/title/Americanah-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780307455925-M.jpg"
    },
    "realistic-8": {
        title: "The Hate U Give",
        author: "Angie Thomas",
        cover: "https://covers.openlibrary.org/b/title/The%20Hate%20U%20Give-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780062498533-M.jpg"
    },
    "realistic-9": {
        title: "Such a Fun Age",
        author: "Kiley Reid",
        cover: "https://covers.openlibrary.org/b/title/Such%20a%20Fun%20Age-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780525541905-M.jpg"
    },
    "realistic-10": {
        title: "Middlesex",
        author: "Jeffrey Eugenides",
        cover: "https://covers.openlibrary.org/b/title/Middlesex-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780312422158-M.jpg"
    },
    "realistic-11": {
        title: "Freedom",
        author: "Jonathan Franzen",
        cover: "https://covers.openlibrary.org/b/title/Freedom-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780374158460-M.jpg"
    },
    "realistic-12": {
        title: "White Teeth",
        author: "Zadie Smith",
        cover: "https://covers.openlibrary.org/b/title/White%20Teeth-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780375703867-M.jpg"
    },
    "realistic-13": {
        title: "The Corrections",
        author: "Jonathan Franzen",
        cover: "https://covers.openlibrary.org/b/title/The%20Corrections-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780374129842-M.jpg"
    },
    "realistic-14": {
        title: "Olive Kitteridge",
        author: "Elizabeth Strout",
        cover: "https://covers.openlibrary.org/b/title/Olive%20Kitteridge-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781400062089-M.jpg"
    },    "realistic-15": {
        title: "Everything I Never Told You",
        author: "Celeste Ng",
        cover: "https://covers.openlibrary.org/b/title/Everything%20I%20Never%20Told%20You-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781594205712-M.jpg"
    },

    // New Arrivals - Recent Books (2023-2025)
    "fiction-new-1": {
        title: "Fourth Wing",
        author: "Rebecca Ross",
        cover: "https://covers.openlibrary.org/b/title/Fourth%20Wing-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781649374042-M.jpg"
    },
    "fiction-new-2": {
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
        cover: "https://covers.openlibrary.org/b/title/Tomorrow%20and%20Tomorrow%20and%20Tomorrow-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780593321201-M.jpg"
    },
    "thriller-new-1": {
        title: "The Seven Moons of Maali Almeida",
        author: "Shehan Karunatilaka",
        cover: "https://covers.openlibrary.org/b/title/The%20Seven%20Moons%20of%20Maali%20Almeida-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781641293242-M.jpg"
    },
    "romance-new-1": {
        title: "Book Lovers",
        author: "Emily Henry",
        cover: "https://covers.openlibrary.org/b/title/Book%20Lovers-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781984806734-M.jpg"
    },
    "nonfiction-new-1": {
        title: "Spare",
        author: "Prince Harry",
        cover: "https://covers.openlibrary.org/b/title/Spare-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780593593806-M.jpg"
    },
    "fiction-new-3": {
        title: "The Atlas Six",
        author: "Olivie Blake",
        cover: "https://covers.openlibrary.org/b/title/The%20Atlas%20Six-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781250854353-M.jpg"
    },
    "thriller-new-2": {
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        cover: "https://covers.openlibrary.org/b/title/The%20Thursday%20Murder%20Club-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781984880970-M.jpg"
    },
    "romance-new-2": {
        title: "People We Meet on Vacation",
        author: "Emily Henry",
        cover: "https://covers.openlibrary.org/b/title/People%20We%20Meet%20on%20Vacation-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781984806758-M.jpg"
    },
    "fiction-new-4": {
        title: "Lessons in Chemistry",
        author: "Bonnie Garmus",
        cover: "https://covers.openlibrary.org/b/title/Lessons%20in%20Chemistry-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780385547345-M.jpg"
    },
    "nonfiction-new-2": {
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "https://covers.openlibrary.org/b/title/The%20Midnight%20Library-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780525559474-M.jpg"
    },
    "thriller-new-3": {
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        cover: "https://covers.openlibrary.org/b/title/The%20Invisible%20Life%20of%20Addie%20LaRue-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780765387561-M.jpg"
    },
    "romance-new-3": {
        title: "The Love Hypothesis",
        author: "Ali Hazel",
        cover: "https://covers.openlibrary.org/b/title/The%20Love%20Hypothesis-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781984806048-M.jpg"
    },
    "fiction-new-5": {
        title: "Project Hail Mary",
        author: "Andy Weir",
        cover: "https://covers.openlibrary.org/b/title/Project%20Hail%20Mary-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg"
    },
    "nonfiction-new-3": {
        title: "Crying in H Mart",
        author: "Michelle Zauner",
        cover: "https://covers.openlibrary.org/b/title/Crying%20in%20H%20Mart-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781984898678-M.jpg"
    },
    "fiction-new-6": {
        title: "The Priory of the Orange Tree",
        author: "Samantha Shannon",
        cover: "https://covers.openlibrary.org/b/title/The%20Priory%20of%20the%20Orange%20Tree-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9781635570243-M.jpg"
    },
    "thriller-new-4": {
        title: "The Sanatorium",
        author: "Sarah Pearse",
        cover: "https://covers.openlibrary.org/b/title/The%20Sanatorium-M.jpg",
        fallback: "https://covers.openlibrary.org/b/isbn/9780593296677-M.jpg"
    }
};

/**
 * Function to get book cover image URL by book ID
 * @param {string} bookId - The ID of the book
 * @returns {string} - The cover image URL or fallback
 */
const getBookCoverImageUrl = (bookId) => {
    const bookImage = bookCoverImages[bookId];
    if (bookImage) {
        return bookImage.cover;
    }
    // Default fallback image
    return 'https://covers.openlibrary.org/b/title/default-M.jpg';
};

/**
 * Function to get book cover image with fallback URL by book ID
 * @param {string} bookId - The ID of the book
 * @returns {object} - Object containing cover and fallback URLs
 */
const getBookCoverWithFallback = (bookId) => {
    const bookImage = bookCoverImages[bookId];
    if (bookImage) {
        return {
            cover: bookImage.cover,
            fallback: bookImage.fallback || 'https://covers.openlibrary.org/b/title/default-M.jpg'
        };
    }
    return {
        cover: 'https://covers.openlibrary.org/b/title/default-M.jpg',
        fallback: 'https://via.placeholder.com/300x450/3a506b/ffffff?text=No+Cover'
    };
};

/**
 * Function to preload all book cover images
 * @returns {Promise} - Promise that resolves when all images are loaded or attempted
 */
const preloadAllBookCovers = async () => {
    const loadPromises = Object.values(bookCoverImages).map(book => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = book.cover;
        });
    });
    
    const results = await Promise.all(loadPromises);
    const successCount = results.filter(result => result).length;
    console.log(`Preloaded ${successCount}/${results.length} book cover images successfully`);
    return results;
};

/**
 * Function to get all book IDs that have cover images
 * @returns {array} - Array of book IDs
 */
const getAllBookIdsWithCovers = () => {
    return Object.keys(bookCoverImages);
};

/**
 * Function to search books by title or author for cover images
 * @param {string} searchTerm - The search term
 * @returns {array} - Array of matching book objects
 */
const searchBookCoversByTitle = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return Object.entries(bookCoverImages)
        .filter(([id, book]) => 
            book.title.toLowerCase().includes(term) || 
            book.author.toLowerCase().includes(term)
        )
        .map(([id, book]) => ({ id, ...book }));
};

// Export functions for use in other modules
if (typeof window !== 'undefined') {
    window.bookCoversModule = {
        bookCoverImages,
        getBookCoverImageUrl,
        getBookCoverWithFallback,
        preloadAllBookCovers,
        getAllBookIdsWithCovers,
        searchBookCoversByTitle
    };
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bookCoverImages,
        getBookCoverImageUrl,
        getBookCoverWithFallback,
        preloadAllBookCovers,
        getAllBookIdsWithCovers,
        searchBookCoversByTitle
    };
}
