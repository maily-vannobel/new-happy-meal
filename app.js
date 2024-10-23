import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import recipeRoutes from './routes/recipeRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.set('view engine', 'ejs');
app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Page d'accueil
app.get('/', (req, res) => {
    res.render('home'); 
});

// Routes des recettes
app.use('/recipes', recipeRoutes);

// Routes des ingrédients
app.use('/ingredients', ingredientRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send("Page non trouvée");
});

app.listen(PORT, () => {
    console.log(`CA TOURNE SUR ${PORT}`);
});

export default app;