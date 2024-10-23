import express from 'express';
import RecipeController from '../controllers/RecipeController.js'; // Attention à la casse

const router = express.Router();

router.get('/', RecipeController.index);//afficher toutes les recettes
router.get('/:id', RecipeController.show);// afficher une recette par ID


export default router;
