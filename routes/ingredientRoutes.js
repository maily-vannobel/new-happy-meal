import express from 'express';
import IngredientController from '../controllers/IngredientController.js';

const router = express.Router();

// Afficher tous les ingrédients
router.get('/ingredients', IngredientController.index);

// Afficher les ingrédients d'une recette
router.get('/ingredients/recipe/:recipe_id', IngredientController.showIngredientsByRecipe);

// Ajouter un nouvel ingrédient
router.post('/ingredients', IngredientController.add);

// Mettre à jour un ingrédient
router.put('/ingredients/:id', IngredientController.update);

// Supprimer un ingrédient
router.delete('/ingredients/:id', IngredientController.delete);

export default router;
