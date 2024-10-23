import express from 'express';
import RecipeController from '../controllers/RecipeController.js';

const router = express.Router();

// Routes pour les recettes
router.get('/', RecipeController.index);
router.get('/:id', RecipeController.show);

// Autocomplétion
router.get('/search/autocomplete', RecipeController.search);

export default router;
