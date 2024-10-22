const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;

// Utiliser Helmet pour la sécurité
app.use(helmet());

// Route de base
app.get('/', (req, res) => {
    res.send('Welcome to HappyMeal!');
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`CA TOURNE SUR ${PORT}`);
});
