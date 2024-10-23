import RecipeModel from '../models/RecipeModel.js'; // Importation du modèle qui interagit avec la base de données

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

    // 2: Afficher détails d'une recette  par ID
    static async show(req, res) {
        try {// Appelle la méthode getRecipebyId du model
            const recipe = await RecipeModel.getRecipeById(req.params.id);
            if (!recipe) {
                return res.status(404).send('Recette non trouvée');
            }
            // Si la recette est trouvée, rend la vue 'recipe_detail' avec les données de la recette
            res.render('recipe_detail', { recipe });
        } catch (error) {
            console.error('Erreur lors de la récupération de la recette :', error);
            res.status(500).send('Erreur lors de la récupération de la recette');
        }
    }
}

export default RecipeController;
