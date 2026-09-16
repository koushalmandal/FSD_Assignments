const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory game data. This data resets whenever the server restarts.
const games = [
    {
        id: 1,
        title: 'GTA V',
        genre: 'Action',
        platform: 'PC, PlayStation, Xbox',
        rating: 4.8,
        image: 'https://placehold.co/600x800/172554/ffffff?text=GTA+V',
        description: 'Explore Los Santos in a huge open-world action adventure filled with missions, vehicles, and memorable characters.'
    },
    {
        id: 2,
        title: 'Minecraft',
        genre: 'Sandbox',
        platform: 'PC, PlayStation, Xbox, Switch',
        rating: 4.9,
        image: 'https://placehold.co/600x800/166534/ffffff?text=Minecraft',
        description: 'Build, explore, and survive in a world made entirely from blocks. Your next adventure is limited only by your imagination.'
    },
    {
        id: 3,
        title: 'Valorant',
        genre: 'First-Person Shooter',
        platform: 'PC',
        rating: 4.6,
        image: 'https://placehold.co/600x800/7f1d1d/ffffff?text=Valorant',
        description: 'Team up with unique agents and use precise tactics, abilities, and aim to win competitive rounds.'
    },
    {
        id: 4,
        title: 'God of War',
        genre: 'Action Adventure',
        platform: 'PlayStation, PC',
        rating: 4.9,
        image: 'https://placehold.co/600x800/581c87/ffffff?text=God+of+War',
        description: 'Join Kratos and Atreus on a powerful journey through Norse mythology, family, and changing destinies.'
    },
    {
        id: 5,
        title: 'Forza Horizon 5',
        genre: 'Racing',
        platform: 'PC, Xbox',
        rating: 4.7,
        image: 'https://placehold.co/600x800/0f766e/ffffff?text=Forza+Horizon+5',
        description: 'Drive hundreds of incredible cars across the colourful and open landscapes of Mexico.'
    },
    {
        id: 6,
        title: 'Red Dead Redemption 2',
        genre: 'Action Adventure',
        platform: 'PC, PlayStation, Xbox',
        rating: 4.9,
        image: 'https://placehold.co/600x800/9a3412/ffffff?text=Red+Dead+2',
        description: 'Experience the final days of the Wild West through an unforgettable story about loyalty and survival.'
    },
    {
        id: 7,
        title: 'FIFA 25',
        genre: 'Sports',
        platform: 'PC, PlayStation, Xbox, Switch',
        rating: 4.4,
        image: 'https://placehold.co/600x800/1e3a8a/ffffff?text=FIFA+25',
        description: 'Build your dream squad and compete in exciting football matches with friends and players worldwide.'
    },
    {
        id: 8,
        title: 'Cyberpunk 2077',
        genre: 'Role-Playing',
        platform: 'PC, PlayStation, Xbox',
        rating: 4.5,
        image: 'https://placehold.co/600x800/854d0e/ffffff?text=Cyberpunk+2077',
        description: 'Become a mercenary in Night City, a futuristic metropolis packed with choices, danger, and ambition.'
    }
];

// Configure EJS as the view engine and serve files from public.
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Home page shows a smaller featured selection.
app.get('/', (req, res) => {
    res.render('home', {
        games: games.slice(0, 4)
    });
});

// All games page.
app.get('/games', (req, res) => {
    res.render('games', {
        games: games
    });
});

// Game details page. req.params.id comes from the URL, such as /game/1.
app.get('/game/:id', (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = games.find((currentGame) => currentGame.id === gameId);

    if (!game) {
        return res.status(404).render('game', { game: null });
    }

    res.render('game', { game: game });
});

// Display the add-game form.
app.get('/add-game', (req, res) => {
    res.render('add-game');
});

// Receive form data through req.body and add a new game to the array.
app.post('/add-game', (req, res) => {
    const newGame = {
        id: games.length ? Math.max(...games.map((game) => game.id)) + 1 : 1,
        title: req.body.title,
        genre: req.body.genre,
        platform: req.body.platform,
        rating: parseFloat(req.body.rating),
        image: req.body.image || 'https://placehold.co/600x800/312e81/ffffff?text=New+Game',
        description: req.body.description
    };

    games.push(newGame);
    res.redirect('/games');
});

// Profile page receives these values from Express and displays them in EJS.
app.get('/profile', (req, res) => {
    res.render('profile', {
        username: 'Koushal',
        email: 'koushal@example.com',
        gamesPlayed: 25,
        favoriteGenre: 'Action'
    });
});

app.listen(port, () => {
    console.log(`Game Library App running on port ${port}`);
});
