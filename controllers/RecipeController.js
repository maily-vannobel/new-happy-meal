import RecipeModel from '../models/RecipeModel.js';
import IngredientModel from '../models/IngredientModel.js'; // Importation du modèle des ingrédients

class RecipeController {
    
    // 1: Afficher toutes les recettes
    static async index(req, res) {
        try {
            const recipes = await RecipeModel.getAllRecipes();
            res.render('recipe', { recipes });
        } catch (error) {
            console.error('Erreur lors de la récupération des recettes :', error);
            res.status(500).send('Erreur lors de la récupération des recettes');
        }
    }

    // 2: Afficher détails d'une recette par ID
    static async show(req, res) {
        try {
            const recipe = await RecipeModel.getRecipeById(req.params.id);
            if (!recipe) {
                return res.status(404).send('Recette non trouvée');
            }

            // Récupérer les ingrédients associés à la recette
            const ingredients = await IngredientModel.getIngredientsByRecipe(req.params.id);

            // Passer la recette et les ingrédients à la vue
            res.render('recipeDetails', { recipe, ingredients });
        } catch (error) {
            console.error('Erreur lors de la récupération de la recette :', error);
            res.status(500).send('Erreur lors de la récupération de la recette');
        }
    }

    // 3: Recherche des recettes pour l'autocomplétion
    static async search(req, res) {
        try {
            const query = req.query.query;
            if (!query) {
                return res.status(400).json([]);
            }
            const results = await RecipeModel.searchRecipes(query);
            res.json(results);
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
            res.status(500).send('Erreur lors de la recherche');
        }
    }
}

export default RecipeController;
