import IngredientModel from '../models/IngredientModel.js';

class IngredientController {
    
    // Afficher tous les ingrédients
    static async index(req, res) {
        try {
            const ingredients = await IngredientModel.getAllIngredients();
            res.render('ingredients', { ingredients });
        } catch (error) {
            console.error('Erreur lors de la récupération des ingrédients :', error);
            res.status(500).send('Erreur lors de la récupération des ingrédients');
        }
    }

    // Afficher les ingrédients d'une recette
    static async showIngredientsByRecipe(req, res) {
        try {
            const ingredients = await IngredientModel.getIngredientsByRecipe(req.params.recipe_id);
            if (!ingredients) {
                return res.status(404).send('Ingrédients non trouvés');
            }
            res.render('ingredientsByRecipe', { ingredients });
        } catch (error) {
            console.error('Erreur lors de la récupération des ingrédients :', error);
            res.status(500).send('Erreur lors de la récupération des ingrédients');
        }
    }

    // Ajouter un nouvel ingrédient
    static async add(req, res) {
        try {
            const { name, category, quantity, unit } = req.body;
            const ingredientId = await IngredientModel.addIngredient(name, category, quantity, unit);
            res.status(201).json({ id: ingredientId });
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un ingrédient :', error);
            res.status(500).send('Erreur lors de l\'ajout de l\'ingrédient');
        }
    }

    // Mettre à jour un ingrédient existant
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, category, quantity, unit } = req.body;
            await IngredientModel.updateIngredient(id, name, category, quantity, unit);
            res.status(200).send('Ingrédient mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'ingrédient :', error);
            res.status(500).send('Erreur lors de la mise à jour de l\'ingrédient');
        }
    }

    // Supprimer un ingrédient
    static async delete(req, res) {
        try {
            const { id } = req.params;
            await IngredientModel.deleteIngredient(id);
            res.status(200).send('Ingrédient supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'ingrédient :', error);
            res.status(500).send('Erreur lors de la suppression de l\'ingrédient');
        }
    }
}

export default IngredientController;

