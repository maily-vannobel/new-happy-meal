import express from 'express';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.set('view engine', 'ejs');


// Page d'accueil
app.get('/', (req, res) => {
    res.render('home'); 
});

// routes des recettes
import recipeRoutes from './routes/recipeRoutes.js';
app.use('/recipes', recipeRoutes);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`CA TOURNE SUR ${PORT}`);
});
