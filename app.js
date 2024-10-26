import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import recipeRoutes from './routes/recipeRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de Helmet avec Content Security Policy modifiée
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "https://cdn.jsdelivr.net"], 
      "style-src": ["'self'", "https://cdn.jsdelivr.net"], 
    },
  })
);

app.set('view engine', 'ejs');
app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Page d'accueil
app.get('/', (req, res) => {
    res.render('layouts/base', {
        title: 'Accueil',
        body: 'home',
        cssFile: null
    });
});

// Routes pour les recettes (index, show, autocomplete)
app.use('/recipes', recipeRoutes);

// Routes des ingrédients
app.use('/ingredients', ingredientRoutes);

// app.js
app.get('/calendar', (req, res) => {
  res.render('layouts/base', {
      title: 'Calendrier',
      body: 'calendar',
      jsFile: 'calendar' 
  });
});


// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send("Page non trouvée");
});

app.listen(PORT, () => {
    console.log(`CA TOURNE SUR ${PORT}`);
});

export default app;
